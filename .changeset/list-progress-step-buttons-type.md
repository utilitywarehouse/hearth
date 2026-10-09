---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `ListItemButton`, `ListActionButton` and `ProgressStepButton` submit a surrounding form

These rendered a `button` without a `type`, so it defaulted to
`type="submit"`. Inside a `form`, clicking one, even while `disabled`,
submitted it. They now default to `type="button"`, and you can still pass
`type` to override it.

**Components affected**:

- `List` (`ListItemButton`, `ListActionButton`)
- `ProgressStepper` (`ProgressStepButton`)

**Developer changes**:

No changes required.
