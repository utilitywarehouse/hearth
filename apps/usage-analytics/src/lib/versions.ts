/**
 * Hand-rolled helpers for the declared semver ranges collected from
 * downstream `package.json` files (see `RepoPackageUsage.versions` /
 * `PackageUsage.versions` in `../data/types`). No semver dependency — ranges
 * only need to be bucketed by "the version segment that signals a breaking
 * change", not fully resolved.
 */

const LEADING_VERSION = /(\d+)\.(\d+)\.(\d+)/;

/**
 * Extract the first `x.y.z` version out of a declared range, stripping range
 * prefixes (`^`, `~`, `>=`, `workspace:`, etc). Returns null for ranges with
 * no parseable version (`workspace:*`, `latest`, `next`, git URLs, OR-ranges
 * with no leading number) — those are bucketed as "other" by callers.
 */
export function parseLeadingVersion(range: string): string | null {
  const match = LEADING_VERSION.exec(range);
  return match ? `${match[1]}.${match[2]}.${match[3]}` : null;
}

/**
 * The version segment that signals a breaking change: the major version once
 * it's >=1, or the minor version while still pre-1.0. Every hearth package is
 * currently 0.x, and semver's 0ver convention treats a minor bump pre-1.0 the
 * same way a major bump is treated post-1.0 — so bucketing by major alone
 * would lump every real hearth version into a single "v0" bucket. Returned as
 * one comparable number where any major>=1 always outranks every 0.x version.
 */
export function significantVersion(version: string): number | null {
  const parsed = parseLeadingVersion(version);
  if (!parsed) return null;
  const [major, minor] = parsed.split('.').map(Number) as [number, number];
  return major > 0 ? major + 1000 : minor;
}

/** Display bucket for a declared range: "v2" (major>=1), "0.31" (pre-1.0), or "other" if unparseable. */
export function versionBucket(range: string): string {
  const parsed = parseLeadingVersion(range);
  if (!parsed) return 'other';
  const [major, minor] = parsed.split('.');
  return major !== '0' ? `v${major}` : `0.${minor}`;
}

/**
 * Whether a declared range is behind `latest` by {@link significantVersion} —
 * the granularity that matters for "can we deprecate this" planning, not
 * patch drift. Ranges that don't parse as semver (`workspace:*`, git URLs, …)
 * are never flagged as outdated — there's nothing to compare.
 */
export function isOutdated(range: string, latest: string | undefined): boolean {
  if (!latest) return false;
  const rangeVersion = significantVersion(range);
  const latestVersion = significantVersion(latest);
  if (rangeVersion === null || latestVersion === null) return false;
  return rangeVersion < latestVersion;
}

/**
 * Sort version ranges descending by {@link significantVersion} (unparseable
 * ranges sort last). Falls back to a string compare when two ranges share a
 * significant version (e.g. `^0.31.0` vs `^0.31.5`) so ordering is
 * deterministic rather than depending on object insertion order.
 */
export function compareVersionsDesc(a: string, b: string): number {
  const sa = significantVersion(a);
  const sb = significantVersion(b);
  if (sa === null && sb === null) return a.localeCompare(b);
  if (sa === null) return 1;
  if (sb === null) return -1;
  return sb - sa || a.localeCompare(b);
}

/** Numeric rank for a {@link versionBucket} label, for sorting — higher is newer. */
function bucketRank(label: string): number {
  if (label === 'other') return -Infinity;
  if (label.startsWith('v')) return 100_000 + Number(label.slice(1));
  return Number(label.slice(2)); // "0.31" -> 31
}

/** Sort {@link versionBucket} labels ("v2", "0.31", …, "other") descending, "other" last. */
export function compareBucketsDesc(a: string, b: string): number {
  return bucketRank(b) - bucketRank(a);
}

/** Chart colour for the Nth series in a version-bucket breakdown (index 0 = newest, once sorted). */
const BUCKET_PALETTE = [
  'var(--h-color-blue-600)',
  'var(--h-color-green-600)',
  'var(--h-color-orange-600)',
  'var(--h-color-yellow-600)',
  'var(--h-color-grey-500)',
];
export function bucketColor(index: number): string {
  return BUCKET_PALETTE[index % BUCKET_PALETTE.length]!;
}
