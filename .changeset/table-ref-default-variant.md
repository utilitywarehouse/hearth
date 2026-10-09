---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `Table` doesn't forward its `ref` without a `variant`

A `ref` passed to `Table` only reached the `table` element when `variant`
was set. With the default variant it stayed `null`. It's now forwarded in
both cases.

**Components affected**:

- `Table`

**Developer changes**:

No changes required.
