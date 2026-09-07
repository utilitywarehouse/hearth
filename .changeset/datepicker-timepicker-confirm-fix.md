---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `DatePicker` and `TimePicker` Ok button didn't save the currently shown date or time

Pressing Ok in the `TimePicker` bottom sheet, or in the `DatePicker` bottom sheet
when a date was already selected (e.g. editing an existing record), closed the
sheet without calling `onChange` unless the person actively picked a new value
first. The currently shown value is now committed when Ok is pressed.

`DatePicker` in `single`, `range`, and `multiple` mode with nothing selected yet
still requires an explicit selection before Ok has anything to commit, so
required fields won't silently fill in a default value.

**Components affected**:

- `DatePicker`
- `TimePicker`

**Developer changes**:

No action required. This only changes when `onChange` fires — the signature is
unchanged.
