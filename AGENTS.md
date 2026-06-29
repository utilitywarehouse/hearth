# Hearth

Hearth is the Utility Warehouse Design Systems monorepo. It publishes component
libraries for React and React Native, design tokens, icon sets, SVG/JSON assets,
and supporting tooling.

---

## Monorepo layout

| Path | Purpose |
|------|---------|
| `packages/react` | `@utilitywarehouse/hearth-react` — React component library |
| `packages/react-native` | `@utilitywarehouse/hearth-react-native` — React Native component library |
| `packages/tokens` | `@utilitywarehouse/hearth-tokens` — design tokens (CSS/JS/browser) |
| `packages/fonts` | `@utilitywarehouse/hearth-fonts` — font assets |
| `packages/css-reset` | `@utilitywarehouse/hearth-css-reset` — CSS reset |
| `packages/react-icons` | `@utilitywarehouse/hearth-react-icons` — generated React icon components |
| `packages/react-native-icons` | `@utilitywarehouse/hearth-react-native-icons` — generated RN icon components |
| `packages/svg-icons` | `@utilitywarehouse/hearth-svg-icons` — SVG source icons (source of truth) |
| `packages/svg-assets` | `@utilitywarehouse/hearth-svg-assets` — SVG illustration assets |
| `packages/json-assets` | `@utilitywarehouse/hearth-json-assets` — JSON (animated) assets |
| `packages/storybook-utils` | Internal Storybook utilities |
| `apps/storybook-docs` | Central Storybook documentation site |
| `apps/storybook-rn-expo` | React Native Storybook (Expo) |
| `apps/playground-expo` | Expo playground app |
| `apps/figma-variables-plugin` | Figma plugin for design token management |

---

## Setup

```sh
nvm use          # set correct Node version
npm run setup    # corepack enable + pnpm install
```

---

## Key commands

```sh
pnpm dev:react           # React Storybook + watch build
pnpm dev:react-native    # React Native Storybook
pnpm build               # Build all packages (via Turbo)
pnpm checks              # Run all quality checks
pnpm changeset           # Create a changeset file — include in your PR
pnpm generate:llm-docs   # Regenerate LLM docs for hearth-react
```

For a full list of commands see `package.json` scripts.

**After making changes:**
- Always run `pnpm checks` to verify linting and formatting pass.
- When you change a public component API (props or JSDoc) in `packages/react`, run `pnpm generate:llm-docs`.

---

## Skills

Skills live in `.agents/skills/` (symlinked to `.claude/skills/`). Invoke them with `/skill-name`.

| Skill | When to use |
|-------|-------------|
| `react-component-addition` | Adding a new component to `packages/react` — file structure, props, stories, docs, exports |
| `react-native-component-addition` | Adding a new component to `packages/react-native` |
| `react-native-component-docs` | Creating or updating `.docs.mdx` files for React Native components |
| `add-changeset` | Writing a changeset — version bumps, changelog entries, release notes |

The `hearth-react` skill (`packages/react/SKILL.md`) covers building UI with the
Hearth React component library from the **consumer** side. It activates implicitly
for any UI work in an app that has `@utilitywarehouse/hearth-react` installed.

---

## Working with components

**Always verify the component API before touching component code — never assume a prop exists.**

For both React and React Native components, the source of truth is the co-located files alongside the component:
- `<Component>.props.ts` — prop definitions and types
- `<Component>.docs.mdx` — usage docs and examples

**Rules that apply everywhere:**
- A story name may not match the prop name — check the source files, not just the story title.
- Only touch the files the task requires — don't improve adjacent components, stories, or utilities unless explicitly asked.

---

## Design tokens

`hearth-tokens` is **not** a runtime dependency of `hearth-react` or `hearth-react-native` — tokens are copied into each package at build time via the `generate:tokens:*` scripts. If you change tokens, run the relevant generate script before building.

For usage guidance:
- **React** — see the `react-component-addition` skill.
- **React Native** — see the `react-native-component-addition` skill.

---

## Releases

Hearth uses [Changesets](https://github.com/changesets/changesets). Run `pnpm changeset`, commit the generated file with your changes, and a release PR is created automatically on merge to `main`. Use the `add-changeset` skill for guidance.
