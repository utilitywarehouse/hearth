---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Disabled or read-only `VerificationInput` announced as invalid while its validation text is hidden

A `disabled` or `readOnly` `VerificationInput` hides its validation text, but
still set `aria-invalid` and `aria-errormessage` when `validationStatus` was
`invalid`. These are now only set when the validation text is shown.

**Components affected**:

- `VerificationInput`

**Developer changes**:

No changes required.
