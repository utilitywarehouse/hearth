---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Respect the selected `NavModal` background style

Fixed an issue where `NavModal` always rendered its inner content with the default surface background, which prevented the `background="brand"` treatment from being applied correctly.

**Components affected**:
- `NavModal`

**Developer changes**:

No changes are required.