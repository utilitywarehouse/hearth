---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Consumer `aria-describedby` and `aria-errormessage` dropped by form groups, and `DateInput` month segment accepts unlimited digits

- `DateInput`, `CheckboxGroup` and `RadioGroup` replaced an `aria-describedby`
  passed by consumers with the helper text's ID, and pointed at a helper text
  element that wasn't rendered when no `helperText` was set. The consumer's
  value is now kept alongside the helper and validation text.
- They likewise replaced a consumer `aria-errormessage` with the validation
  text's ID, even when no validation text was shown. The consumer's value is
  now used as-is.
- The `DateInput` month segment now accepts at most 2 characters, matching
  the day segment.

**Components affected**:

- `DateInput`
- `CheckboxGroup`
- `RadioGroup`

**Developer changes**:

No changes required.
