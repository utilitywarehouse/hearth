---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Improve accessibility roles for `List`, `ListItem`, and `ListAction`

`List` now defaults to `accessibilityRole="list"`, `ListAction` now defaults to `accessibilityRole="button"`, and `ListItem` respects an explicitly provided `accessibilityRole` instead of always forcing button semantics when `onPress` is set.

**Components affected**:
- `List`
- `ListItem`
- `ListAction`

**Developer changes**:

No changes are required unless you want a tappable `ListItem` to be announced as something other than a button. In that case, pass `accessibilityRole` explicitly.