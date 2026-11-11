# @utilitywarehouse/hearth-manifest

The shared schema and validator for `hearth-manifest.json`, the file that Hearth packages ship so that tools can look up what they contain without parsing their source.

This package is private and is not published to npm. It is used while generating and testing the manifests inside this monorepo.

## Why it exists

Agents and tools need to answer questions like "which colour token should I use for a brand background?" or "does an icon called `bill` exist?". Rather than scraping built files or keeping a separate hand-written reference, each indexed package describes itself in a `hearth-manifest.json` that ships in its npm tarball. The planned Hearth CLI (`@utilitywarehouse/hearth-cli`) will read those files from the consumer's installed `node_modules`, so it always reports what is actually installed.

See [ADR 0001](../../docs/adr/0001-cli-first-agent-docs-for-non-component-packages.md) for the reasoning.

This package owns the one definition of what a manifest looks like. Packages generate their manifest against it, and the CLI reads it back against it.

## What a manifest looks like

Every manifest has a header and a list of entries:

```json
{
  "schemaVersion": 2,
  "package": { "name": "@utilitywarehouse/hearth-tokens", "version": "1.2.3" },
  "type": "tokens",
  "entries": [
    {
      "path": "semantic.background.brand",
      "layer": "semantic",
      "type": "color",
      "values": { "default": "#7a42c8", "dark": "#442484" },
      "alias": { "default": "color.purple.700", "dark": "color.purple.900" },
      "surfaces": {
        "css": { "variable": "--h-background-brand" },
        "browser": {
          "import": "@utilitywarehouse/hearth-tokens/browser",
          "path": "semantic.background.brand"
        },
        "js": {
          "import": "@utilitywarehouse/hearth-tokens",
          "path": "semanticLight.background.brand",
          "darkPath": "semanticDark.background.brand"
        }
      }
    }
  ]
}
```

| Field           | Meaning                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------- |
| `schemaVersion` | Version of this schema. Currently `2`. Readers can use it to reject manifests they can't read. |
| `package`       | Name and version of the package that produced the manifest.                                    |
| `type`          | What kind of manifest this is: `tokens`, `icons`, `svg-assets` or `json-assets`. See below.    |
| `entries`       | One entry per thing the package offers.                                                        |

### Manifest types

`validateManifest` is the single entry point for every type. The schema is a union discriminated on `type`, so each type has its own fields beyond the header:

| `type`        | Shipped by                                                            | Beyond the header                                 |
| ------------- | --------------------------------------------------------------------- | ------------------------------------------------- |
| `tokens`      | `hearth-tokens`                                                       | `entries` of token entries (below)                |
| `json-assets` | `hearth-json-assets`                                                  | `entries` of JSON asset entries                   |
| `svg-assets`  | `hearth-svg-assets`                                                   | `entries` of SVG asset entries                    |
| `icons`       | `hearth-svg-icons`, `hearth-react-icons`, `hearth-react-native-icons` | `usage` for the package's platform, and `entries` |

An unknown `type` fails validation with a message naming it, so a reader never misreads a manifest it does not understand.

### Icon entries

The same entries ship in all three icon packages. Only `package` and `usage` differ, so a project with just one icon package installed can still look icons up.

| Field       | Meaning                                                                             |
| ----------- | ----------------------------------------------------------------------------------- |
| `name`      | Unique icon name, for example `AddSmallIcon`.                                       |
| `size`      | `small`, `medium` or `large`.                                                       |
| `svg`       | The file in `@utilitywarehouse/hearth-svg-icons`, for example `add-small-icon.svg`. |
| `component` | The component exported by the React and React Native icon packages.                 |

The manifest-level `usage` (`platform`: `svg`, `react` or `react-native`, `import`, and an `example` with `<svg>`/`<component>` placeholders) says how to use an icon from the package that shipped the manifest. It lives on the manifest, not on each entry, because it is the same for every icon in a package.

### SVG asset entries

| Field      | Meaning                                                                                               |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| `name`     | Unique asset name, for example `LogoFullPurple`.                                                      |
| `category` | `logo`, `mascot`, `spot`, `scene`, `technical`, or `other` for assets that fit none of those.         |
| `file`     | The file path within the package, for example `lib/logo-full-purple.svg`.                             |
| `import`   | What to import to use it, for example `@utilitywarehouse/hearth-svg-assets/lib/logo-full-purple.svg`. |

Entries have no width or height. Both are in the SVG file, so recording them would duplicate it and need a check to keep it honest. If a consumer needs them, add them as optional fields; that does not change `schemaVersion`.

### JSON asset entries

| Field      | Meaning                                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| `name`     | Unique asset name, for example `AnimatedSpotAccountDark`.                                                         |
| `category` | `spot`, `logo` (the `uw` logos and monos) or `other`.                                                             |
| `type`     | What the asset is. Only `animated` exists so far.                                                                 |
| `file`     | The file path within the package, for example `lib/animated-spot-account-dark.json`.                              |
| `import`   | What to import to use it, for example `@utilitywarehouse/hearth-json-assets/lib/animated-spot-account-dark.json`. |

Entries have no file size. It is a property of the file that any tool can read, and it changes whenever the asset is re-exported, so recording it would churn the manifest and need a check to keep it honest. If a consumer needs it, add it as an optional field; that does not change `schemaVersion`.

