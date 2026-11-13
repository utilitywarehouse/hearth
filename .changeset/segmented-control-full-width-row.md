---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `SegmentedControl` `fullWidth` collapses inside a row

`fullWidth` only stretched the control in a column layout. Inside a parent with
`flexDirection: 'row'`, it stretched the height instead, so the control shrank and the
option labels wrapped. `fullWidth` now fills the container's width in both layouts.

**Components affected**:

- `SegmentedControl`

**Developer changes**:

No action is required.
