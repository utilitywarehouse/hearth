---
'@utilitywarehouse/hearth-react': minor
---

💔 [BREAKING CHANGE]: `Select` no longer accepts an `asChild` prop

`asChild` was declared on `SelectProps` but had no effect — `Select` never
read it or forwarded it to the underlying trigger. It has been removed from
the public API.

**Developer changes**:

If you were passing `asChild` to `Select`, remove it — it was already being
ignored, so this has no effect on rendered behaviour.
