---
'@utilitywarehouse/hearth-react-native': patch
---

🧹 [HOUSEKEEPING]: Add Storybook MCP addon

Adds `@storybook/addon-mcp` to Storybook so Chromatic can expose a hosted MCP
server (`list-all-documentation`, `get-documentation`,
`get-documentation-for-story`) for this package's stories, matching the setup
already in place for `hearth-react`. Also adds `autoAcceptChanges` and
`buildScriptName` to `chromatic.config.json` for parity.
