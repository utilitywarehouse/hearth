# Contributing to the Hearth CLI

How the CLI is put together and how to extend it. The reasoning for the design is in
[ADR 0001](../../docs/adr/0001-cli-first-agent-docs-for-non-component-packages.md). What the CLI does for users is in the
[README](./README.md).

## How it works

- **No data in the CLI.** Every answer comes from a `hearth-manifest.json` that an indexed package ships. The manifest
  format and its validator live in the private [`@utilitywarehouse/hearth-manifest`](../manifest/README.md) package,
  which is bundled into the CLI at build time.
- **`src/resolve-manifest.ts`** finds a package's manifest from the user's working directory, validates it, and returns
  one of `ok`, `not-installed`, `no-manifest`, `invalid`, `unsupported-schema` or `unsupported-type`.
  `src/output.ts` turns each failure into the message users see. Commands exit `3` for all of them.
- **A command group** (`tokens`, `icons`, `assets`) is a module that exports a `CommandGroup` (`src/command-group.ts`):
  its name, usage text, accepted flags and a `run` function. `src/run.ts` merges the groups' flags, parses the command
  line and dispatches to the matching group. Exit codes are `EXIT` in `command-group.ts`.
- Each group splits **lookup** (`tokens.ts`, `icons.ts`, `assets.ts`: plain functions over a manifest, no I/O),
  **rendering** (`*-output.ts`) and **wiring** (`*-command.ts`: flags, resolving the manifest, exit codes).

## Run it

Build the manifest package first, because the CLI bundles it, then build and try the CLI from a project that has the
Hearth packages installed:

```sh
pnpm --filter @utilitywarehouse/hearth-manifest build
pnpm --filter @utilitywarehouse/hearth-cli build
cd path/to/a/project && node path/to/hearth/packages/cli/dist/cli.js tokens search brand
```

From `packages/cli`: `pnpm typecheck`, `pnpm lint:ci` and `pnpm test`.

## Add a command

A new top-level command is a module and one line.

1. Write `src/<name>-command.ts` exporting a `CommandGroup`. Take its `usage` lines, `options`, and a `run(args, values, io)`
   that returns an exit code, or `undefined` for a subcommand or arguments it does not know (which `run.ts` reports as
   an unknown command). Throw `UsageError` for a mistake in how it was called, and use `oneOf`, `parseLimit` and
   `stringFlag` for option values. Write to `io.stdout` and `io.stderr` only, so tests can capture it.
2. Add it to `GROUPS` in `src/run.ts`. The help text and the accepted flags follow from that.
3. Follow the existing groups for the shared behaviour: `search`, `list` and `get`; `--limit` with a `total`; `--json`
   output that starts with `package`; exit `1` for no match, `2` for usage, `3` when the package cannot be used.
4. Add its `--json` shapes to `src/__tests__/json-contract.ts` and its cases to `CASES` in
   `src/__tests__/integration.test.ts`, which runs the built binary against every contract. The contract is strict, so
   adding or dropping a key fails a test: that is the point.
5. Document it in the README: the synopsis, options, exit codes and the `--json` shape. Run each example against the
   built binary and paste what it prints.

### Add an asset kind

`hearth assets <kind>` kinds are entries in `ASSET_KINDS` in `src/asset-kinds.ts`: a name, the categories its manifest
allows (for `--category`) and a `resolve` for its package. The kind needs a manifest type in
`@utilitywarehouse/hearth-manifest` whose entries have `name`, `category`, `file` and `import`, and its entry type added
to `AssetEntry`. Everything else (`list`, `search`, `get`, `--print`) is shared.

## Add a package or extend a manifest

The CLI reads manifests; the packages write them. A package becomes lookup-able in three places.

1. **The package ships `hearth-manifest.json`.** Generate it in the package's build against the schema in
   `@utilitywarehouse/hearth-manifest` (see `packages/svg-assets` and `packages/json-assets`, which each have a
   `generate:manifest` script), and list `hearth-manifest.json` in the package's `files`. If the package has an
   `exports` map, expose `./hearth-manifest.json` so that `require.resolve` resolves it to the root manifest (for
   example, `"./hearth-manifest.json": "./hearth-manifest.json"`).
2. **The manifest package knows it.** A new kind of manifest is a new member of the `type` union in
   `packages/manifest/src/schema.ts`, and the package is added to `INDEXED_PACKAGES` in
   `packages/manifest/src/check/indexed-packages.ts`. `pnpm check:manifests` from the repo root then checks that the
   package ships a valid manifest of that type in its tarball.
3. **The CLI reads it.** Either a new command group or a new asset kind, as above.

When changing the schema, the manifest README's
[Changing the schema](../manifest/README.md#changing-the-schema) section is the rule: an optional field or a new
`type` keeps `schemaVersion`; anything that changes the meaning of an existing field, or makes a field required,
needs a new `schemaVersion` so an older CLI refuses the manifest instead of misreading it. The CLI compares against
`SCHEMA_VERSION` from that package. A schema change is worth a CLI release alongside it.

## Tests

- `src/__tests__/consumer-fixture.ts` builds a throwaway consumer project with fixture manifests installed. Use it for
  tests, not the real packages.
- `run.test.ts`, `icons-command.test.ts`, `assets-command.test.ts` and `assets-json-command.test.ts` run `run()`
  in-process against a fixture consumer.
- `integration.test.ts` runs the built binary. `build-binary.ts` builds it once for the suite. Every `--json` output is
  parsed against `json-contract.ts`.
- `tarball.test.ts` unpacks the real packages with `npm pack` so that a `files` entry that drops a manifest fails. It
  needs npm's cache, so it only runs when `HEARTH_CLI_TARBALLS` is set (CI sets it).

## Docs

Keep the README, the `--json` section and `json-contract.ts` in step: a change to one is a change to all three. The
docs-site page is `apps/storybook-docs/docs/CLI.docs.mdx`.
