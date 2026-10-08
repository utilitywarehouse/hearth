---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `PasswordInput` doesn't announce the password being hidden again when toggled quickly

Showing and then hiding the password within 1.5 seconds cleared the
screen-reader announcement instead of updating it, so "Your password is
hidden!" was never announced. Each toggle now announces the current state.

**Components affected**:

- `PasswordInput`

**Developer changes**:

No changes required.
