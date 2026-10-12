---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Pressable parts of some components have no accessibility role

Screen readers did not announce what some pressable areas were, or whether
an option was selected. These elements now have a role that matches what they
do.

**Components affected**:

- `Select`: the trigger is announced as a button and reports whether the
  options sheet is expanded
- `SelectOption` and `ComboboxOption`: announced as radio options with their
  checked and disabled state
- `DatePickerInput` and `TimePickerInput`: the field is announced as a button
  when `disableManualEntry` is set and pressing it opens the picker
- `Toast`: a toast with `onPress` is announced as a button

**Developer changes**:

No action is required.
