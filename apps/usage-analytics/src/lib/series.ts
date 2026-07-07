import type { Snapshot, UsageIndex } from '../data/types';
import type { TrendPoint } from '../components/charts';

/** Org-wide totals over time (adoption + volume). */
export function orgTrend(index: UsageIndex): Array<TrendPoint> {
  return index.snapshots.map(s => ({
    date: s.date,
    repos: s.orgTotals.reposUsingAnyHearth,
    files: s.orgTotals.totalHearthFiles,
    refs: s.orgTotals.totalHearthRefs,
  }));
}

/** One package's totals over time. */
export function packageTrend(index: UsageIndex, pkg: string): Array<TrendPoint> {
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
export function perPackageRefTrend(index: UsageIndex, packages: Array<string>): Array<TrendPoint> {
  return index.snapshots.map(s => {
    const point: TrendPoint = { date: s.date };
    for (const pkg of packages) point[pkg] = s.packages[pkg]?.refCount ?? 0;
    return point;
  });
}

/** A single symbol's reference count over time. */
export function symbolTrend(snapshots: Array<Snapshot>, pkg: string, symbol: string): Array<TrendPoint> {
  return snapshots
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(s => ({ date: s.date, refs: s.packages[pkg]?.symbols[symbol]?.refCount ?? 0 }));
}

/** Repos that use a given symbol, with file + ref counts, sorted desc. */
export function reposUsingSymbol(
  snapshot: Snapshot,
  pkg: string,
  symbol: string
): Array<{ repo: string; refs: number; files: number }> {
  const out: Array<{ repo: string; refs: number; files: number }> = [];
  for (const [repo, usage] of Object.entries(snapshot.repos)) {
    const s = usage.packages[pkg]?.symbols[symbol];
    if (s) out.push({ repo, refs: s.refCount, files: s.fileCount });
  }
  return out.sort((a, b) => b.refs - a.refs);
}

/**
 * Prop usage for a given symbol, sorted desc. Empty when the symbol has no
 * prop data (older snapshots collected before prop tracking, or non-component-lib
 * symbols such as tokens/icons).
 */
export function propsForSymbol(
  snapshot: Snapshot,
  pkg: string,
  symbol: string
): Array<{ name: string; count: number }> {
  const props = snapshot.packages[pkg]?.symbols[symbol]?.props;
  if (!props) return [];
  return Object.entries(props)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/** Repos that use a given package at all, with file/ref counts, sorted desc. */
export function reposUsingPackage(
  snapshot: Snapshot,
  pkg: string
): Array<{ repo: string; refs: number; files: number; symbolCount: number }> {
  const out: Array<{ repo: string; refs: number; files: number; symbolCount: number }> = [];
  for (const [repo, usage] of Object.entries(snapshot.repos)) {
    const p = usage.packages[pkg];
    if (p) out.push({ repo, refs: p.refCount, files: p.fileCount, symbolCount: Object.keys(p.symbols).length });
  }
  return out.sort((a, b) => b.refs - a.refs);
}
