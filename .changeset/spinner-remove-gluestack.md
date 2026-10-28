---
'@utilitywarehouse/hearth-react-native': patch
---

🧹 [HOUSEKEEPING]: `Spinner` no longer depends on `@gluestack-ui/spinner`

`createSpinner` only set a `displayName` and `defaultProps` for `tabIndex`/`aria-label` — both are now set directly on the component, which also fixes an existing inconsistency where the `aria-label="loading"` default didn't reliably apply under React 19's handling of function-component `defaultProps`. No prop or visual change.
