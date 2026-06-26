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
```

For a full list of commands see `package.json` scripts.

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

## Working with React components

**Always check the component API before touching component code.**

- Local docs (once built): `public/llms/components/<Component>.md`
- Via MCP (if configured): `list-all-documentation`, `get-documentation`, `get-storybook-story-instructions`

**Critical rules:**
- Never assume a prop exists — always verify against the docs.
- A story name may not match the prop name — check the docs, not just the story title.

---

## Design tokens

`hearth-tokens` is **not** a runtime dependency of `hearth-react` — tokens are copied in at build time via `pnpm generate:tokens:react`.

- **CSS files** — use CSS custom properties: `var(--h-space-200)`
- **JS/TS/TSX files** — use browser tokens: `import { semantic } from '@utilitywarehouse/hearth-tokens/browser'`
- **Never** use raw values — always go through the token system.

---

## Releases

Hearth uses [Changesets](https://github.com/changesets/changesets). Run `pnpm changeset`, commit the generated file with your changes, and a release PR is created automatically on merge to `main`. Use the `add-changeset` skill for guidance.

---

## Figma integration

- **Code Connect** — `.figma.tsx` files map Figma components to code; run via `pnpm figma:connect`.
- **Figma MCP** — use the `figma-use` skill to push/pull designs.
