import type { Snapshot, UsageIndex } from '../data/types';
import type { TrendPoint } from '../components/charts';
import { isOutdated, versionBucket } from './versions';

/** Org-wide totals over time (adoption + volume). */
export function orgTrend(index: UsageIndex): Array<TrendPoint> {
  return index.snapshots.map(s => ({
    date: s.date,
    repos: s.orgTotals.reposUsingAnyHearth,
    files: s.orgTotals.totalHearthFiles,
    refs: s.orgTotals.totalHearthRefs,
  }));
}

/** Legacy predecessor packages' totals over time — watch this trend to zero. */
export function legacyTrend(index: UsageIndex): Array<TrendPoint> {
  return index.snapshots.map(s => ({
    date: s.date,
    repos: s.legacyTotals.reposUsingAnyLegacy,
    files: s.legacyTotals.totalLegacyFiles,
    refs: s.legacyTotals.totalLegacyRefs,
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

/**
 * One package's version distribution over time, bucketed by significant
 * version (see {@link versionBucket}) — repo count per bucket, per week. Drives the
 * "version adoption over time" chart on a package's detail page. Reads
 * straight off the lean `index.json`, no per-snapshot fetch needed (mirrors
 * how {@link packageTrend} works off refCount/fileCount/repoCount).
 */
export function packageVersionTrend(index: UsageIndex, pkg: string): Array<TrendPoint> {
  return index.snapshots.map(s => {
    const point: TrendPoint = { date: s.date };
    const versions = s.packages[pkg]?.versions;
    if (versions) {
      for (const [range, repoCount] of Object.entries(versions)) {
        const bucket = versionBucket(range);
        point[bucket] = (Number(point[bucket]) || 0) + repoCount;
      }
    }
    return point;
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
export function symbolTrend(
  snapshots: Array<Snapshot>,
  pkg: string,
  symbol: string
): Array<TrendPoint> {
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

/**
 * Repos that use a given package at all, with file/ref counts, sorted desc.
 * Excludes repos that only *declare* the package (see {@link RepoPackageUsage.versions})
 * without importing it anywhere — that's surfaced separately in the version
 * breakdown, not folded into a "usage" ranking.
 */
export function reposUsingPackage(
  snapshot: Snapshot,
  pkg: string
): Array<{ repo: string; refs: number; files: number; symbolCount: number }> {
  const out: Array<{ repo: string; refs: number; files: number; symbolCount: number }> = [];
  for (const [repo, usage] of Object.entries(snapshot.repos)) {
    const p = usage.packages[pkg];
    if (p && (p.refCount > 0 || p.fileCount > 0)) {
      out.push({
        repo,
        refs: p.refCount,
        files: p.fileCount,
        symbolCount: Object.keys(p.symbols).length,
      });
    }
  }
  return out.sort((a, b) => b.refs - a.refs);
}

/**
 * Repos ranked by their usage of either the current (hearth) or legacy package
 * set, with per-repo refs/files/package-count restricted to that set — so a
 * repo mid-migration shows up correctly in both rankings, scoped to what it
 * actually uses from each side.
 */
function reposByLegacyStatus(
  snapshot: Snapshot,
  wantLegacy: boolean
): Array<{ repo: string; refs: number; files: number; pkgCount: number }> {
  const out: Array<{ repo: string; refs: number; files: number; pkgCount: number }> = [];
  for (const [repo, usage] of Object.entries(snapshot.repos)) {
    let refs = 0;
    let files = 0;
    let pkgCount = 0;
    for (const [name, p] of Object.entries(usage.packages)) {
      if ((snapshot.packages[name]?.legacy ?? false) !== wantLegacy) continue;
      // Skip declared-but-never-imported packages (see RepoPackageUsage.versions)
      // — they shouldn't count as "usage" here.
      if (p.refCount === 0 && p.fileCount === 0) continue;
      refs += p.refCount;
      files += p.fileCount;
      pkgCount += 1;
    }
    if (pkgCount > 0) out.push({ repo, refs, files, pkgCount });
  }
  return out.sort((a, b) => b.refs - a.refs);
}

export function reposUsingHearth(
  snapshot: Snapshot
): Array<{ repo: string; refs: number; files: number; pkgCount: number }> {
  return reposByLegacyStatus(snapshot, false);
}

export function reposUsingLegacy(
  snapshot: Snapshot
): Array<{ repo: string; refs: number; files: number; pkgCount: number }> {
  return reposByLegacyStatus(snapshot, true);
}

/**
 * Org-wide version-health split: how many (package, repo) installs are on the
 * package's current significant version (see {@link isOutdated}) vs. behind
 * it. Only counts packages with a known `latestVersion` (i.e. non-legacy —
 * legacy predecessors have no local source to read a "latest" from).
 */
export function orgVersionHealth(snapshot: Snapshot): { onLatest: number; behind: number } {
  let onLatest = 0;
  let behind = 0;
  for (const pkg of Object.values(snapshot.packages)) {
    if (!pkg.latestVersion || !pkg.versions) continue;
    for (const [range, repoCount] of Object.entries(pkg.versions)) {
      if (isOutdated(range, pkg.latestVersion)) behind += repoCount;
      else onLatest += repoCount;
    }
  }
  return { onLatest, behind };
}

/**
 * Repos ranked by how many distinct packages they're behind the latest
 * significant version on, descending — a starting point for
 * deprecation/migration outreach.
 */
export function reposBehindLatest(
  snapshot: Snapshot
): Array<{ repo: string; outdatedCount: number; trackedCount: number }> {
  const out: Array<{ repo: string; outdatedCount: number; trackedCount: number }> = [];
  for (const [repo, usage] of Object.entries(snapshot.repos)) {
    let outdatedCount = 0;
    let trackedCount = 0;
    for (const [pkg, p] of Object.entries(usage.packages)) {
      const latest = snapshot.packages[pkg]?.latestVersion;
      if (!latest || !p.versions) continue;
      trackedCount += 1;
      if (Object.keys(p.versions).some(range => isOutdated(range, latest))) outdatedCount += 1;
    }
    if (outdatedCount > 0) out.push({ repo, outdatedCount, trackedCount });
  }
  return out.sort((a, b) => b.outdatedCount - a.outdatedCount);
}
