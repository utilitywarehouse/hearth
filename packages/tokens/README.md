# @utilitywarehouse/hearth-tokens

Design tokens for Hearth, published as CSS, JS and browser modules.

## Pipeline

1. **Source**: token JSON lives in `raw/`.
2. **Manifest**: `generate:tokens` first builds `@utilitywarehouse/hearth-manifest`, then runs `scripts/generate-tokens.js`.
3. **Generation**: `scripts/generate-js-tokens.js` and `scripts/generate-browser-tokens.js` write TypeScript into `src/`. `scripts/generate-css-tokens.js` writes CSS straight into `css/`.
4. **Manifest output**: `hearth-manifest.json` is rewritten from the records the generators collect.
5. **Compilation**: `build:tokens` compiles the generated output into `js/`, `browser/` and the root `index.css`. Generation does not touch these.

```sh
pnpm generate:tokens   # generate src/, css/ and hearth-manifest.json
pnpm build:tokens      # compile js/, browser/ and index.css (also runs prettier)
pnpm lint:ci           # lint scripts/ (non-mutating)
pnpm typecheck
pnpm test
```

Consumers do not depend on this package at runtime. `hearth-react` and `hearth-react-native` vendor the tokens via their own scripts (see the root `CLAUDE.md`).

## Gotchas

- **`generate:tokens` writes unformatted `src/`.** `git status` then shows about 170 modified files until you run `prettier --write`. To check that published output is unchanged, run `pnpm build:tokens` first, then compare `js/`, `browser/`, `index.css` and `hearth-manifest.json`. Generation alone does not rebuild those.
- **Raw token `filePath`s contain "component"** (for example `hearth-components--tokens---*.json`). `filePath.includes('component')` therefore matches every file. `scripts/helpers/filters.js` still does this.
- **Style Dictionary filters see untransformed values.** Anything that reads final values, such as declared CSS values, must run in a format rather than a filter.
