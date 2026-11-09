# @utilitywarehouse/hearth-cli

Looks up Hearth design tokens from the versions installed in your project. The CLI holds no data: it reads
`hearth-manifest.json` from the `@utilitywarehouse/hearth-tokens` in your `node_modules`, so upgrading the package
changes the answers without a CLI release.

```sh
npx @utilitywarehouse/hearth-cli tokens search brand
npx @utilitywarehouse/hearth-cli tokens get semantic.background.brand --platform native --json
```

## Commands

- `hearth tokens search <query>` lists tokens whose path or description contains the query.
- `hearth tokens get <path>` shows one token, with its alias and each surface's path.

| Option                                   | Default    | Effect                                                                                     |
| ---------------------------------------- | ---------- | ------------------------------------------------------------------------------------------ |
| `--layer semantic\|primitive\|component` | `semantic` | Which layer `search` looks in.                                                             |
| `--platform web\|native`                 | `web`      | `web` shows the CSS variable and browser path. `native` shows the JS path and dark values. |
| `--limit <n>`                            | `20`       | Maximum results for `search`.                                                              |
| `--json`                                 | off        | Machine-readable output that includes the version of the tokens package it read.           |

Dark values exist only on the JS surface, so they appear only with `--platform native`.

## Exit codes

| Code | Meaning                                                                    |
| ---- | -------------------------------------------------------------------------- |
| 0    | Success                                                                    |
| 1    | No match (the output suggests close paths for `get`)                       |
| 2    | Usage error: unknown command or option, or an invalid option value         |
| 3    | The tokens package is not installed, or its manifest is invalid or too new |
