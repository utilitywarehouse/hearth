import type { Snapshot, UsageIndex } from '../data/types';
import type { TrendPoint } from '../components/charts';

/** Org-wide totals over time (adoption + volume). */
export function orgTrend(index: UsageIndex): TrendPoint[] {
  return index.snapshots.map(s => ({
    date: s.date,
    repos: s.orgTotals.reposUsingAnyHearth,
    files: s.orgTotals.totalHearthFiles,
    refs: s.orgTotals.totalHearthRefs,
  }));
}

/** One package's totals over time. */
export function packageTrend(index: UsageIndex, pkg: string): TrendPoint[] {
  return index.snapshots.map(s => {
    const p = s.packages[pkg];
    return {
      date: s.date,
      refs: p?.refCount ?? 0,
      files: p?.fileCount ?? 0,
      repos: p?.repoCount ?? 0,
    };
  });
}

/** Per-package reference counts over time, one series per package. */
export function perPackageRefTrend(index: UsageIndex, packages: string[]): TrendPoint[] {
  return index.snapshots.map(s => {
    const point: TrendPoint = { date: s.date };
    for (const pkg of packages) point[pkg] = s.packages[pkg]?.refCount ?? 0;
    return point;
  });
}

/** A single symbol's reference count over time. */
export function symbolTrend(snapshots: Snapshot[], pkg: string, symbol: string): TrendPoint[] {
  return snapshots
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(s => ({ date: s.date, refs: s.packages[pkg]?.symbols[symbol]?.refCount ?? 0 }));
}

/** Repos that use a given symbol, with ref counts, sorted desc. */
export function reposUsingSymbol(
  snapshot: Snapshot,
  pkg: string,
  symbol: string
): { repo: string; refs: number }[] {
  const out: { repo: string; refs: number }[] = [];
  for (const [repo, usage] of Object.entries(snapshot.repos)) {
    const refs = usage.packages[pkg]?.symbols[symbol];
    if (refs) out.push({ repo, refs });
  }
  return out.sort((a, b) => b.refs - a.refs);
}
