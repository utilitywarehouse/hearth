/**
 * Generate a deterministic SAMPLE dataset so the dashboard renders out-of-the-box
 * before the scheduled collector has populated real snapshots. Uses real hearth
 * symbol names from the manifest for authenticity. Safe to re-run; the real
 * GitHub Action appends/overwrites dated snapshots over time.
 *
 * Run: pnpm --filter usage-analytics exec tsx scripts/gen-sample-data.ts
 */
import { INDEX_FILE, MANIFEST_FILE, SNAPSHOTS_DIR } from '../collector/config.ts';
import { buildContext } from '../collector/parse/walk.ts';
import { buildSnapshot, updateIndex, type RepoResult } from '../collector/aggregate/rollup.ts';
import type { RepoParseResult } from '../collector/parse/walk.ts';
import type { SymbolManifest } from '../collector/parse/build-manifests.ts';
import type { CollectionMeta, Snapshot, UsageIndex } from '../src/data/types.ts';
import { readJson, writeJson } from '../collector/util/json.ts';

// Deterministic PRNG (mulberry32) so committed sample data is stable.
function makeRng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const REPOS = [
  'utilitywarehouse/customer-web',
  'utilitywarehouse/residential-mobile-app',
  'utilitywarehouse/energy-portal',
  'utilitywarehouse/billing-service-ui',
  'utilitywarehouse/my-account',
  'utilitywarehouse/broadband-checkout',
  'utilitywarehouse/smart-home-app',
  'utilitywarehouse/partner-dashboard',
];

const WEEKS = ['2026-06-23', '2026-06-30', '2026-07-07'];

const manifest = readJson<SymbolManifest>(MANIFEST_FILE);
if (!manifest) throw new Error('Run `pnpm gen:manifests` first.');
const ctx = buildContext(manifest);

/** Token group names (root.sub) synthesized from token namespaces. */
function tokenGroups(): Array<string> {
  const roots = manifest!.packages['@utilitywarehouse/hearth-tokens']?.symbols ?? [];
  const subs: Record<string, Array<string>> = {
    color: ['blue', 'red', 'green', 'grey', 'purple', 'cyan'],
    space: [],
    typography: ['body', 'heading', 'display'],
    semantic: ['action', 'surface', 'border'],
  };
  const groups: Array<string> = [];
  for (const root of roots) {
    const s = subs[root];
    if (s && s.length) for (const sub of s) groups.push(`${root}.${sub}`);
    else groups.push(root);
  }
  return groups;
}

/**
 * Plausible JSX prop names to sprinkle onto fabricated component-lib usages.
 * Not meant to reflect any single component's real prop surface — just gives
 * the sample dataset something to render in the props view before a real
 * collector run backfills actual prop names.
 */
const SAMPLE_PROPS = [
  'variant',
  'size',
  'color',
  'disabled',
  'onClick',
  'onChange',
  'className',
  'children',
  'label',
  'icon',
  'fullWidth',
  'loading',
];

function pick<T>(rng: () => number, arr: Array<T>, n: number): Array<T> {
  const copy = [...arr];
  const out: Array<T> = [];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(Math.floor(rng() * copy.length), 1)[0]!);
  }
  return out;
}

function symbolsFor(pkg: string): Array<string> {
  if (pkg === '@utilitywarehouse/hearth-tokens') return tokenGroups();
  return manifest!.packages[pkg]?.symbols ?? [];
}

/** Build a plausible parse result for one repo in one week. */
function repoParse(repo: string, weekIndex: number): RepoParseResult {
  const rng = makeRng(hash(repo) + weekIndex * 7919);
  const growth = 1 + weekIndex * 0.18; // usage grows ~18%/week
  const packages: RepoParseResult['packages'] = {};

  // Every repo uses tokens + react; some use icons / native / assets.
  const usesRN = rng() < 0.35;
  const chosen = [
    '@utilitywarehouse/hearth-react',
    '@utilitywarehouse/hearth-tokens',
    ...(rng() < 0.8 ? ['@utilitywarehouse/hearth-react-icons'] : []),
    ...(usesRN
      ? ['@utilitywarehouse/hearth-react-native', '@utilitywarehouse/hearth-react-native-icons']
      : []),
    ...(rng() < 0.5 ? ['@utilitywarehouse/hearth-fonts'] : []),
    ...(rng() < 0.4 ? ['@utilitywarehouse/hearth-css-reset'] : []),
  ];

  for (const pkg of chosen) {
    const type = ctx.packages.get(pkg)?.type ?? 'asset';
    const allSymbols = symbolsFor(pkg);
    const symbols: RepoParseResult['packages'][string]['symbols'] = {};
    let refCount = 0;
    let fileCount: number;

    if (type === 'asset' || allSymbols.length === 0) {
      fileCount = 1 + Math.floor(rng() * 6 * growth);
      refCount = fileCount + Math.floor(rng() * 10 * growth);
    } else {
      const count = Math.max(3, Math.floor((6 + rng() * 24) * (type === 'icons' ? 1.5 : 1)));
      const used = pick(rng, allSymbols, Math.min(count, allSymbols.length));
      for (const sym of used) {
        const refs = 1 + Math.floor(rng() * 30 * growth);
        // Distinct files referencing this symbol — always <= refs (a file can
        // reference the same symbol more than once).
        const symFiles = 1 + Math.floor(rng() * Math.min(refs - 1, 5));
        symbols[sym] = { refCount: refs, fileCount: symFiles };
        refCount += refs;

        if (type === 'component-lib' && !sym.endsWith('Props')) {
          const propNames = pick(rng, SAMPLE_PROPS, 2 + Math.floor(rng() * 5));
          const props: Record<string, number> = {};
          for (const p of propNames) {
            props[p] = 1 + Math.floor(rng() * refs);
          }
          symbols[sym].props = props;
        }
      }
      fileCount = Math.max(1, Math.floor(used.length * (0.4 + rng() * 0.6)));
    }
    packages[pkg] = { fileCount, refCount, symbols };
  }

  return { packages, filesScanned: 0, filesParsed: 0 };
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function main() {
  let index: UsageIndex | null = readJson<UsageIndex>(INDEX_FILE);

  WEEKS.forEach((date, weekIndex) => {
    // A couple of repos only adopt hearth partway through the timeline.
    const activeRepos = REPOS.slice(0, weekIndex === 0 ? 5 : weekIndex === 1 ? 7 : 8);
    const results: Array<RepoResult> = activeRepos.map(fullName => ({
      fullName,
      sha: `sample-${weekIndex}`,
      parse: repoParse(fullName, weekIndex),
    }));

    const collection: CollectionMeta = {
      dependentRepoCount: activeRepos.length,
      reposCloned: activeRepos.length,
      reposFailed: 0,
      searchRequestsUsed: 6,
      manifestVersion: manifest!.manifestVersion,
    };

    const snapshot: Snapshot = buildSnapshot(
      date,
      `${date}T03:14:00.000Z`,
      collection,
      results,
      ctx.packages
    );
    writeJson(`${SNAPSHOTS_DIR}/${date}.json`, snapshot);
    index = updateIndex(index, snapshot);
    console.log(`  ${date}: ${activeRepos.length} repos`);
  });

  writeJson(INDEX_FILE, index);
  console.log(`\nSample data written to data/ (${WEEKS.length} weekly snapshots).`);
}

main();
