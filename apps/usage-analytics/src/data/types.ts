/**
 * Shared data contracts between the collector (Node) and the dashboard (SPA).
 * Keep this file dependency-free so it can be imported from both `tsconfig`s.
 */

export const SCHEMA_VERSION = 1;

/** The kind of a hearth package — drives how the dashboard renders it. */
export type PackageType = 'component-lib' | 'tokens' | 'icons' | 'asset';

/** Usage counts for a single symbol (component / icon / token group). */
export interface SymbolUsage {
  /** Distinct files across the org that reference this symbol. */
  fileCount: number;
  /** Distinct repos that reference this symbol. */
  repoCount: number;
  /** Total references (imports + JSX usages / member accesses). */
  refCount: number;
  /**
   * JSX prop name -> total times passed to this symbol, org-wide. Only present
   * for `component-lib` symbols (hearth-react / hearth-react-native). Tracks
   * prop *names*, not literal values; `{...spread}` props are unresolvable
   * statically and are not counted.
   */
  props?: Record<string, number>;
}

/** Coverage of a package's exported surface (how much of it is actually used). */
export interface Coverage {
  totalExported: number;
  used: number;
  /** Exported symbol names with zero observed usage across the org, sorted. */
  unusedExports: Array<string>;
}

/** Org-wide aggregate for one package in a snapshot. */
export interface PackageUsage {
  type: PackageType;
  /** Distinct repos importing the package. */
  repoCount: number;
  /** Distinct files importing the package. */
  fileCount: number;
  /** Total references to the package's symbols across the org. */
  refCount: number;
  /** Symbol name -> usage. Empty for `asset` packages. */
  symbols: Record<string, SymbolUsage>;
  /** Present for packages with an exported symbol surface. */
  coverage?: Coverage;
  /** A pre-hearth predecessor package, tracked to watch its usage fall to zero. */
  legacy: boolean;
  /**
   * Declared semver range -> distinct repo count declaring it, org-wide. A
   * repo counts once per range even if multiple workspace `package.json`
   * files within it declare the same range. Absent on snapshots collected
   * before version tracking was added.
   */
  versions?: Record<string, number>;
  /**
   * This package's own currently-published version at collection time (from
   * the local hearth workspace), used to flag repos on outdated versions.
   * Absent for legacy packages (no local source) and on older snapshots.
   */
  latestVersion?: string;
}

/** Usage of a single symbol within one repo. */
export interface RepoSymbolUsage {
  /** Distinct files in this repo that reference the symbol. */
  fileCount: number;
  /** Total references to the symbol within this repo. */
  refCount: number;
  /** JSX prop name -> times passed to this symbol within this repo. See {@link SymbolUsage.props}. */
  props?: Record<string, number>;
}

/** What a single repo uses of a single package. */
export interface RepoPackageUsage {
  fileCount: number;
  refCount: number;
  /** Symbol name -> usage within this repo. */
  symbols: Record<string, RepoSymbolUsage>;
  /**
   * Declared semver range (as written in `package.json`, e.g. `^2.3.0`) ->
   * number of `package.json` files in this repo declaring it that way. A
   * monorepo whose sub-packages pin different ranges will have more than one
   * entry. Present even when the package is declared but never imported
   * (`fileCount`/`refCount` are 0 in that case) — installed-but-unused is
   * itself a useful signal. Absent on snapshots collected before version
   * tracking was added.
   */
  versions?: Record<string, number>;
}

/** Per-repo breakdown in a snapshot. */
export interface RepoUsage {
  /** HEAD sha of the shallow clone the data was parsed from. */
  clonedSha: string;
  /** package name -> usage within this repo. */
  packages: Record<string, RepoPackageUsage>;
  /** Total references across all hearth packages in this repo. */
  totalRefs: number;
}

/** Metadata about how a snapshot was collected. */
export interface CollectionMeta {
  /** Distinct dependent repos discovered via code search. */
  dependentRepoCount: number;
  /** Repos successfully cloned + parsed this cycle. */
  reposCloned: number;
  /** Repos that failed to clone/parse (surfaced as a caveat). */
  reposFailed: number;
  /** Code-search requests spent on discovery. */
  searchRequestsUsed: number;
  /** Version of the local hearth workspace whose exports built the allow-list. */
  manifestVersion: string;
}

/** A full weekly snapshot. Immutable once written. */
export interface Snapshot {
  schemaVersion: number;
  /** ISO date (YYYY-MM-DD) that names the snapshot. */
  date: string;
  /** ISO timestamp the snapshot finished. */
  generatedAt: string;
  collection: CollectionMeta;
  /** package name -> org-wide usage. All tracked packages present (may be zero). */
  packages: Record<string, PackageUsage>;
  /** repo full name (owner/repo) -> breakdown. */
  repos: Record<string, RepoUsage>;
}

/** A single per-package top-line entry in the rolled-up index. */
export interface IndexPackageTotals {
  repoCount: number;
  fileCount: number;
  refCount: number;
  legacy: boolean;
  /** Same shape as {@link PackageUsage.versions}, this week — powers the version-adoption-over-time chart without fetching every snapshot. */
  versions?: Record<string, number>;
}

/** One weekly entry in the rolled-up time-series index. */
export interface IndexEntry {
  date: string;
  file: string;
  packages: Record<string, IndexPackageTotals>;
  /** Totals across current (non-legacy) hearth packages only. */
  orgTotals: {
    reposUsingAnyHearth: number;
    totalHearthFiles: number;
    totalHearthRefs: number;
  };
  /** Totals across legacy predecessor packages only — watch these fall to zero. */
  legacyTotals: {
    reposUsingAnyLegacy: number;
    totalLegacyFiles: number;
    totalLegacyRefs: number;
  };
}

/** The rolled-up time-series index — small, powers all trend charts. */
export interface UsageIndex {
  schemaVersion: number;
  snapshots: Array<IndexEntry>;
}

/** Resume state persisted between collector runs. */
export interface Checkpoint {
  runId: string;
  phase: 'discovery' | 'collect' | 'done';
  discovery: {
    /** Search terms (the combined hearth term, plus one per legacy package) still to query. */
    queue: Array<string>;
    /** search term -> repos found matching it. */
    found: Record<string, Array<string>>;
    searchRequestsUsed: number;
  };
  /** owner/repo of dependent repos still awaiting clone+parse. */
  pendingRepos: Array<string>;
  reposParsed: number;
  startedAt: string;
  lastUpdatedAt: string;
}
