---
'@utilitywarehouse/hearth-react-native': patch
---

🧹 [HOUSEKEEPING]: Add Storybook Oversight lint and document missing component/prop JSDoc

Adds `storybook-addon-oversight` / `oversight-lint` to this package, mirroring the setup already in place for `hearth-react`, plus a `react-native-storybook-oversight` CI workflow that lints the Storybook manifest on every PR touching `packages/react-native`. This catches components or props with no JSDoc description before they reach the `hearth-react-native` MCP server, where an undocumented prop is invisible to AI coding agents.

Running this lint for the first time surfaced JSDoc gaps across almost every component in the package (unlike `hearth-react`, which already had partial coverage). Component-level descriptions and each component's own props have been documented across the library. Props inherited from React Native's own `ViewProps`/`PressableProps`/`TextProps` (e.g. `onTouchStart`, `onPointerEnter`, `style`, `ref`) are excluded from the `prop-descriptions-missing` rule via `oversight.config.json`, since documenting them would mean duplicating the same JSDoc across dozens of unrelated components.

**Developer changes**:

No action required — this only adds documentation and CI tooling, not runtime behaviour.
