---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Correct `VerificationInput` focus progression after editing an empty slot

Fixed an issue where entering a value after selecting an empty verification slot could move focus to the wrong slot. Focus now moves to the slot immediately after the one that was actually updated.

**Components affected**:
- `VerificationInput`

**Developer changes**:

No changes required.
