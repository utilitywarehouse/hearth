---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `Select` `menuHeading` styled with oversized text and extra top spacing

The `menuHeading` text used an oversized `DetailText` style instead of matching
the rest of the menu, and an unnecessary safe-area inset wrapper added extra
top spacing inside the bottom sheet.

**Components affected**:

- `Select`
