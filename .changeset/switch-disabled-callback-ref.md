---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Disabled `Switch` still toggles when given a callback `ref`

A disabled `Switch` blocked clicks through a listener attached via its
`ref`, which only worked for object refs. With a callback ref (for example
from a merged-refs helper or a form library), clicking a disabled,
uncontrolled `Switch` still toggled it. Clicks are now blocked regardless of
the kind of `ref`, and the `Switch` stays focusable when disabled.

A disabled `Switch` also no longer calls a consumer `onClick`, matching its
docs and `Button`.

**Components affected**:

- `Switch`

**Developer changes**:

No changes required.
