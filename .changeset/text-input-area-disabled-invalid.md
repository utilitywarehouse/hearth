---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Disabled or read-only `TextInput` and `TextArea` announced as invalid while their validation text is hidden

A `disabled` or `readOnly` `TextInput` or `TextArea` hides its validation
text, but still set `aria-invalid` and `aria-errormessage` when
`validationStatus` was `invalid`. These are now only set when the validation
text is shown, matching `Select`, `Combobox` and `DatePicker`. This also
applies to `PasswordInput`, `SearchInput` and `CurrencyInput`, which are
built on `TextInput`.

**Components affected**:

- `TextInput`
- `TextArea`

**Developer changes**:

No changes required.
