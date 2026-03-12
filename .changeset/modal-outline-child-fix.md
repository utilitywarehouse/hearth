---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Prevent outlines from being clipped for scrollable children in `Modal`

Fixed an issue in in-nav modals where child components with outlines could be visually clipped at the horizontal edges when content was scrollable.

**Components affected**:
- `Modal`

**Developer changes**:

No changes required.
