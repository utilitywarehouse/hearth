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
- The `hearth-react-review` skill, for reviewing or auditing UI code that
  already uses `hearth-react` — hallucinated or deprecated props,
  design-token misuse, accessibility gaps, and layout anti-patterns. React
  Native isn't covered yet.
- The `design-systems-feedback` skill, for turning a rough edge or a win you
  hit while using any of the above into a real Linear issue in the Design
  Systems team's triage queue, instead of just telling you to report it
  yourself. Needs the `linear@claude-plugins-official` plugin installed too.

## Monorepo checkout note

This plugin's skills are symlinks into `packages/react/SKILL.md` and
`packages/react-native/SKILL.md` elsewhere in this repo. If you add this
marketplace with `--sparse`, include those paths too:

```sh
claude plugin marketplace add utilitywarehouse/hearth --sparse .claude-plugin plugins packages/react packages/react-native
```

Omitting `--sparse` (a full clone) works too and is simplest.

## Scope

Only `hearth-react` and `hearth-react-native` are covered today. The other
Hearth packages (tokens, fonts, css-reset, icons, svg-assets, json-assets)
don't yet have a consumer `SKILL.md` or MCP server — that work is tracked
separately.
