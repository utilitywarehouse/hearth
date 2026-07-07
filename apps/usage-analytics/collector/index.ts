/**
 * Collector entrypoint. Discover → clone → parse → aggregate → snapshot.
 *
 * Designed to be resumable across weekly runs: the only rate-limited step is
 * code-search discovery (10/hr). If that budget is exhausted mid-run we persist
 * a checkpoint and exit 0 — the next run resumes. Cloning + parsing is not
 * API-limited, so once repos are discovered a single run finishes the sweep.
 *
 * Flags:
 *   --repo owner/name[,owner/name]  Skip discovery; collect only these repos (testing).
 *   --limit N                       Cap the number of repos cloned this run.
 *   --date YYYY-MM-DD               Override the snapshot date (default: today, UTC).
 */
import fs from 'node:fs';
import {
  CLONES_DIR,
  INDEX_FILE,
  MANIFEST_FILE,
  MAX_REPO_SIZE_KB,
  SELF_REPO,
  SNAPSHOTS_DIR,
} from './config.ts';
import type { CollectionMeta, Snapshot, UsageIndex } from '../src/data/types.ts';
import { createClient, getToken, searchRemaining } from './github/client.ts';
import { discoverAllDependents, type SearchBudget } from './github/discover.ts';
import { cloneRepo, removeDir } from './github/clone.ts';
import { buildContext, walkRepo } from './parse/walk.ts';
import { buildSnapshot, updateIndex, type RepoResult } from './aggregate/rollup.ts';
import { clearCheckpoint, loadCheckpoint, saveCheckpoint } from './state/checkpoint.ts';
import { readJson, writeJson } from './util/json.ts';
import type { SymbolManifest } from './parse/build-manifests.ts';

interface Args {
  repos?: Array<string>;
  limit?: number;
  date?: string;
  /** Local directory to treat as a single already-checked-out repo (offline testing). */
  localDir?: string;
  /** Repo name to attribute a --local run to. */
  localName?: string;
}

function parseArgs(argv: Array<string>): Args {
  const args: Args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--repo') args.repos = (argv[++i] ?? '').split(',').filter(Boolean);
    else if (a === '--limit') args.limit = Number(argv[++i]);
    else if (a === '--date') args.date = argv[++i];
    else if (a === '--local') args.localDir = argv[++i];
    else if (a === '--name') args.localName = argv[++i];
  }
  return args;
}

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Write a snapshot file and update the rolled-up time-series index. */
function writeSnapshot(date: string, snapshot: Snapshot): void {
  const snapshotFile = `${SNAPSHOTS_DIR}/${date}.json`;
  writeJson(snapshotFile, snapshot);
  const index = updateIndex(readJson<UsageIndex>(INDEX_FILE), snapshot);
  writeJson(INDEX_FILE, index);
  console.log(`Wrote ${snapshotFile}`);
}

