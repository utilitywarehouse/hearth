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

## After making changes

Run `pnpm checks`. Other commands are in the `package.json` scripts.

- After changing a component's props, run `pnpm test:storybook <component>` from `packages/react`. Play functions can depend on a prop's behaviour rather than its name, so a search for the name misses them.

---

## Skills

Skills live in `.claude/skills/` (`.agents/skills` links to it); each description says when to use it. Invoke with `/skill-name`.

- Edit skills in their own branch, outside PR stacks: rebasing a commit that touches `.claude/skills/` fails in the agent sandbox.
- Applying review feedback to a stacked PR: `/stack-review-fix`.

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

`hearth-tokens` is **not** a runtime dependency of `hearth-react` or `hearth-react-native` — tokens are vendored into each package via scripts (`pnpm generate:tokens:react` for React, `pnpm --dir packages/react-native run copyTokens` for React Native). If you change tokens, run the relevant script before building.

For usage guidance:
- **React** — see the `react-component-addition` skill.
- **React Native** — see the `react-native-component-addition` skill.

---

## Releases

Hearth uses [Changesets](https://github.com/changesets/changesets). Run `pnpm changeset`, commit the generated file with your changes, and a release PR is created automatically on merge to `main`. Use the `add-changeset` skill for guidance.
