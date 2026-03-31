---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Standardise numeric value typography across list-based components.

Numeric values in `DescriptionListItem`, `ExpandableCard`, and `ListItem` now render with semibold `BodyText` instead of `DetailText`, aligning them with the updated content hierarchy used elsewhere in the library.

**Components affected**:
- `DescriptionListItem`
- `ExpandableCard`
- `ListItem`

**Developer changes**:

No changes are required.