---
'@utilitywarehouse/hearth-react-native': patch
---

💅 [ENHANCEMENT]: Improve VerificationInput OTP handling and accessibility

VerificationInput now uses a single hidden input to manage focus, selection, and paste behaviour across platforms, improving caret handling and bulk entry. Accessibility labels and hints are now derived from the form field to provide clearer screen reader output.

**Components affected**:
- `VerificationInput`

**Developer changes**:

No changes required.
