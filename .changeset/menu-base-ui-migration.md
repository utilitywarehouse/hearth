---
"@utilitywarehouse/hearth-react": major
---

Migrate `Menu` from Radix UI to Base UI.

**Breaking changes (`MenuItem`):**

- `onSelect` has been removed. Use `onClick` instead — it fires for both mouse and keyboard activation.
- `textValue` has been removed with no replacement needed.
- `asChild` has been removed. It was accepted by the type but was never functional on `MenuItem`.

**Deprecation (`MenuContent`):**

- `forceMount` is deprecated. Use `keepMounted` instead. `forceMount` continues to work with a console warning in development.
