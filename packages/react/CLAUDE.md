# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This file covers `packages/react` — `@utilitywarehouse/hearth-react`, the React component library. See the [repo-root CLAUDE.md](../../CLAUDE.md) for monorepo-wide setup and commands.

## Commands

Run from this directory (`packages/react`), or via the root scripts shown for Turbo-filtered variants.

```sh
pnpm dev:js                 # tsup in watch mode — JS bundle rebuild on change
pnpm dev:css                # PostCSS in watch mode — CSS rebuild on change
pnpm dev:storybook          # Storybook on :6006 — primary dev loop for this package

pnpm build                  # build:css && build:js
pnpm build:js               # tsup bundle + tsc declarations
pnpm build:css              # PostCSS: src/styles/index.css → styles.css && copy src/styles/breakpoints.css → breakpoints.css

pnpm lint:js                # eslint src/**/*.ts* --max-warnings 0
pnpm lint:css               # stylelint src/**/*.css

pnpm test:storybook         # vitest run — stories as browser tests via Playwright/Chromium

pnpm generate:llm-docs      # regenerate public/llms/ from stories — run after any API change
pnpm figma:publish          # publish Figma Code Connect mappings
```

Run after changing `packages/tokens` to vendor tokens into this package:
```sh
pnpm --filter @utilitywarehouse/hearth-react copy:tokens
```

Root-level equivalents (from repo root):
```sh
pnpm dev:react              # turbo: JS + CSS watch + Storybook for this package
pnpm build                  # turbo: build all packages including this one
pnpm checks                 # run all quality checks across the monorepo
```

**After making changes to this package:**
- Always run `pnpm checks` from the repo root.
- When you change a public component API (props or JSDoc), run `pnpm generate:llm-docs`.

## Architecture

### Styling: plain CSS + PostCSS, not CSS-in-JS

All component styles are plain CSS, processed by a PostCSS pipeline:

```
postcss-import → postcss-nesting → postcss-breakpoints → postcss-custom-media → autoprefixer → cssnano
```

- Component CSS lives at `src/components/<Name>/<Name>.css` and is imported via `src/components/index.css` in cascade order.
- All component classes use the `h-` prefix, generated via `withGlobalPrefix(COMPONENT_NAME)` from `src/helpers/with-global-prefix.ts`. For example, `Button` uses `.h-Button`.
- Variant values are expressed as CSS custom properties (e.g. `var(--h-button-gap)`), defined per-component and resolved via CSS nesting (`&:where(...)`).
- CSS nesting syntax is used in source — PostCSS flattens it at build time.

### Token pipeline: tokens package → generated → CSS / JS

- `src/styles/tokens/` is **generated, not hand-edited** — it is populated by `pnpm --filter @utilitywarehouse/hearth-react copy:tokens` from `@utilitywarehouse/hearth-tokens` (see root CLAUDE.md: tokens are vendored, not a runtime dependency).
- Use **CSS tokens** (CSS custom properties in `.css` files) for styling; use **browser tokens** (`src/tokens/`) for JS/TS (e.g. `spaceTokens`, `breakpoints`).

### Component folder convention

Each user-facing component under `src/components/<Name>/` follows a fixed file set:

```
<Name>.tsx           # component implementation
<Name>.props.ts      # prop definitions (propDefs object + TypeScript types)
<Name>.css           # component styles
<Name>.stories.tsx   # Storybook stories
<Name>.docs.mdx      # Storybook docs page
<Name>.context.ts    # React context — compound components only
```

Figma Code Connect files live in the **package-level `figma/` directory** (not in `src/`):
```
figma/<Name>.figma.tsx
```

- There is **no `index.ts` per component folder** — components are exported directly from `src/index.ts`.
- **Base / internal components** (e.g. `ButtonBase`, `InputBase`) skip `.stories.tsx` and `.docs.mdx` — they are not documented in Storybook.
- **Compound components** (e.g. `Modal`) add sub-component files in the same directory (e.g. `ModalRoot.tsx`, `ModalContent.tsx`) and share state via a `.context.ts` file — check for one before assuming a component is standalone.
- All public exports go through `src/index.ts` — both the component and its prop type:
  ```ts
  export { Button } from './components/Button/Button';
  export type { ButtonProps } from './components/Button/Button.props';
  ```

See the `react-component-addition` skill for the full implementation recipe when adding a new component.

### PropDef + extractProps pattern

Style props follow a consistent pattern across all components:

- Props are defined as a `propDefs` object in `<Name>.props.ts` using `PropDef<T>` from `src/props/prop-def.ts`. Each entry maps a prop name to its allowed tokens, whether it is responsive, and its default.
- `extractProps(props, propDefs)` (from `src/helpers/extract-props.ts`) maps prop values to CSS classes / inline styles and **strips them from the spread** — always call it instead of spreading `props` directly into the element.
- `withGlobalPrefix(COMPONENT_NAME)` (from `src/helpers/with-global-prefix.ts`) generates the base class string for the component (e.g. `"h-Button"`).

See the `react-component-addition` skill for the full authoring rules: PropDef shape, JSDoc requirements on every prop, `interface` vs `type` guidance, and how to handle props from Base UI / Radix primitives.

### Build system

- **JS**: `tsup` bundles all `src/**/*.ts?(x)` (excluding figma, stories, docs, scripts) to CJS + ESM, adds a `"use client";\n` banner, and uses `tsconfig.build.json`.
- **CSS**: PostCSS processes `src/styles/index.css` → `styles.css` + `breakpoints.css`.
- **Declarations**: `tsc -p tsconfig.build.json` (`emitDeclarationOnly`) runs alongside tsup.
- `tsconfig.build.json` excludes stories, docs, figma files, and scripts. Use `tsconfig.json` for IDE/dev; use `tsconfig.build.json` only for production output.

### Testing / Storybook

- Tests use `vitest` + `@storybook/addon-vitest` storybookTest plugin — stories run as browser tests against Chromium (headless) via Playwright.
- `fileParallelism: false` — tests run serially.
- Storybook uses `@storybook/react-vite` on port 6006.
- Stories pattern: `src/**/*.stories.tsx`.

### LLM docs

- `public/llms/` is **auto-generated** by `pnpm generate:llm-docs` from stories — **do not hand-edit**.
- Regenerate whenever a public component API (props or JSDoc) changes.
- The generated files are published with the package and consumed by the `hearth-react` MCP server and the `packages/react/SKILL.md` consumer skill.

### Figma Code Connect

- Code Connect files live in `figma/<Name>.figma.tsx` at the package root, **not** inside `src/`.
- Config: `figma.config.json`.
- Publish: `pnpm figma:publish`.
- Use the `figma-code-connect` skill for guidance on authoring Code Connect files.
