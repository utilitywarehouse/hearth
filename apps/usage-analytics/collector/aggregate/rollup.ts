import type {
  CollectionMeta,
  IndexEntry,
  PackageUsage,
  RepoUsage,
  Snapshot,
  UsageIndex,
} from '../../src/data/types.ts';
import { SCHEMA_VERSION } from '../../src/data/types.ts';
import type { PackageMeta } from '../parse/imports.ts';
import type { RepoParseResult } from '../parse/walk.ts';

export interface RepoResult {
  fullName: string;
  sha: string;
  parse: RepoParseResult;
}

/** Build a full snapshot from per-repo parse results. */
export function buildSnapshot(
  date: string,
  generatedAt: string,
  collection: CollectionMeta,
  repoResults: RepoResult[],
  meta: Map<string, PackageMeta>
): Snapshot {
  const repos: Record<string, RepoUsage> = {};

  // Per package, per symbol accumulators for the org-wide view.
  const pkgRepoSet = new Map<string, Set<string>>();
  const pkgFileCount = new Map<string, number>();
  const pkgRefCount = new Map<string, number>();
  const symFileCount = new Map<string, Map<string, number>>();
  const symRepoSet = new Map<string, Map<string, Set<string>>>();
  const symRefCount = new Map<string, Map<string, number>>();

  for (const { fullName, sha, parse } of repoResults) {
    const repoPkgs: RepoUsage['packages'] = {};
    let totalRefs = 0;

    for (const [pkg, agg] of Object.entries(parse.packages)) {
      repoPkgs[pkg] = { fileCount: agg.fileCount, refCount: agg.refCount, symbols: agg.symbols };
      totalRefs += agg.refCount;

      addToSet(pkgRepoSet, pkg, fullName);
      inc(pkgFileCount, pkg, agg.fileCount);
      inc(pkgRefCount, pkg, agg.refCount);

      for (const [sym, count] of Object.entries(agg.symbols)) {
        incNested(symFileCount, pkg, sym, 1); // file-level: repo contributes ≥1 file
        incNested(symRefCount, pkg, sym, count);
        addToNestedSet(symRepoSet, pkg, sym, fullName);
      }
    }

    if (Object.keys(repoPkgs).length > 0) {
      repos[fullName] = { clonedSha: sha, packages: repoPkgs, totalRefs };
    }
  }

  const packages: Record<string, PackageUsage> = {};
  for (const [name, m] of meta) {
    const symbols: PackageUsage['symbols'] = {};
    const symFiles = symFileCount.get(name);
    if (symFiles) {
      for (const [sym, fileCount] of symFiles) {
        symbols[sym] = {
          fileCount,
          repoCount: symRepoSet.get(name)?.get(sym)?.size ?? 0,
          refCount: symRefCount.get(name)?.get(sym) ?? 0,
        };
      }
    }

    const usage: PackageUsage = {
      type: m.type,
      repoCount: pkgRepoSet.get(name)?.size ?? 0,
      fileCount: pkgFileCount.get(name) ?? 0,
      refCount: pkgRefCount.get(name) ?? 0,
      symbols,
    };

    if (m.symbols.size > 0) {
      // Coverage: distinct exported symbols observed (roots for token groups).
      const usedRoots = new Set<string>();
      for (const sym of Object.keys(symbols)) {
        const root = sym.split('.')[0]!;
        if (m.symbols.has(root)) usedRoots.add(root);
      }
      usage.coverage = { totalExported: m.symbols.size, used: usedRoots.size };
    }

    packages[name] = usage;
  }

  return {
    schemaVersion: SCHEMA_VERSION,
    date,
    generatedAt,
    collection,
    packages,
    repos,
  };
}

/** Append (or replace) a snapshot's roll-up entry in the time-series index. */
export function updateIndex(existing: UsageIndex | null, snapshot: Snapshot): UsageIndex {
  const entry: IndexEntry = {
    date: snapshot.date,
    file: `snapshots/${snapshot.date}.json`,
    packages: {},
    orgTotals: {
      reposUsingAnyHearth: Object.keys(snapshot.repos).length,
      totalHearthFiles: 0,
      totalHearthRefs: 0,
    },
  };
  for (const [name, pkg] of Object.entries(snapshot.packages)) {
    entry.packages[name] = {
      repoCount: pkg.repoCount,
      fileCount: pkg.fileCount,
      refCount: pkg.refCount,
    };
    entry.orgTotals.totalHearthFiles += pkg.fileCount;
    entry.orgTotals.totalHearthRefs += pkg.refCount;
  }

  const snapshots = (existing?.snapshots ?? []).filter(s => s.date !== snapshot.date);
  snapshots.push(entry);
  snapshots.sort((a, b) => a.date.localeCompare(b.date));
  return { schemaVersion: SCHEMA_VERSION, snapshots };
}

function inc(map: Map<string, number>, key: string, by: number) {
  map.set(key, (map.get(key) ?? 0) + by);
}
function incNested(map: Map<string, Map<string, number>>, k1: string, k2: string, by: number) {
  let inner = map.get(k1);
  if (!inner) map.set(k1, (inner = new Map()));
  inner.set(k2, (inner.get(k2) ?? 0) + by);
}
function addToSet(map: Map<string, Set<string>>, key: string, value: string) {
  let set = map.get(key);
  if (!set) map.set(key, (set = new Set()));
  set.add(value);
}
function addToNestedSet(map: Map<string, Map<string, Set<string>>>, k1: string, k2: string, value: string) {
  let inner = map.get(k1);
  if (!inner) map.set(k1, (inner = new Map()));
  let set = inner.get(k2);
  if (!set) inner.set(k2, (set = new Set()));
  set.add(value);
}
