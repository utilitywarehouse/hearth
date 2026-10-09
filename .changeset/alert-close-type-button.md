---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `Alert` close button submits a surrounding form

The close button shown when `onClose` is set had no `type`, so it defaulted
to `type="submit"` and submitted any form the `Alert` was in. It now has
`type="button"`.

**Components affected**:

- `Alert`

**Developer changes**:

No changes required.
