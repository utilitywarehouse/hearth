---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `RadioCard` and `RadioTile` render a `label` inside their radio button

`RadioCard` and `RadioTile` rendered their label as a `label` element inside
the radio's `button`, which is invalid HTML (interactive content inside a
button). The label is now a `span`. Its text still names the radio via
`aria-labelledby`, and clicking it still selects the option.

**Components affected**:

- `RadioCard`
- `RadioTile`

**Developer changes**:

No changes required.
