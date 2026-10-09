---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `Checkbox` and `CheckboxTile` lose their accessible name when given `aria-labelledby`

- An `aria-labelledby` passed by consumers was replaced with the ID of the
  component's own label, so a `Checkbox` or `CheckboxTile` labelled externally
  (without `label`) had no accessible name. The consumer's value is now used,
  matching `Radio` and `RadioTile`.
- An invalid `Checkbox` or `CheckboxTile` now sets `aria-invalid` whenever
  `validationStatus` is `invalid`, even without `validationText`, and only
  references its validation text from `aria-describedby`/`aria-errormessage`
  when it's rendered (a `Checkbox` without a `label` doesn't render it).
- Inside a `CheckboxGroup` with its own `helperText`, an item's hidden
  `helperText` is no longer referenced by `aria-describedby`.
- `CheckboxTile` rendered a `label` nested inside its outer `label`, which is
  invalid HTML. The inner label is now a `span`.

**Components affected**:

- `Checkbox`
- `CheckboxTile`

**Developer changes**:

No changes required.
