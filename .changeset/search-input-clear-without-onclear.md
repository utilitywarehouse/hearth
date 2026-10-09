---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `SearchInput` shows a clear button that does nothing when `onClear` isn't set

The clear button appeared whenever `SearchInput` had a value, even without
an `onClear` handler, so clicking it had no effect. As documented, it now
only appears when `onClear` is provided.

**Components affected**:

- `SearchInput`

**Developer changes**:

If you rely on the clear button, make sure you pass `onClear`.
