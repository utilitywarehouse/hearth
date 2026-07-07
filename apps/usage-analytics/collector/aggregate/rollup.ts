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
  repoResults: Array<RepoResult>,
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
  // package -> symbol -> prop name -> count, org-wide.
  const symProps = new Map<string, Map<string, Record<string, number>>>();

  for (const { fullName, sha, parse } of repoResults) {
    const repoPkgs: RepoUsage['packages'] = {};
    let totalRefs = 0;

    for (const [pkg, agg] of Object.entries(parse.packages)) {
      repoPkgs[pkg] = { fileCount: agg.fileCount, refCount: agg.refCount, symbols: agg.symbols };
      totalRefs += agg.refCount;

      addToSet(pkgRepoSet, pkg, fullName);
      inc(pkgFileCount, pkg, agg.fileCount);
      inc(pkgRefCount, pkg, agg.refCount);

      for (const [sym, s] of Object.entries(agg.symbols)) {
        incNested(symFileCount, pkg, sym, s.fileCount);
        incNested(symRefCount, pkg, sym, s.refCount);
        addToNestedSet(symRepoSet, pkg, sym, fullName);
        if (s.props) {
          const pkgProps = symProps.get(pkg) ?? new Map<string, Record<string, number>>();
          symProps.set(pkg, pkgProps);
          const props = pkgProps.get(sym) ?? {};
          pkgProps.set(sym, props);
          for (const [propName, count] of Object.entries(s.props)) {
            props[propName] = (props[propName] ?? 0) + count;
          }
        }
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
        const props = symProps.get(name)?.get(sym);
        symbols[sym] = {
          fileCount,
          repoCount: symRepoSet.get(name)?.get(sym)?.size ?? 0,
          refCount: symRefCount.get(name)?.get(sym) ?? 0,
          ...(props ? { props } : {}),
        };
      }
    }

    const usage: PackageUsage = {
      type: m.type,
      repoCount: pkgRepoSet.get(name)?.size ?? 0,
      fileCount: pkgFileCount.get(name) ?? 0,
      refCount: pkgRefCount.get(name) ?? 0,
      symbols,
      legacy: m.legacy,
    };

    if (m.symbols.size > 0) {
      // Coverage: distinct exported symbols observed (roots for token groups).
      const usedRoots = new Set<string>();
      for (const sym of Object.keys(symbols)) {
        const root = sym.split('.')[0]!;
        if (m.symbols.has(root)) usedRoots.add(root);
      }
      const unusedExports = [...m.symbols].filter(s => !usedRoots.has(s)).sort();
      usage.coverage = { totalExported: m.symbols.size, used: usedRoots.size, unusedExports };
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
    orgTotals: { reposUsingAnyHearth: 0, totalHearthFiles: 0, totalHearthRefs: 0 },
    legacyTotals: { reposUsingAnyLegacy: 0, totalLegacyFiles: 0, totalLegacyRefs: 0 },
  };
  for (const [name, pkg] of Object.entries(snapshot.packages)) {
    entry.packages[name] = {
      repoCount: pkg.repoCount,
      fileCount: pkg.fileCount,
      refCount: pkg.refCount,
      legacy: pkg.legacy,
    };
    if (pkg.legacy) {
      entry.legacyTotals.totalLegacyFiles += pkg.fileCount;
      entry.legacyTotals.totalLegacyRefs += pkg.refCount;
    } else {
      entry.orgTotals.totalHearthFiles += pkg.fileCount;
      entry.orgTotals.totalHearthRefs += pkg.refCount;
    }
  }

  // A repo can use legacy packages, hearth packages, or both — count each
  // repo under every bucket it actually touches, not just "uses anything".
  for (const repo of Object.values(snapshot.repos)) {
    const pkgNames = Object.keys(repo.packages);
    if (pkgNames.some(n => !snapshot.packages[n]?.legacy)) entry.orgTotals.reposUsingAnyHearth += 1;
    if (pkgNames.some(n => snapshot.packages[n]?.legacy)) entry.legacyTotals.reposUsingAnyLegacy += 1;
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
  if (!inner) map.set(k1, (inner = new Map<string, number>()));
  inner.set(k2, (inner.get(k2) ?? 0) + by);
}
function addToSet(map: Map<string, Set<string>>, key: string, value: string) {
  let set = map.get(key);
  if (!set) map.set(key, (set = new Set()));
  set.add(value);
}
function addToNestedSet(map: Map<string, Map<string, Set<string>>>, k1: string, k2: string, value: string) {
  let inner = map.get(k1);
  if (!inner) map.set(k1, (inner = new Map<string, Set<string>>()));
  let set = inner.get(k2);
  if (!set) inner.set(k2, (set = new Set()));
  set.add(value);
}
