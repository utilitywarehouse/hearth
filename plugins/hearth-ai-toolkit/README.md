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
  component discovery (`list-all-documentation`, `get-documentation`,
  `get-documentation-for-story`) beyond the raw markdown docs shipped in each
  package's `public/llms/` folder.

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
