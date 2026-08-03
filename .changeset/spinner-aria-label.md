---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `Spinner` sometimes missing accessible label and keyboard focus

`Spinner` relied on `@gluestack-ui/spinner` setting `aria-label` and
`tabIndex` via `defaultProps` on the underlying component. React 19 no
longer applies `defaultProps` to function components, so depending on
where `Spinner` was rendered, these attributes could be silently dropped
— leaving some spinners without an accessible name for screen readers.

`Spinner` now sets these defaults itself, so the accessible label and
focusability are applied consistently regardless of render position.

**Components affected**:
- `Spinner`

**Developer changes**:

No action required. `aria-label` and `tabIndex` remain overridable via
props as before.
