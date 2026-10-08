---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Disabled `ToggleButtonCard` now disables its button

A disabled `ToggleButtonCard` now disables its toggle button. The button renders at the same reduced opacity as other disabled components such as `Button` and `Checkbox`, and it can no longer be pressed. The card content keeps its normal opacity.

**Developer changes**:

No action is required.
