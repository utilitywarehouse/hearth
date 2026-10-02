---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `ListItem` accepted any props and offered no intellisense, including `leadingContentAlignment`, `contentAlignment` and `trailingContentAlignment`

`ListItem`'s prop types resolved to `any`, so none of its props — including the
part alignment props — were completed or type-checked. `ListItem` now has an
explicit prop type, so these show up in intellisense again.

**Components affected**:
- `ListItem`

**Developer changes**:

No action is required, but `ListItem` now reports type errors for unknown
props, and for passing the alignment props together with `children`.
