# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This file covers `packages/react-native` — `@utilitywarehouse/hearth-react-native`, the React Native
component library. See the [repo-root CLAUDE.md](../../CLAUDE.md) for monorepo-wide setup and commands.

## Commands

Run from this directory (`packages/react-native`), or via the root scripts shown for Turbo-filtered variants.

```sh
pnpm dev                    # Storybook (React Native Web) on :6006 — primary dev loop for this package
pnpm dev:docs               # Storybook docs-only mode on :6002

pnpm build                  # tsc — compiles src/ to build/
pnpm watch                  # tsc --watch

pnpm test                   # vitest run --config vitest.unit.config.ts — unit tests (src/**/*.test.{ts,tsx})
pnpm test:storybook         # vitest run --project storybook — runs stories as browser tests via Playwright

pnpm lint                   # eslint .
pnpm lint:fix               # eslint --fix .

pnpm copyTokens             # vendors CSS tokens from packages/tokens into src/tokens — run after changing hearth-tokens
pnpm generateColours        # regenerates legacy colour token files

pnpm generate:llm-docs      # regenerate public/llms/ from stories — run after any API change

pnpm figma:create           # scaffold a Code Connect entry
pnpm figma:publish          # publish Code Connect mappings
```

Run a single unit test file: `pnpm test src/hooks/useFormFieldAccessibility.test.tsx`.

Root-level equivalents (from repo root):
```sh
pnpm dev:react-native                # turbo run @utilitywarehouse/hearth-react-native#dev
pnpm test:react-native               # unit tests + storybook tests for this package
pnpm build:react-native              # turbo run build:storybook, filtered to this package
```

## Architecture

### Styling: Unistyles, not StyleSheet-from-react-native

Every component is styled with `react-native-unistyles`'s `StyleSheet.create(theme => ({...}))`, re-exported
from `src/core`. Styles are defined as **variants** (e.g. `size`, `colorScheme`, `variant`, `disabled`) plus
`compoundVariants` for combinations that need distinct treatment, and applied at render time via
`styles.useVariants({...})`. See [`Button/ButtonRoot.tsx`](src/components/Button/ButtonRoot.tsx) for the
canonical example — colour/variant/state combinations are resolved entirely through compound variants rather
than conditional logic in the component body. `_web` blocks inside a style object hold web-only pseudo-class
styles (`_hover`, `_focus-visible`, `_active`) since Unistyles targets both native and `react-native-web`.

Unistyles is configured once in `src/core/index.ts` (`StyleSheet.configure({ breakpoints, themes, settings })`),
which is why components never configure themes themselves — they just consume `theme` inside `StyleSheet.create`.

### Token pipeline: tokens package → legacy + generated → theme

- `src/tokens/` is **generated, not hand-edited** ("Do not edit directly" — see file headers). It's populated
  by `pnpm copyTokens` from `@utilitywarehouse/hearth-tokens` (see root CLAUDE.md: tokens are vendored, not a
  runtime dependency).
- `src/legacyTokens/` holds older colour tokens (`colors`, `colorsCommon`, `colorsDark`) still consumed by
  `src/core/themes.ts` alongside the generated tokens — check both when tracing a colour value.
- `src/core/themes.ts` assembles the final `light`/`dark` theme objects consumed via `theme.*` inside
  components, merging `tokens/*` (space, color, typography, shadow, border, `components.*` for
  per-component tokens) with responsive breakpoint-aware values (`base`/`md`/`lg` per breakpoint).
- Component-specific tokens live under `theme.components.<componentName>` (e.g. `theme.components.button.md.paddingVertical`)
  — check `src/tokens/components/{light,dark}` before hardcoding a dimension in a component.

### Component folder convention

Each component under `src/components/<Component>/` follows a fixed file set (see the
`react-native-component-addition` skill for full detail when adding a new one):

```
<Component>.tsx / <Component>Root.tsx / <Component>Xyz.tsx   # implementation, split by subcomponent
<Component>.props.ts    # public prop types
<Component>.context.ts  # React context for compound components (e.g. ButtonContext shares state with ButtonIcon/ButtonText)
<Component>.stories.tsx # Storybook stories
<Component>.docs.mdx    # Storybook docs page
<Component>.figma.tsx   # Figma Code Connect mapping (excluded from eslint and turbo build inputs)
index.ts                # public exports for the folder
```

Compound components (Button, Accordion, Card, etc.) share state via a `<Component>Context` rather than prop
drilling — check for a `.context.ts` file before assuming a subcomponent is standalone.

`src/index.ts` re-exports only `core`, `hooks`, and `components` — anything not re-exported there (e.g.
internal `utils/`) is not part of the public API.

### Storybook / testing split

There are two distinct test configs, and they check different things:
- `vitest.unit.config.ts` — plain unit tests (`src/**/*.test.ts(x)`), Node environment, e.g.
  [`useFormFieldAccessibility.test.tsx`](src/hooks/useFormFieldAccessibility.test.tsx).
- `vitest.config.js` — runs `*.stories.tsx` themselves as browser tests via `@storybook/addon-vitest` +
  Playwright/Chromium, driven by `.storybook/` config. This is how story-level interaction tests are verified,
  not a separate manual QA step.

Storybook itself targets `@storybook/react-native-web-vite`, so stories run against `react-native-web`, not a
native simulator — this is also why `_web`-scoped Unistyles blocks matter for how components look in Storybook.

### LLM docs

- `public/llms/` is **auto-generated** by `pnpm generate:llm-docs` from `.docs.mdx` stories — **do not hand-edit**.
- Regenerate whenever a public component API (props or JSDoc) changes.
- Unlike `packages/react`'s generator, this package's pipeline has no `<ArgTypes>`/prop-table branch (RN docs hand-write `## Props` tables directly) and drops decorative/interactive doc-only components (`UsageWrap`, `ViewFigmaButton`, `BackToTopButton`, `NextPrevPage`, etc.) rather than leaking their raw JSX — their content, where meaningful, is already duplicated as a hand-written code fence alongside them.

### Peer dependency surface

This package is built on and requires consumers to install `react-native-unistyles`, `react-native-svg`,
`react-native-reanimated` (+ `react-native-worklets`), `react-native-gesture-handler`,
`react-native-safe-area-context`, `@gorhom/bottom-sheet`, and `@utilitywarehouse/hearth-react-native-icons`
(see `docs/introduction.mdx` for consumer-side setup — Babel plugin, font linking, Jest mocks). When changing a
component's animation or gesture behaviour, assume these are the only native modules available; don't add a new
native dependency without checking the peerDependencies list in `package.json`.
