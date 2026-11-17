---
"@utilitywarehouse/hearth-react": minor
---

💅 [ENHANCEMENT]: `forceMount` deprecated on `Modal`

`Modal`'s `forceMount` prop is deprecated and will be removed when `Modal` migrates to Base UI. Passing it logs a warning in development.

**Components affected**:

- `Modal`

**Developer changes**:

No immediate changes required. Remove `forceMount` from `Modal` usages before the Base UI migration.
