---
'@utilitywarehouse/hearth-react': patch
---

[BUG]: Fix `DatePicker` trigger type

Explicitly set the `DatePickerTrigger` type to `button` to prevent it from
defaulting to `submit` in forms, which could cause unintended form submissions.

This update requires no changes to existing code that uses `DatePicker`, as it
only alters the default behaviour of the trigger element.
