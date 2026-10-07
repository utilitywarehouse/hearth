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

    pnpm copy:tokens                               # from packages/react
    pnpm --filter @utilitywarehouse/hearth-react copy:tokens  # from repo root

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
<Name>.figma.ts       # Figma Code Connect template (co-located, matches packages/react-native)
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
- **CSS**: PostCSS processes `src/styles/index.css` → `styles.css`; `breakpoints.css` is copied from `src/styles/breakpoints.css`.
- **Declarations**: `tsc -p tsconfig.build.json` (`emitDeclarationOnly`) runs alongside tsup.
- `tsconfig.build.json` excludes stories, docs, figma files, and scripts. Use `tsconfig.json` for IDE/dev; use `tsconfig.build.json` only for production output.

### Testing / Storybook

- Tests use `vitest` + `@storybook/addon-vitest` storybookTest plugin — stories run as browser tests against Chromium (headless) via Playwright.
- `fileParallelism: false` — tests run serially.
- Storybook uses `@storybook/react-vite` on port 6006.
- Accessibility: axe (`@storybook/addon-a11y`) runs on every story, non-blocking (`'todo'`) on PRs; it fails only in the weekly `a11y-weekly.yml` run (`VITE_A11Y_STRICT=true`). To opt out, add `data-a11y-ignore` to story scaffolding or set `parameters.a11y` — see [`scripts/a11y-report/README.md`](../../scripts/a11y-report/README.md).
- Stories pattern: `src/**/*.stories.tsx`.

### Interaction test coverage

`play`-function coverage per component, tracked under UWDS-4962, in priority order (interactive first). Use the `react-interaction-tests` skill. ✅ covered · ⏳ to do · N/A presentational, no prop-driven behaviour to test (reason given). Known component bugs found by these tests are logged in `component-bugs.md` at the repo root.

