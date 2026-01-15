---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `DatePicker` usage inside `Modal`

When using the `DatePicker` component inside a `Modal`, users were unable to
select dates properly. This was caused by the Radix UI dialog component we use
in `Modal` setting `pointer-events: none` on the `body` element. This is fixed
by explicitly setting `pointer-events: auto` on the `DatePicker` popper.
