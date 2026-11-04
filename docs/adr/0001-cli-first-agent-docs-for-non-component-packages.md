---
status: accepted
---

# Serve agent docs for tokens, icons and assets from a CLI, not a Storybook MCP

Agents need lookups (names, values, imports) for `hearth-tokens`, the icon packages, `hearth-svg-assets` and `hearth-json-assets`. We will build a CLI (`@utilitywarehouse/hearth-cli`, bin `hearth`, run via `npx`) that reads a versioned `hearth-manifest.json` shipped by each indexed package from the consumer's `node_modules`, and guide agents with plugin skills in `plugins/hearth-ai-toolkit/skills/` that call it. The existing React and React Native Storybook MCPs stay as they are, for components.

## Considered options

- **Third Storybook MCP (e.g. `addon-mcp` on `apps/storybook-docs`).** Rejected. `@storybook/addon-mcp` only toggles its built-in `dev`, `docs` and `test` toolsets, and its docs content comes only from `components.json` / `docs.json` manifests, so it cannot expose `icons-search` or `tokens-get` style tools. It would also serve the latest docs rather than the version the consumer has installed, and add MCP config plus permanent tool schemas in agent context for every consumer.
- **Checked-in generated markdown reference.** Rejected. It drifts from the installed package version and needs its own freshness process.
- **Custom MCP server.** Deferred. If the benchmark in UWDS-5207 or a shell-less client demands one, it should be a thin server over the same CLI core, not a Storybook addon.

## Consequences

- The CLI holds no data. Each indexed package emits `hearth-manifest.json` (with `schemaVersion`, package name and version) in its build, so upgrading a package updates the CLI's answers without a CLI release.
- Icons share one manifest. A single generator, run from the `svg-icons` source of truth, writes the same icon list into the SVG, React and React Native icon packages, each with a `usage` block for its own platform, so the CLI works when only one platform's package is installed.
- Token entries are tagged by layer (primitive, semantic, component) and record a path per surface: CSS variable, browser named export and JS namespaced path. These differ today. Dark values exist only on the JS surface (React Native); the CLI filters by `--platform web|native` and never suggests a dark value to a web-only consumer.
- Skills hold judgement guidance (prefer semantic tokens, never hardcode colours, how to load fonts) and no data tables. Fonts get guidance only.
- The legacy-colour-library-to-Hearth mapping is out of scope; it belongs to the migration guidance in UWDS-5187.
