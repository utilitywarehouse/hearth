---
'@utilitywarehouse/hearth-react': patch
---

[BUG]: Fix `TextInput` focus with react-hook-form

`react-hook-form` was causing the `TextInput` to lose focus when typing, this
has been fixed.

Be aware that you will probably want to set `noValidate` on your form to prevent
the browser from displaying its own validation messages.

Otherwise, this shouldn't cause any changes to consumer code.
