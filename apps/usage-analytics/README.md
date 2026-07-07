# usage-analytics

Org-wide usage analytics for `@utilitywarehouse/hearth-*` packages. A collector
sweeps the `utilitywarehouse` GitHub org for external adopters and a Vite + React
dashboard (built with hearth-react + hearth-tokens) visualises the results.

## How it works

Because GitHub code search is capped at **10 requests/hour** and **1000 results
per query**, but only ~tens of repos actually install hearth (each with thousands
of references), the collector is deliberately two-phase:

1. **Discover** dependent repos cheaply via code search on `package.json`
   (`collector/github/discover.ts`) — small result sets, sips the search budget.
2. **Collect** by shallow-cloning each dependent repo and parsing locally
   (`collector/github/clone.ts` + `collector/parse/*`) — no code-search cap, no
   per-file API limits, and it counts *actual references* (imports, JSX usages,
   token member-access), not just file matches. For `component-lib` packages
   (`hearth-react`, `hearth-react-native`), the same JSX pass also records which
   **prop names** are passed to each component, so a symbol's usage breaks down
   into e.g. `variant` (30), `onClick` (25) — not just a single ref count.

**Legacy tracking:** alongside the 10 hearth packages, the collector also tracks
8 predecessor packages from
[utilitywarehouse/icons](https://github.com/utilitywarehouse/icons) and
[utilitywarehouse/design-systems](https://github.com/utilitywarehouse/design-systems)
(`react-icons`, `react-native-icons`, `svg-icons`, `colour-system`, `css-reset`,
`design-tokens`, `native-ui`, `web-ui`) — not to measure hearth adoption, but to
watch their usage fall to zero as repos finish migrating. They have no local
source in this workspace, so there's no symbol allow-list for them (any imported
name is accepted, same as an `asset` package with no manifest) and no coverage
stat. Discovery costs one extra code-search query per legacy package name (they
don't share a substring the way `@utilitywarehouse/hearth-*` does, and GitHub's
code-search API has no OR operator) — 9 queries total per run, still well within
the 10/hr budget for a weekly collector. See `LEGACY_PACKAGE_NAMES` /
`DISCOVERY_TERMS` in `collector/config.ts`. The dashboard surfaces them in their
own sidebar section and a `/legacy` overview page, separate from the main
Overview so they don't distort current hearth-adoption numbers.

The hearth repo itself is excluded (external adopters only). Results are written
as diff-friendly, dated JSON snapshots under `data/`, rolled up into
`data/index.json` for time-series. A weekly GitHub Action
(`.github/workflows/collect-usage-analytics.yml`) runs the collector and opens a
PR with the new snapshot.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm --filter usage-analytics dev` | Run the dashboard locally (port 4321, or `$PORT` if set). |
| `pnpm --filter usage-analytics build` | Typecheck + production build. |
| `pnpm --filter usage-analytics gen:manifests` | Rebuild the per-package symbol allow-list from hearth's own exports. Commit `collector/symbol-manifests/symbols.json`. |
| `pnpm --filter usage-analytics gen:sample` | Regenerate the seed sample dataset in `data/`. |
| `pnpm --filter usage-analytics clear-data` | Remove all snapshots and reset `data/index.json`, e.g. to drop the sample dataset before a real collection run. |
| `pnpm --filter usage-analytics collect` | Run the collector (needs `GITHUB_PAT_TOKEN`). |
| `pnpm --filter usage-analytics test` | Parser unit tests. |

### Collector flags

```
pnpm --filter usage-analytics collect                 # full org sweep (weekly)
pnpm --filter usage-analytics collect --repo owner/x   # skip discovery, one repo
pnpm --filter usage-analytics collect --local ../some-checkout --name owner/x
pnpm --filter usage-analytics collect --limit 5        # cap repos cloned this run
```

`--local` parses an already-checked-out directory with no GitHub access — useful
for testing and offline runs.

## Data model

`src/data/types.ts` is the single source of truth, shared by collector and SPA:
`Snapshot` (per-package + per-repo usage with `fileCount` / `repoCount` /
`refCount`), `UsageIndex` (weekly roll-up), `Checkpoint` (resume state).

## Accuracy caveats

- Discovers **direct** dependents (declared in `package.json`); transitive-only
  usage is not counted.
- Token usage is counted at **group granularity**; dynamic member access and CSS
  `var(--token)` usage are not captured.
- The symbol allow-list reflects the current workspace version (stored as
  `manifestVersion` in each snapshot); older downstream versions may differ.
- `repoCount` (adoption breadth) and `refCount`/`fileCount` (depth) are both
  reported so a single monorepo doesn't distort the adoption story.
- Legacy packages have no symbol allow-list (no local source to build one from),
  so unlike hearth packages any imported name is counted at face value — a typo'd
  or shadowed import of the same package name would still register.
- Prop usage tracks **prop names only**, never literal values — we record that
  `variant` was passed, not that it was passed `"primary"`. It's scoped to
  `component-lib` packages (`hearth-react`, `hearth-react-native`); tokens and
  icons have no prop concept. `{...spread}` props carry no static name and are
  not counted, so heavily-spread call sites will under-report. `props` is an
  optional field on `SymbolUsage`/`RepoSymbolUsage` — snapshots collected before
  this was added simply have no `props` key, and the dashboard treats that the
  same as "no prop data yet" rather than an error.
