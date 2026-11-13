---
name: hearth-cli
description: "Use before writing a Hearth design token, icon, SVG asset or JSON (animated) asset reference, or any hardcoded colour, spacing or font value in a project that has the Hearth packages installed. Looks the name up with the `hearth` CLI instead of guessing it. Not for component props, which come from the Hearth MCP servers."
---

# Looking up Hearth tokens, icons and assets

Never guess a token path, CSS variable, icon name or asset import. Look it up with
`hearth`, which answers from the Hearth packages installed in the project.
Components (props, usage, stories) are not in the CLI: use the `hearth-react` or
`hearth-react-native` MCP server for those.

## When to call it

- **Tokens**: before using a colour, spacing, radius, border, shadow or type value.
  `hearth tokens search <word>`, then `hearth tokens get <path>`.
- **Icons**: before importing an icon. `hearth icons search <word>`, then
  `hearth icons get <name>` for the component and import line.
- **Assets**: before using an illustration, logo or animation.
  `hearth assets svg search <word>` or `hearth assets json search <word>`, then `get`.
- **Fonts**: not in the CLI. Never hardcode a font family; use the typography
  components and tokens.

## How to call it

- Use the project's own `hearth` if `@utilitywarehouse/hearth-cli` is installed
  (`pnpm exec hearth`, `npx hearth`), otherwise `npx @utilitywarehouse/hearth-cli`.
  Run it from the app's directory: it reads the packages installed there.
- Add `--json`, check the exit code first, then parse stdout.
- `hearth tokens` defaults to web. In a React Native project pass
  `--platform native` to `hearth tokens` commands explicitly (icons and assets
  reject the flag with exit 2). Dark values exist only on native: never copy
  one into web code. On native the light value is `js.path` and the dark value
  is the separate `js.darkPath`; use both, or the theme that selects between them.
  `hearth tokens` reads the installed `@utilitywarehouse/hearth-tokens`, which a
  React Native app may not have (exit 3): then check the app's theme instead.
- Prefer semantic tokens (the default layer). Use a primitive or component token
  only when no semantic token fits, and say so. Never hardcode a colour, spacing
  or font value when a token exists.
- Use the surface that matches the file: `css.variable` in CSS, `browser` in
  JS/TS on web, `js` on native.

## Exit codes

| Exit | What you see | Do this |
| ---- | ------------ | ------- |
| 0 | JSON on stdout | Use it. |
| 1 on `search`/`list` | JSON with `total: 0` | No match. Try one or two broader or synonym queries. For tokens the search covers only the semantic layer, so before giving up also try `--layer primitive`, or `--layer component` for a component-specific value. Then tell the user nothing fits. Do not invent a name. |
| 1 on `get` | Plain text on stderr, nothing on stdout | Pick from the suggested names, or `search`. If none fits, say so. |
| 1 on `--print` | Stderr says the file is too large | Read the named file from the package instead. |
| 2 | Usage on stderr | The command was wrong. Fix it once from the usage text; do not try variations. |
| 3 | Message on stderr | Package missing, too old, or its manifest is newer than the CLI. Tell the user the message and the command it gives. Do not install without asking, and do not fall back to guessing from `node_modules`. |
| 1 with `ERR_PACKAGE_PATH_NOT_EXPORTED` and a stack trace on stderr | Nothing on stdout | Not a no-match. The installed package hides its manifest, so it is altered or not a Hearth release. Stop, tell the user, and do not retry. Offer `design-systems-feedback`. |

Nothing is parseable from a failed `get`, a `2` or a `3`: read stderr.
