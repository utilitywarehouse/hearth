# @utilitywarehouse/hearth-codemod

Codemods for migrating consumer code between major versions of Hearth
packages, so breaking changes can be applied deterministically instead of by
hand.

## Usage

```sh
npx @utilitywarehouse/hearth-codemod <codemod> <path...>
```

- `<codemod>` — the name of the transform, e.g. `react/v1/remove-modal-loading-text`
  or `react/v1/migration` to run every `v1` transform in one pass.
- `<path...>` — one or more files/directories to transform.

Flags:

| Flag | Description |
| --- | --- |
| `--dry` | Dry run — prints what would change without writing any files |
| `--print` | Print transformed output to stdout (useful during development) |
| `--force` | Bypass the git-clean check and run against a dirty working tree |

See `@utilitywarehouse/hearth-react`'s [`v1` migration docs](../react/docs/migration/v1.docs.mdx)
for the full list of available codemods and worked before/after examples.

## Available codemods

| Codemod | Description |
| --- | --- |
| `react/v1/remove-modal-loading-text` | Removes `Modal`'s deprecated `loadingText` prop |
| `react/v1/migration` | Runs every `react/v1/*` codemod in one pass |
