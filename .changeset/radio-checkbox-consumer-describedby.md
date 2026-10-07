---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `aria-describedby` passed to `Radio`, `RadioTile`, `Checkbox` or `CheckboxTile` ignored

These components overwrote an `aria-describedby` passed by consumers with
their own helper, validation or group text IDs. The consumer's value is now
kept alongside them.

**Components affected**:

- `Radio`
- `RadioTile`
- `Checkbox`
- `CheckboxTile`

**Developer changes**:

No changes required.
