---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Web bundlers (Vite/Rollup) could tree-shake away Unistyles configuration, breaking styling

`package.json` previously declared `"sideEffects": false` for the whole package. Bundlers that tree-shake on the exports of `export * from './core'` could conclude the module was unused and strip it entirely, skipping the `StyleSheet.configure(...)` call that sets up breakpoints, themes, and the initial theme. This surfaced as broken/missing styles (or outright runtime errors) in `react-native-web` apps built with Vite.

The `StyleSheet.configure(...)` call has been moved out of `core/index.ts` into its own side-effect-only module, `core/configure.ts`, imported as the first statement in the package entry point. This makes the "must run before any component calls `StyleSheet.create`" ordering explicit and independent of the barrel's re-export order, rather than relying on `export *` sequencing. `package.json`'s `sideEffects` field is scoped to `["build/core/configure.js"]`, so bundlers keep evaluating that module even though none of its (non-existent) exports are directly imported, while the rest of the package remains tree-shakeable as before.

**Developer changes**:

No action required — this only affects how consuming bundlers tree-shake the package. As before, importing components via deep paths into `build/` rather than the package root is unsupported and may not run this configuration step.
