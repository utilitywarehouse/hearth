---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `Select` bottom sheet menu had incorrect heading style, spacing, and snap points

The `menuHeading` text used an oversized `DetailText` style instead of matching
the rest of the menu, and an unnecessary safe-area inset wrapper added extra
top spacing inside the bottom sheet. The bottom sheet's `snapPoints` also
included a `25%` step that doesn't match the design system; it now opens to
`40%` or `80%` only.

**Components affected**:

- `Select`