| Component | Sub-issue | Status | Notes |
|-----------|-----------|--------|-------|
| Accordion | UWDS-4957 | ✅ | Reference implementation |
| Tabs | UWDS-5018 | ✅ | Selection, indicator sync, overflow scroll buttons, controlled value |
| Select | UWDS-5010 | ✅ | Label wiring, default/selected value, disabled hides validation |
| Combobox | UWDS-4976 | ✅ | `items` rendering, `triggerOnlyOnType`, disabled hides validation |
| Menu | UWDS-4997 | ✅ | `asChild` links, `colorScheme`, close + focus return, `keepMounted`, deprecated `onSelect`/`forceMount` |
| Modal | UWDS-4998 | ✅ | Label/description wiring, close + focus return, `hideCloseButton`, `loading` and its fallbacks |
| Tooltip | UWDS-5024 | ✅ | Opens on focus with description linked to trigger, `heading`, `defaultOpen`/`open` |
| Toast | UWDS-5021 | ✅ | Dismiss button, `ToastActionButton`, stacked toasts, `ToastProvider` viewport props |
| DatePicker | UWDS-4980 | ✅ | Date format, week start, days/months/years view cycling and reset, disabled state |
| DateInput | UWDS-4979 | ✅ | Group label/description, invalid state, disabled, segment max lengths, `hide*` props, consumer `aria-describedby` |
| CardAccordion | UWDS-4971 | ✅ | Next/Previous/Edit step flow, summaries, focus on new step. `Playground` stays `!test` (reason unknown) |
| ExpandableCard | UWDS-4985 | ✅ | Heading/helper/badge/numeric value in trigger name, expand and collapse |
| Checkbox | UWDS-4972 | ✅ | Name/description, toggle via box and label, controlled, external `aria-labelledby`, invalid, group helper text |
| CheckboxGroup | UWDS-4973 | ✅ | Group label/description, `defaultValue`, value changes, validation, disabled group |
| CheckboxTile | UWDS-4974 | ✅ | Same as Checkbox; inner label now a `span` (no nested labels) |
| Radio | UWDS-5003 | ⏳ | |
| RadioGroup | UWDS-5005 | ⏳ | |
| RadioCard | UWDS-5004 | ⏳ | |
| RadioTile | UWDS-5006 | ⏳ | |
| Switch | UWDS-5016 | ⏳ | |
| SegmentedControl | UWDS-5009 | ⏳ | |
| ToggleButton | UWDS-5022 | ⏳ | |
| ToggleButtonCard | UWDS-5023 | ⏳ | |
| TextInput | UWDS-5020 | ⏳ | |
| TextArea | UWDS-5019 | ⏳ | |
| PasswordInput | UWDS-5000 | ⏳ | |
| SearchInput | UWDS-5007 | ⏳ | |
| CurrencyInput | UWDS-4978 | ⏳ | |
| VerificationInput | UWDS-5027 | ⏳ | |
| Button | UWDS-4969 | ⏳ | |
| IconButton | UWDS-4991 | ⏳ | |
| UnstyledIconButton | UWDS-5025 | ⏳ | |
| Link | UWDS-4995 | ⏳ | |
| InlineLink | UWDS-4993 | ⏳ | |
| Pagination | UWDS-4999 | ⏳ | |
| Breadcrumbs | UWDS-4968 | ⏳ | |
| Chip | UWDS-4975 | ⏳ | |
| Alert | UWDS-4963 | ⏳ | |
| HighlightBanner | UWDS-4990 | ⏳ | |
| Card | UWDS-4970 | ⏳ | |
| Table | UWDS-5017 | ⏳ | |
| Avatar | UWDS-4964 | ⏳ | Likely N/A |
| Badge | UWDS-4965 | ⏳ | Likely N/A |
| BodyText | UWDS-4966 | ⏳ | Likely N/A |
| Box | UWDS-4967 | ⏳ | Likely N/A |
| Container | UWDS-4977 | ⏳ | Likely N/A |
| DescriptionList | UWDS-4981 | ⏳ | Likely N/A |
| DetailText | UWDS-4982 | ⏳ | Likely N/A |
| Divider | UWDS-4983 | ⏳ | Likely N/A |
| Em | UWDS-4984 | ⏳ | Likely N/A |
| Flex | UWDS-4986 | ⏳ | Likely N/A |
| Grid | UWDS-4987 | ⏳ | Likely N/A |
| Heading | UWDS-4988 | ⏳ | Likely N/A |
| HelperText | UWDS-4989 | ⏳ | Likely N/A |
| IconContainer | UWDS-4992 | ⏳ | Likely N/A |
| Label | UWDS-4994 | ⏳ | Likely N/A |
| List | UWDS-4996 | ⏳ | Likely N/A |
| ProgressBar | UWDS-5001 | ⏳ | Likely N/A |
| ProgressStepper | UWDS-5002 | ⏳ | Likely N/A |
| SectionHeader | UWDS-5008 | ⏳ | Likely N/A |
| SkeletonBodyText | UWDS-5011 | ⏳ | Likely N/A |
| SkeletonBox | UWDS-5012 | ⏳ | Likely N/A |
| SkeletonHeading | UWDS-5013 | ⏳ | Likely N/A |
| Spinner | UWDS-5014 | ⏳ | Likely N/A |
| Strong | UWDS-5015 | ⏳ | Likely N/A |
| ValidationText | UWDS-5026 | ⏳ | Likely N/A |

### LLM docs

- `public/llms/` is **auto-generated** by `pnpm generate:llm-docs` from stories — **do not hand-edit**.
- Regenerate whenever a public component API (props or JSDoc) changes.
- The generated files are published with the package and consumed by the `hearth-react` MCP server and the `packages/react/SKILL.md` consumer skill.

### Figma Code Connect

- Code Connect files live at `src/components/<Name>/<Name>.figma.ts`, co-located with the component (same convention as `packages/react-native`).
- Config: `figma.config.json`.
- Publish: `pnpm figma:publish`.
- Use the `figma-code-connect` skill.
