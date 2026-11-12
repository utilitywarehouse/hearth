# @utilitywarehouse/hearth-cli

Looks up Hearth design tokens, icons and SVG and JSON assets from the versions installed in your project. Use it to
check that a token, icon or asset exists, and to get the import or CSS variable for it, instead of guessing a name.

The CLI holds no data. It reads `hearth-manifest.json` from the Hearth packages in your `node_modules`, so upgrading a
package changes the answers without a CLI release. See [How the data stays current](#how-the-data-stays-current).

Output is plain text, or JSON with `--json` for scripts and agents. The CLI only reads: it never writes files or calls
the network.

## Install

Run it without installing:

```sh
npx @utilitywarehouse/hearth-cli tokens search brand
```

Or add it to a project, which gives you the `hearth` command through `npx hearth`, `pnpm exec hearth` or your package
scripts:

```sh
npm install --save-dev @utilitywarehouse/hearth-cli
```

The bundle targets Node 18. The rest of this page writes `hearth`; use whichever form you installed.

The CLI answers from the Hearth packages **installed in the directory you run it in** (or a parent, as Node resolves
packages), so install the ones you want to look up:

| Command          | Needs installed                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `hearth tokens`  | `@utilitywarehouse/hearth-tokens`                                                                                                                |
| `hearth icons`   | any one of `@utilitywarehouse/hearth-react-icons`, `@utilitywarehouse/hearth-react-native-icons`, `@utilitywarehouse/hearth-svg-icons` (checked in that order) |
| `hearth assets svg`  | `@utilitywarehouse/hearth-svg-assets`                                                                                                        |
| `hearth assets json` | `@utilitywarehouse/hearth-json-assets`                                                                                                       |

## Quick start

```sh
hearth tokens search brand                       # find a token
hearth tokens get semantic.background.brand      # how to use it on web
hearth icons search bill                         # find an icon
hearth icons get AddSmallIcon                    # its component and an import line
hearth assets svg list --category logo           # list SVG logos
hearth assets svg get LogoFullPurple --print     # print the SVG itself
hearth tokens get semantic.background.brand --platform native --json
```

A lookup prints the version of the package it read, then the results:

```console
$ hearth tokens get semantic.background.brand
@utilitywarehouse/hearth-tokens 0.5.1

semantic.background.brand  (color)
  value   #7a42c8
  alias   color.purple.700
  css     --h-background-brand
  browser semantic.background.brand from '@utilitywarehouse/hearth-tokens/browser'
```

`hearth --help` prints every command and `hearth --version` prints the CLI version.

## Commands

Every group has `search`, `list` and `get`:

- `search <query>` lists entries that contain the query, ignoring case.
- `list` lists every entry, optionally narrowed by an option.
- `get <name>` shows one entry by its exact name, and suggests close names when there is none.

`search` and `list` print at most `--limit` entries (20 by default) and say how many matched in total, for example
`Showing 20 of 498. Narrow the query or raise --limit.`. `--limit 0` is allowed and prints none. Options that
narrow or limit results are errors on `get`, and an option a command does not take is a usage error.

### `hearth tokens`

```text
hearth tokens search <query> [--type <type>] [--layer semantic|primitive|component] [--platform web|native] [--limit <n>] [--json]
hearth tokens list [--type <type>] [--layer semantic|primitive|component] [--platform web|native] [--limit <n>] [--json]
hearth tokens get <path> [--platform web|native] [--json]
```

| Option                                   | Default    | Effect                                                                                             |
| ---------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------- |
| `--layer semantic\|primitive\|component` | `semantic` | Which layer `search` and `list` look in. Prefer `semantic` tokens.                                 |
| `--type <type>`                          | any        | Only tokens of this type, exactly as the manifest records it (`color`, `number`, `string`).        |
| `--platform web\|native`                 | `web`      | `web` shows the CSS variable and browser path. `native` shows the JS path and dark values.         |
| `--limit <n>`                            | `20`       | Maximum paths for `search` and `list`.                                                             |
| `--json`                                 | off        | Machine-readable output that includes the version of the tokens package it read.                   |

`search` matches a token's path or description. `--layer`, `--type` and `--limit` are not accepted by `get`.

What a token shows:

- **Value**: on `web` this is what the stylesheet declares (`8px`, `0.5`). On `native` it is the JS value (`8`, `50`),
  with its dark value where there is one. Dark values exist only on the JS surface, so they appear only with
  `--platform native`.
- **Alias**: the token it points at, shown next to the value (`alias  space.100`).
- **Surfaces**: `css` is the CSS custom property, `browser` is the named export of `@utilitywarehouse/hearth-tokens/browser`
  (it returns `var(--h-…)`, so the CSS must be loaded) and `js` is the raw value export used by React Native.
- **Devices**: a token whose value depends on the device has one token per `mobile`, `tablet` and `desktop`. Text
  output shows them in one block (`mobile 4px, tablet 6px, desktop 6px`) and JSON lists one token per device, each with a
  `device` field. `--limit` and `total` count paths, not devices.
- **Composites**: shadows and typography styles are one token per part (`semantic.shadow.md.x`,
  `semantic.typography.heading.lg.font-size`). `tokens get semantic.shadow.md` shows every part of the shadow.
- **JS-only tokens**: tokens with no CSS variable or browser export (native-only components, layout grids, font
  families) are hidden on `web` and shown with `--platform native`.

### `hearth icons`

```text
hearth icons search <query> [--size small|medium|large] [--limit <n>] [--json]
hearth icons list [--size small|medium|large] [--limit <n>] [--json]
hearth icons get <name> [--json]
```

| Option                          | Default | Effect                                                                |
| ------------------------------- | ------- | --------------------------------------------------------------------- |
| `--size small\|medium\|large`   | any     | Only icons of this size.                                              |
| `--limit <n>`                   | `20`    | Maximum icons for `search` and `list`.                                |
| `--json`                        | off     | Machine-readable output.                                              |

`search` matches an icon's name, component or SVG file name. `--size` and `--limit` are not accepted by `get`.

All three icon packages list the same icons. The package that is installed decides the `usage` you get back: an
import from `hearth-react-icons`, `hearth-react-native-icons` or the `hearth-svg-icons` file. `get` fills the
manifest's example in for that icon:

```console
$ hearth icons get AddSmallIcon
@utilitywarehouse/hearth-react-icons 0.10.1

AddSmallIcon  (small)
  component AddSmallIcon
  svg       add-small-icon.svg
  usage     import { AddSmallIcon } from '@utilitywarehouse/hearth-react-icons';
```

### `hearth assets svg` and `hearth assets json`

```text
hearth assets svg search <query> [--category logo|mascot|spot|scene|technical|other] [--limit <n>] [--json]
hearth assets svg list [--category logo|mascot|spot|scene|technical|other] [--limit <n>] [--json]
hearth assets svg get <name> [--print] [--json]
hearth assets json search <query> [--category spot|logo|other] [--limit <n>] [--json]
hearth assets json list [--category spot|logo|other] [--limit <n>] [--json]
hearth assets json get <name> [--print] [--json]
```

`svg` reads `@utilitywarehouse/hearth-svg-assets` and `json` reads `@utilitywarehouse/hearth-json-assets` (animated
assets). The two take the same options, but each accepts its own categories.

| Option                | Default | Effect                                                                                    |
| --------------------- | ------- | ----------------------------------------------------------------------------------------- |
| `--category <name>`   | any     | Only assets in this category, from the lists above.                                       |
| `--limit <n>`         | `20`    | Maximum assets for `search` and `list`.                                                   |
| `--print`             | off     | `get` only. Prints the asset's file contents instead of its details.                      |
| `--json`              | off     | Machine-readable output. Cannot be combined with `--print`.                               |

`search` matches an asset's name, file or import. `--category` and `--limit` are not accepted by `get`.

`get` shows the file path inside the package and the import to use. `--print` writes the file from the installed
package to stdout and nothing else, so it can be redirected:

```sh
hearth assets svg get LogoFullPurple --print > logo.svg
```

`--print` refuses a file over 100 KiB (exit `1`, naming the file to read instead) and a file that is missing from the
installed package, is not a regular file or lists a path outside the package (exit `3`).

## Exit codes

The same for every command.

| Code | Meaning                                                                                                                                         |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `0`  | Success                                                                                                                                         |
| `1`  | No match: a `search` or `list` with no results, a `get` for a name that does not exist (the message suggests close names), or a `--print` that is too large |
| `2`  | Usage error: unknown command or option, a missing argument, an invalid option value, or an option the command does not take. The usage is printed to stderr |
| `3`  | The package is not installed, or its manifest is missing, invalid, from a newer schema or of a type this CLI does not know                       |

Results go to stdout and messages to stderr. For lookups with `--json` (without `--help` or `--version`), stdout is a
JSON document for every exit `0`, and for a `search` or `list` that exits `1`. A `get` that exits `1`, and every `2` and
`3`, print plain text to stderr and nothing to stdout, so check the exit code before parsing.

## `--json`

Output is pretty-printed JSON. Every document starts with `package`, the name and version of the package that was
read, so you can tell which installed version an answer came from:

```ts
type PackageInfo = { name: string; version: string };
```

A `search` or `list` with no results still prints its document, with `total: 0` and an empty array, and exits `1`.
Optional keys are left out when they have no value. The shapes below are checked against the built binary by the
CLI's tests (`src/__tests__/json-contract.ts`), so a change to them is a deliberate decision.

### `hearth tokens search` and `hearth tokens list`

```ts
{
  package: PackageInfo;
  platform: 'web' | 'native';
  layer: 'primitive' | 'semantic' | 'component';
  type?: string; // only when --type was given
  total: number; // paths that matched, which may be more than `tokens` shows
  tokens: Array<Token>;
}
```

### `hearth tokens get`

A path that is exactly one token:

```ts
{ package: PackageInfo; platform: 'web' | 'native'; token: Token }
```

A path with a token per device, or the prefix of a group such as `semantic.shadow.md`:

```ts
{ package: PackageInfo; platform: 'web' | 'native'; path: string; tokens: Array<Token> }
```

### `Token`

```ts
{
  path: string;
  device?: 'mobile' | 'tablet' | 'desktop'; // only for a token whose value depends on the device
  layer: 'primitive' | 'semantic' | 'component';
  type: string;
  description?: string;
  values: { default: string | number; dark?: string | number };
  alias?: { default: string; dark?: string };
  // platform "web"
  css?: { variable: string };
  browser?: { import: string; path: string };
  // platform "native"
  js?: { import: string; path: string; darkPath?: string };
}
```

`web` tokens carry `css` and `browser` (where the token has them) and never `js`. `native` tokens always carry `js` and
never `css` or `browser`, and are the only ones with `dark` values. A `web` `values.default` is what the stylesheet
declares (`"8px"`); on `native` it is the JS value (`8`).

```json
{"package":{"name":"@utilitywarehouse/hearth-tokens","version":"0.5.1"},"platform":"web","token":{"path":"semantic.background.brand","layer":"semantic","type":"color","values":{"default":"#7a42c8"},"alias":{"default":"color.purple.700"},"css":{"variable":"--h-background-brand"},"browser":{"import":"@utilitywarehouse/hearth-tokens/browser","path":"semantic.background.brand"}}}
```

### `hearth icons search` and `hearth icons list`

```ts
{
  package: PackageInfo;
  platform: 'svg' | 'react' | 'react-native'; // which icon package was read
  size?: 'small' | 'medium' | 'large'; // only when --size was given
  total: number;
  usage: { import: string; example: string }; // example has <component> and <svg> placeholders
  icons: Array<Icon>;
}
```

### `hearth icons get`

```ts
{
  package: PackageInfo;
  platform: 'svg' | 'react' | 'react-native';
  icon: Icon;
  usage: { import: string; example: string }; // placeholders filled in for this icon
}
```

```ts
type Icon = { name: string; size: 'small' | 'medium' | 'large'; svg: string; component: string };
```

```json
{"package":{"name":"@utilitywarehouse/hearth-react-icons","version":"0.10.1"},"platform":"react","icon":{"name":"AddSmallIcon","size":"small","svg":"add-small-icon.svg","component":"AddSmallIcon"},"usage":{"import":"@utilitywarehouse/hearth-react-icons","example":"import { AddSmallIcon } from '@utilitywarehouse/hearth-react-icons';"}}
```

### `hearth assets svg|json search` and `list`

```ts
{
  package: PackageInfo;
  kind: 'svg' | 'json';
  category?: string; // only when --category was given
  total: number;
  assets: Array<SvgAsset | JsonAsset>;
}
```

### `hearth assets svg|json get`

```ts
{ package: PackageInfo; kind: 'svg' | 'json'; asset: SvgAsset | JsonAsset }
```

```ts
type SvgAsset = {
  name: string;
  category: 'logo' | 'mascot' | 'spot' | 'scene' | 'technical' | 'other';
  file: string; // path inside the package, for example "lib/logo-full-purple.svg"
  import: string;
};

type JsonAsset = {
  name: string;
  category: 'spot' | 'logo' | 'other';
  type: 'animated';
  file: string;
  import: string;
};
```

```json
{"package":{"name":"@utilitywarehouse/hearth-svg-assets","version":"0.6.8"},"kind":"svg","asset":{"name":"LogoFullPurple","category":"logo","file":"lib/logo-full-purple.svg","import":"@utilitywarehouse/hearth-svg-assets/lib/logo-full-purple.svg"}}
```

## How the data stays current

Each Hearth package that the CLI covers ships a `hearth-manifest.json` in its npm tarball, written by the package's own
build. The CLI finds that file in the `node_modules` of the directory you run it in and answers from it. Nothing is
cached or bundled, so:

- Upgrading `@utilitywarehouse/hearth-tokens` (or an icon or asset package) changes the answers straight away.
- The version in the first line of the output, and `package.version` in `--json`, is the version that answered.
- A project that has not installed a package gets no answers for it, not answers from some other version.

The manifest has a `schemaVersion`, which is `2` for this CLI. When a package cannot be used the CLI exits `3` and
says what to do, without a stack trace:

| Situation                                                  | Message says                                                                             |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| The package is not installed                               | Install it, with the `npm install` command for that package.                             |
| No icons package is installed                              | Install one of the three icon packages.                                                  |
| The package is installed but is too old to ship a manifest | Update it: `npm install <package>@latest`.                                               |
| The manifest has a `schemaVersion` newer than the CLI's    | The manifest is newer than this CLI supports. Update `@utilitywarehouse/hearth-cli`.     |
| The manifest has a `type` the CLI does not know            | The package ships a type this CLI does not know. Update `@utilitywarehouse/hearth-cli`.  |
| The manifest is not valid JSON, fails the schema, or is the wrong type for the package | The manifest is invalid, with each problem listed.             |

For icons, the first of `hearth-react-icons`, `hearth-react-native-icons` and `hearth-svg-icons` that is installed is
used. If that one is installed but unusable (no manifest, invalid, too new) the CLI reports it rather than moving on to
the next, so a broken install is not hidden.

### For package authors

The manifest format, its types and the rules for changing it are in the
[`@utilitywarehouse/hearth-manifest` README](https://github.com/utilitywarehouse/hearth/blob/main/packages/manifest/README.md).
That package is private to the Hearth monorepo.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to add a command or a package.
