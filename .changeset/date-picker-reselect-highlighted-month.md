---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `DatePicker` gets stuck on the month or year grid when the highlighted option is picked again

Picking a year highlights January, so a customer born in January who then
picks January stays on the month grid and never sees the days. The field
silently keeps the 1st of the month, so the customer has to pick a different
month and come back, or submits the wrong date. Picking the highlighted month
or year now always moves on to the next grid.

**Components affected**:

- `DatePicker`

**Developer changes**:

No action is required. A custom `onSelect` handler is still called.
