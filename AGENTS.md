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
| `.agents/skills/` | AI skills (symlinked to `.claude/skills/`) |

---

## Prerequisites & setup

Requires `nvm` and `npm`.

```sh
nvm use                 # set correct Node version
npm run setup           # corepack enable + pnpm install
```

To fully reset dependencies and rebuild:

```sh
pnpm refresh
```

---

## Key commands

### Development

```sh
pnpm dev:react                   # React Storybook + watch build
pnpm dev:react-native            # React Native Storybook
pnpm dev:react-native:prebuild   # Rebuild native modules
pnpm dev:react-native:ios        # Run on iOS device/simulator
pnpm dev:react-native:android    # Run on Android device/emulator
```

### Build

```sh
pnpm build                  # Build all packages (via Turbo)
pnpm build:react            # React library only
pnpm build:react-native     # React Native library only
pnpm build:tokens           # Token generation pipeline
```

### Code quality

```sh
pnpm format           # Run Prettier across repo
pnpm lint:fix         # Run ESLint with auto-fix
pnpm checks           # Run all quality checks
pnpm checks:ci        # Run all quality checks in CI
```

### Asset generation

```sh
pnpm generate:icons           # SVG → React + RN icon components
pnpm generate:tokens:react    # Copy hearth-tokens into hearth-react build
pnpm generate:svg-assets      # Optimise SVG assets
pnpm generate:json-assets     # Generate JSON assets
```

### Releases

```sh
pnpm changeset    # Create a changeset file, include it in your PR
```

---

## Skills

Skills live in `.agents/skills/` (symlinked to `.claude/skills/`). Invoke them with `/skill-name` or reference them by name.

| Skill | When to use |
|-------|-------------|
| `react-component-addition` | Adding a new component to `packages/react` — file structure, props, stories, docs, exports |
| `react-native-component-addition` | Adding a new component to `packages/react-native` |
| `react-native-component-docs` | Creating or updating `.docs.mdx` files for React Native components |
| `add-changeset` | Writing a changeset — version bumps, changelog entries, release notes |

The `hearth-react` skill (`packages/react/SKILL.md`) covers building UI with the
Hearth React component library from the **consumer** side (apps using the
library). It activates implicitly for any UI work in an app that has
`@utilitywarehouse/hearth-react` installed.

---

## Working with React components

**Always use the `hearth-react` MCP tools or the local markdown docs before touching component code.**

Component API reference is available locally once built:

```sh
node -e "const path = require('path'); console.log(path.dirname(require.resolve('@utilitywarehouse/hearth-react/package.json')))"
# → <root>/node_modules/@utilitywarehouse/hearth-react
# Docs: <root>/public/llms/components/<Component>.md
```

Or via the `hearth-react` MCP server if configured:

- `list-all-documentation` — index of all components
- `get-documentation` — full props API and examples for a component
- `get-storybook-story-instructions` — current conventions for creating/updating stories

**Critical rules:**
- Never assume a prop exists. Always verify against the docs before using it.
- A story name may not match the prop name — check the docs, not just the story title.

---

## Design tokens

`hearth-tokens` is **not** a runtime dependency of `hearth-react`. Tokens are
copied into the React library at build time:

```sh
pnpm generate:tokens:react   # copies tokens into packages/react build output
```

In code:
- **CSS files** — use CSS custom properties: `var(--h-space-200)`
- **JS/TS/TSX files** — use browser tokens: `import { semantic } from '@utilitywarehouse/hearth-tokens/browser'`
- **Never** use raw values — always go through the token system

---

## Release process

Hearth uses [Changesets](https://github.com/changesets/changesets) for versioning.

1. Make your changes and run `pnpm changeset` in the repo root
2. Select the packages you changed and their version bump type
3. Commit the generated `.changeset/*.md` file alongside your code changes
4. On merge to `main`, GitHub Actions creates (or updates) a release PR automatically
5. Merging the release PR publishes all bumped packages to npm

Use the `add-changeset` skill for guidance on writing good changelog entries.

---

## Figma integration

- **Figma Code Connect** — `.figma.tsx` files map Figma components to code. Run via `pnpm figma:connect` or the `figma-code-connect.yml` CI workflow.
- **Figma variables plugin** — `apps/figma-variables-plugin` manages design token variables in Figma files.
- **Figma MCP** — use `get_design_context` / `get_screenshot` to pull designs into code; use `use_figma` to push components back.
