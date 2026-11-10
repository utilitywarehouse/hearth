# @utilitywarehouse/hearth-tokens

Design tokens for Hearth, published as CSS, JS and browser modules.

## Pipeline

1. **Source**: token JSON lives in `raw/`.
2. **Manifest**: `generate:tokens` first builds `@utilitywarehouse/hearth-manifest`, then runs `scripts/generate-tokens.js`.
3. **Generators**: `scripts/generate-js-tokens.js`, `scripts/generate-css-tokens.js` and `scripts/generate-browser-tokens.js` each run Style Dictionary. They write to `src/`, then `css/`, `js/` and `browser/` are built from it.
4. **Manifest output**: `hearth-manifest.json` is rewritten from the records the generators collect.

```sh
pnpm generate:tokens   # regenerate src/, css/, js/, browser/ and hearth-manifest.json
pnpm build:tokens      # build CSS, JS and browser outputs
pnpm lint:ci           # lint scripts/ (non-mutating)
pnpm typecheck
pnpm test
```

Consumers do not depend on this package at runtime. `hearth-react` and `hearth-react-native` vendor the tokens via their own scripts (see the root `CLAUDE.md`).

## Gotchas

- **`generate:tokens` writes unformatted `src/`.** `git status` then shows about 170 modified files until you run `prettier --write`. An empty diff on `css/`, `browser/` and `js/` confirms the generators are unchanged.
- **Raw token `filePath`s contain "component"** (for example `hearth-components--tokens---*.json`). `filePath.includes('component')` therefore matches every file. `scripts/helpers/filters.js` still does this.
- **Style Dictionary filters see untransformed values.** Anything that reads final values, such as declared CSS values, must run in a format rather than a filter.
