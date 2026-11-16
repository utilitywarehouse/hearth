# Hearth Claude Code plugin

Skills and MCP servers for building UI with `@utilitywarehouse/hearth-react`
and `@utilitywarehouse/hearth-react-native`.

## Install

```console
/plugin marketplace add utilitywarehouse/hearth
/plugin install hearth-ai-toolkit@hearth-plugins
```

This gives you:

- The `hearth-react` and `hearth-react-native` skills — triggered
  automatically whenever you're building UI in an app that has the
  corresponding Hearth package installed.
- The `hearth-react` and `hearth-react-native` MCP servers, for richer
  component discovery (`docs-list`, `docs-show`,
  `docs-show-story`) beyond the raw markdown docs shipped in each
  package's `public/llms/` folder.
- The `/hearth-ai-toolkit:hearth-react-planning` command, for scoping feature work against
  `hearth-react` before any code is written — maps a Linear ticket, a
  freeform description, or a Figma link onto the real component inventory
  and writes the resulting task breakdown back to Linear as sub-issues.
  React Native isn't covered yet. Needs the `linear@claude-plugins-official`
  plugin installed too; reading a Figma link additionally needs a separate
  Figma MCP integration of your own — this plugin doesn't bundle one — and
  falls back to asking for a text description when that isn't configured.
- The `/hearth-ai-toolkit:hearth-react-review` command, for reviewing or auditing UI code that
  already uses `hearth-react` — hallucinated or deprecated props,
  design-token misuse, accessibility gaps, and layout anti-patterns. React
  Native isn't covered yet.
- The `hearth-cli` skill, which tells Claude to look up design tokens, icons and
  assets with the `hearth` CLI instead of guessing names. The CLI runs through
  `npx`, so it needs Node and nothing else.
- The `design-systems-feedback` skill, for turning a rough edge or a win you
  hit while using any of the above into a real Linear issue in the Design
  Systems team's triage queue, instead of just telling you to report it
  yourself. Needs the `linear@claude-plugins-official` plugin installed too.

## Monorepo checkout note

The `hearth-react` and `hearth-react-native` skills are symlinks into
`packages/react/SKILL.md` and `packages/react-native/SKILL.md` (plus their
`references/` folders) elsewhere in this repo. If you add this
marketplace with `--sparse`, include those paths too:

```sh
claude plugin marketplace add utilitywarehouse/hearth --sparse .claude-plugin plugins packages/react packages/react-native
```

Omitting `--sparse` (a full clone) works too and is simplest.

## Scope

Components are covered by the `hearth-react` and `hearth-react-native` skills
and MCP servers. Tokens, icons, SVG assets and JSON assets are covered by the
`hearth-cli` skill, which calls the `hearth` CLI (`@utilitywarehouse/hearth-cli`)
rather than an MCP server. The other packages (fonts, css-reset) don't have a
skill or MCP server; the skills only give guidance on fonts.
