---
'@utilitywarehouse/hearth-react-native': patch
---

💅 [ENHANCEMENT]: Tighten `Modal` prop types and fix brand background text styling

Improves TypeScript safety so `stickyFooter` is not allowed when `inNavModal` is true, and `background` can only be set when `inNavModal` is true. Also ensures headings, body text, and button content are correctly inverted when using the brand background.

**Components affected**:
- `Modal`

**Developer changes**:
No changes required unless you were relying on invalid prop combinations.
