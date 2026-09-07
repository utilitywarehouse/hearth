---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `TimePicker` hour or minute wheel could render blank or misaligned

The hour wheel wasn't snapped to a valid option before being handed to the
picker, unlike the minute wheel. If the underlying value didn't exactly match
one of the wheel's options, the wheel had nothing to scroll to, which could
render blank or misaligned on open. The hour is now snapped to the nearest
valid option the same way the minute already was.

**Components affected**:

- `TimePicker`

**Developer changes**:

No action required. If an invalid or out-of-range hour is ever passed in, the
wheel now displays the nearest valid hour instead of appearing blank.
