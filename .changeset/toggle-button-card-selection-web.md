---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `ToggleButtonCard` selection state didn't update on web when pressed

On web, pressing a `ToggleButtonCard`'s inner toggle button didn't update the
shared selection state — the card never visually reflected as selected and the
underlying radio input never became checked, even though `onChange` still
fired. This was caused by the nested toggle button intercepting the click
before it could reach the hidden radio input that drives selection.

**Components affected**:
- `ToggleButtonCard`
- `ToggleButtonCardGroup`

No developer action is required.
