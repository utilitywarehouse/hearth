---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Make `paddingNone` remove horizontal padding for ghost buttons in `md` size

Fixed an issue where setting `paddingNone` on a ghost button did not remove horizontal padding when using `md` size. The prop now removes horizontal padding for both `sm` and `md` ghost buttons.

**Components affected**:
- `Button`

**Developer changes**:

No changes required.