function loadManifest(): SymbolManifest {
  const manifest = readJson<SymbolManifest>(MANIFEST_FILE);
  if (!manifest) {
    throw new Error(`Symbol manifest missing at ${MANIFEST_FILE}. Run \`pnpm gen:manifests\` first.`);
  }
  return manifest;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const nowIso = new Date().toISOString();
  const date = args.date ?? todayUtc();

  const manifest = loadManifest();
  const ctx = buildContext(manifest);

  // Offline mode: parse a local checkout, skip all GitHub access. For testing
  // and for repos you've already cloned yourself.
  if (args.localDir) {
    const fullName = args.localName ?? 'local/sample';
    console.log(`Parsing local dir ${args.localDir} as ${fullName}…`);
    const parse = walkRepo(args.localDir, ctx);
    const collection: CollectionMeta = {
      dependentRepoCount: 1,
      reposCloned: 1,
      reposFailed: 0,
      searchRequestsUsed: 0,
      manifestVersion: manifest.manifestVersion,
    };
    const snapshot = buildSnapshot(
      date,
      new Date().toISOString(),
      collection,
      [{ fullName, sha: 'local', parse }],
      ctx.packages
    );
    writeSnapshot(date, snapshot);
    console.log(`\nWrote local snapshot for ${fullName}: ${parse.filesParsed} files parsed.`);
    return;
  }

  const token = getToken();
  const octokit = createClient(token);

  const cp = loadCheckpoint(date, nowIso);

  // ---- Phase A: discovery (a single combined code search) ----
  if (args.repos && args.repos.length > 0) {
    // Test / targeted mode — skip discovery entirely.
    cp.pendingRepos = args.repos;
    cp.phase = 'collect';
  } else if (cp.phase === 'discovery') {
    const remaining = await searchRemaining(octokit);
    console.log(`Code-search budget this run: ${remaining} requests`);
    if (remaining <= 0) {
      console.log('No code-search budget — will retry next run.');
      saveCheckpoint(cp, new Date().toISOString());
      return; // exit 0
    }

    const budget: SearchBudget = { remaining };
    const result = await discoverAllDependents(octokit, budget);
    cp.discovery.found = { '*': result.repos };
    cp.discovery.searchRequestsUsed += result.requestsUsed;
    console.log(
      `Discovered ${result.repos.length} dependent repos (${result.requestsUsed} search req).`
    );

    if (result.exhausted && result.repos.length === 0) {
      // Throttled before finding anything — resume next run rather than write an
      // empty snapshot that would look like "nobody uses hearth".
      console.log('Search throttled before any results — checkpointing to resume next run.');
      saveCheckpoint(cp, new Date().toISOString());
      return; // exit 0
    }
    if (result.exhausted) {
      console.warn('! Search throttled mid-pagination — repo list may be incomplete this cycle.');
    }

    cp.pendingRepos = result.repos.filter(r => r !== SELF_REPO).sort();
    cp.phase = 'collect';
    saveCheckpoint(cp, new Date().toISOString());
  }

  // ---- Phase B: clone + parse (not API-limited) ----
  let pending = cp.pendingRepos;
  if (args.limit && args.limit > 0) pending = pending.slice(0, args.limit);
  console.log(`\nCollecting ${pending.length} repos…`);

  fs.mkdirSync(CLONES_DIR, { recursive: true });
  const results: Array<RepoResult> = [];
  let reposFailed = 0;

  for (const fullName of pending) {
    try {
      const [owner, repo] = fullName.split('/');
      const info = await octokit.rest.repos.get({ owner: owner!, repo: repo! });
      if (info.data.archived) {
        console.log(`  skip ${fullName} (archived)`);
        continue;
      }
      if ((info.data.size ?? 0) > MAX_REPO_SIZE_KB) {
        console.log(`  skip ${fullName} (too large: ${info.data.size} KB)`);
        continue;
      }

      const { dir, sha } = await cloneRepo(fullName, token);
      const parse = walkRepo(dir, ctx);
      await removeDir(dir);

      const usedPkgs = Object.keys(parse.packages).length;
      console.log(`  ${fullName}: ${usedPkgs} pkgs, ${parse.filesParsed} files parsed`);
      results.push({ fullName, sha, parse });
    } catch (err) {
      reposFailed++;
      console.warn(`  ! ${fullName}: ${(err as Error).message}`);
    }
  }

  // ---- Aggregate + write snapshot ----
  const dependentRepoCount = new Set(
    Object.values(cp.discovery.found).flat().filter(r => r !== SELF_REPO)
  ).size;

  const collection: CollectionMeta = {
    dependentRepoCount: args.repos ? pending.length : dependentRepoCount,
    reposCloned: results.length,
    reposFailed,
    searchRequestsUsed: cp.discovery.searchRequestsUsed,
    manifestVersion: manifest.manifestVersion,
  };

  const snapshot: Snapshot = buildSnapshot(
    date,
    new Date().toISOString(),
    collection,
    results,
    ctx.packages
  );

  writeSnapshot(date, snapshot);

  // Reset the checkpoint for a fresh cycle next run.
  cp.phase = 'done';
  cp.reposParsed = results.length;
  clearCheckpoint();

  console.log(
    `Repos: ${results.length} cloned, ${reposFailed} failed. ` +
      `Org repos using hearth: ${Object.keys(snapshot.repos).length}.`
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
