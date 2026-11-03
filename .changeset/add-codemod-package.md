---
'@utilitywarehouse/hearth-codemod': minor
---

🌟 [FEATURE]: `@utilitywarehouse/hearth-codemod` package available

A new CLI package that rewrites deprecated Hearth props to their replacements,
so you can migrate towards the `v1` API ahead of its release instead of
updating usages by hand.

```sh
npx @utilitywarehouse/hearth-codemod <codemod> <path...>
```

Available codemods:

- `react/v1/migrate-menu` — `MenuItem`'s `onSelect` → `onClick` and
  `textValue` → `label`, `MenuContent`'s `forceMount` → `keepMounted`
- `react/v1/remove-modal-fullscreen` — removes `Modal`'s no-op `fullScreen`
- `react/v1/remove-modal-loading-text` — `Modal`'s `loadingText` →
  `loadingHeading`
- `react/v1/remove-text-wrap-prop` — `wrap` → `textWrap` on `BodyText`,
  `Heading`, `Strong`, `Em` and `DetailText`
- `react/v1/migration` — runs all of the above in one pass

Usages that can't be rewritten safely are left unchanged and reported with
their file and line. See the package [README](../packages/codemod/README.md)
and the [`v1` migration guide](../packages/react/docs/migration/v1.docs.mdx)
for details.