### Token entries

| Field      | Meaning                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------ |
| `path`     | Unique name of the token within the manifest. Semantic tokens are prefixed `semantic.`.    |
| `layer`    | `primitive` (raw palette), `semantic` (purpose-based, the one to prefer) or `component`.   |
| `type`     | The kind of value, for example `color` or `number`.                                        |
| `device`   | `mobile`, `tablet` or `desktop`, for a token whose value depends on the device. See below. |
| `values`   | The resolved `default` value, plus `dark` where the token has one.                         |
| `alias`    | The token this one points at, where it points at another.                                  |
| `surfaces` | How to use the token from each place it is available. See below.                           |

Tokens are available through up to three surfaces, and the import paths differ between them:

- `css`: the CSS custom property, for example `--h-background-brand`, and `value`, what the stylesheet declares for it (`8px`, `0.5`). `values` holds the JS value (`8`, `50`), so use `css.value` when reporting a web value. Colours have no `value`: they are declared as references to other colour variables.
- `browser`: a JavaScript accessor that returns `var(--h-…)`, so it needs the CSS to be loaded.
- `js`: the raw values, used by React Native. This is the only surface with dark mode, which is why `darkPath` lives here.

### Device-dependent tokens

A token whose value differs by device has one entry per device, all with the same `path` and each with its own `device`, value, alias and surfaces (`--h-md-x-mobile`, `shadow.mobile.md.x`). Tokens that do not change by device (font weights, body and detail text) have a single entry with no `device`.

### Composite tokens

Shadows and typography styles are not single entries. Each part is its own entry (`semantic.shadow.md.x`, `semantic.typography.heading.lg.font-size`), so `values` is always a string or a number. Group the entries by path prefix to rebuild the style.

### Tokens without a CSS or browser surface

Some tokens exist only on the JS surface (React Native only components, layout grids, font families). Their entries have no `css` or `browser`. A token that shares its path with a group of tokens (a menu's `item.padding` and its per-device `item.padding.mobile`) is overwritten by the group in the browser export, so it has a `css` surface and no `browser` one.

## Usage

```ts
import { validateManifest } from '@utilitywarehouse/hearth-manifest';

const result = validateManifest(JSON.parse(json));

if (result.success) {
  result.manifest.entries; // typed as Manifest['entries']
} else {
  result.errors; // ['entries.3.surfaces.js: Required', …]
}
```

The package also exports:

- `manifestSchema`: the [zod](https://zod.dev) schema, if you want to compose with it.
- `manifestJsonSchema`: the same schema as JSON Schema, for tools that can't run zod. It can't express the cross-field rules below, so use `validateManifest` for the full check.
- `SCHEMA_VERSION`, `MANIFEST_TYPES`, and the `Manifest`, `TokensManifest`, `IconsManifest`, `TokenEntry`, `IconEntry` and `ValidationResult` types.

## Rules beyond the field types

`validateManifest` also enforces:

- Icon entries are unique by `name`.
- A token entry is unique by `path` and `device`: the same path can appear once per device. Version 1 required every `path` to be unique, so a v1 reader rejects a v2 manifest (and the CLI reports it as needing an update).
- A `values.dark` requires `surfaces.js.darkPath`, and `darkPath` requires a dark value, since dark mode exists on the JS surface only.

## Changing the schema

Adding an optional field is safe. Anything that changes the meaning of an existing field, or makes a field required, needs a new `schemaVersion` so that older CLIs refuse it rather than misreading it.

Adding a new manifest `type` is additive and keeps `schemaVersion`: add a member to the union in `manifestSchema`, then generate the manifest in the owning package. A CLI built before the type existed fails validation on the unknown `type`, so it refuses the manifest instead of misreading it. The current CLI reports that as needing an update.

### Releasing a schema change

This package is private, so a changeset cannot target it, and the CLI is what reads manifests back. A schema change is therefore worth treating as CLI-affecting: consider a CLI release alongside the change, so consumers on an older CLI are not left reading manifests they cannot parse. A changeset for the CLI, or for the package that starts shipping the new shape, is a good place to say so.

## Checking indexed packages

`INDEXED_PACKAGES` (`src/check/indexed-packages.ts`) lists the packages that ship a manifest and the `type` each ships. `pnpm check:manifests` from the repo root checks that every one of them:

- has a `hearth-manifest.json` that passes `validateManifest`, is the expected `type`, and names the package and its current `package.json` version
- lists the manifest in `files`, and exposes it through `exports` when it has them
- would publish the manifest in its tarball (`npm pack --dry-run`)

It also fails for a package that ships a manifest but is not in the list. A new indexed package needs an entry there. The release workflow runs it before publishing, after `changeset version` has bumped versions. The source-level checks also run with this package's tests. Whether a manifest's entries match the package's files stays with each package's own `hearth-manifest` test.

## Development

```sh
pnpm --filter @utilitywarehouse/hearth-manifest build
pnpm --filter @utilitywarehouse/hearth-manifest test
pnpm --filter @utilitywarehouse/hearth-manifest typecheck
pnpm check:manifests
```

`@utilitywarehouse/hearth-tokens` depends on the built output, so `generate:tokens` builds this package first.
