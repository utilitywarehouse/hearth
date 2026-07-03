---
"@utilitywarehouse/hearth-react": major
---

Migrate `Menu` from Radix UI to Base UI.

**Deprecations:**

- `MenuItem: onSelect` is deprecated. Use `onClick` instead — it fires for both mouse and keyboard activation. `onSelect` continues to work with a dev-mode warning.
- `MenuItem: textValue` is deprecated. Use `label` instead — it is used for accessibility and keyboard navigation. `textValue` continues to work with a dev-mode warning.
- `MenuContent: forceMount` is deprecated. Use `keepMounted` instead. `forceMount` continues to work with a dev-mode warning.
