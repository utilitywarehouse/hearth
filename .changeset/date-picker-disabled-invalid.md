---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Disabled or read-only `DatePicker` announced as invalid while its validation text is hidden

A `disabled` or `readOnly` `DatePicker` hides its validation text, but its
trigger still set `aria-invalid` and `aria-errormessage` when
`validationStatus` was `invalid`. These are now only set when the validation
text is shown.

**Components affected**:

- `DatePicker`

**Developer changes**:

No changes required.
