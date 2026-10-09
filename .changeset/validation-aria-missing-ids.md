---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Form fields reference validation text that isn't rendered

Validation text only renders when both `validationStatus` and
`validationText` are set. These fields still pointed `aria-describedby` at it
when only `validationText` was set, and `aria-errormessage` at it when only
`validationStatus="invalid"` was set, leaving references to an element that
doesn't exist. They now only reference it when it's rendered.
`aria-invalid` is still set for an invalid field without validation text.

**Components affected**:

- `TextInput` (and `PasswordInput`, `SearchInput`, `CurrencyInput`)
- `TextArea`
- `Select`
- `Combobox`
- `DatePicker`
- `VerificationInput`

**Developer changes**:

No changes required.
