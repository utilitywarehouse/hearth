---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `ToastProvider` viewport props such as `className` and `style` ignored

`ToastProvider` accepts the toast viewport's props, but they were passed to
the context-only provider and never reached the rendered viewport. They now
apply to the viewport, with `className` merged alongside the default class.

**Components affected**:

- `ToastProvider`

**Developer changes**:

No changes required.
