---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Fix `Modal` layout when `inNavModal` and `stickyFooter={false}`.

Corrects the container flex style for `inNavModal` modals with a non-sticky footer, where the UX was not great when scrolling.

**Components affected**:
- `Modal`

**Developer changes**:

No changes required.
