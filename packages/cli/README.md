# @utilitywarehouse/hearth-cli

Looks up Hearth design tokens from the versions installed in your project. The CLI holds no data: it reads
`hearth-manifest.json` from the `@utilitywarehouse/hearth-tokens` in your `node_modules`, so upgrading the package
changes the answers without a CLI release.

```sh
npx @utilitywarehouse/hearth-cli tokens search brand
npx @utilitywarehouse/hearth-cli tokens list --layer primitive --type number
npx @utilitywarehouse/hearth-cli tokens get semantic.background.brand --platform native --json
```

## Commands

- `hearth tokens search <query>` lists tokens whose path or description contains the query.
- `hearth tokens list` lists every token in a layer, optionally of one `--type`.
- `hearth tokens get <path>` shows one token, with its alias and each surface's path. A path that has a token per device, or that is the prefix of a group (`semantic.shadow.md`), shows every token in the group.

| Option                                   | Default    | Effect                                                                                     |
| ---------------------------------------- | ---------- | ------------------------------------------------------------------------------------------ |
| `--layer semantic\|primitive\|component` | `semantic` | Which layer `search` and `list` look in.                                                   |
| `--type <type>`                          | any        | Only tokens of this type, as the manifest records it (`color`, `number`, `string`).        |
| `--platform web\|native`                 | `web`      | `web` shows the CSS variable and browser path. `native` shows the JS path and dark values. |
| `--limit <n>`                            | `20`       | Maximum paths for `search` and `list`.                                                     |
| `--json`                                 | off        | Machine-readable output that includes the version of the tokens package it read.           |

Dark values exist only on the JS surface, so they appear only with `--platform native`.

### What a token shows

- **Value**: on `web` this is what the stylesheet declares (`8px`, `0.5`); on `native` it is the JS value (`8`, `50`) with its dark value where there is one.
- **Alias**: the token it points at, shown next to the value (`alias  space.100`).
- **Devices**: a token whose value depends on the device has one token per `mobile`, `tablet` and `desktop`. Human output shows them in one block (`mobile 8px, tablet 12px, desktop 16px`) and JSON lists one token per device, each with a `device` field. `--limit` and `total` count paths, not devices.
- **Composites**: shadows and typography styles are one token per part (`semantic.shadow.md.x`, `semantic.typography.heading.lg.font-size`). `tokens get semantic.shadow.md` shows all of a shadow's parts.
- **JS-only tokens**: tokens with no CSS variable or browser export (native-only components, layout grids, font families) are hidden on `web`, and shown with `--platform native`.

### `--json`

`search` and `list` print `{ package, platform, layer, type?, total, tokens }`. `get` prints `{ package, platform, token }` for one token, or `{ package, platform, path, tokens }` for a group. `package` is the name and version of the tokens package that was read.

## Exit codes

| Code | Meaning                                                                    |
| ---- | -------------------------------------------------------------------------- |
| 0    | Success                                                                    |
| 1    | No match (the output suggests close paths for `get`)                       |
| 2    | Usage error: unknown command or option, or an invalid option value         |
| 3    | The tokens package is not installed, or its manifest is invalid or too new |
