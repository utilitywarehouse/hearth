---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `Select` and `Combobox` helper and validation text not announced by screen readers

The `Select` trigger and `Combobox` input are now described by their
`helperText` and `validationText` via `aria-describedby`, and set
`aria-invalid` and `aria-errormessage` when `validationStatus` is `invalid`,
matching `TextInput`. A disabled field, which hides its validation text, is
no longer marked invalid. `Select` also now forwards an `aria-describedby`
passed by consumers, which was previously dropped.

**Components affected**:

- `Select`
- `Combobox`

**Developer changes**:

No changes required.
