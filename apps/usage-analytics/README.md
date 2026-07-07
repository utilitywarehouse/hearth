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
- Prop usage tracks **prop names only**, never literal values — we record that
  `variant` was passed, not that it was passed `"primary"`. It's scoped to
  `component-lib` packages (`hearth-react`, `hearth-react-native`); tokens and
  icons have no prop concept. `{...spread}` props carry no static name and are
  not counted, so heavily-spread call sites will under-report. `props` is an
  optional field on `SymbolUsage`/`RepoSymbolUsage` — snapshots collected before
  this was added simply have no `props` key, and the dashboard treats that the
  same as "no prop data yet" rather than an error.
