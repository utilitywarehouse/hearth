---
'@utilitywarehouse/hearth-codemod': patch
---

🐛 [BUG FIX]: `remove-modal-loading-text` leaves some `Modal` usages unmigrated without saying so

`<H.Modal>` from a namespace import was skipped, and `loadingText` was dropped
whenever `loadingHeading` was present, even a conditional or empty one that
leaves `loadingText` as the fallback. Namespace imports are now migrated, and a
`loadingHeading` written as `{'text'}` counts as a literal. `loadingText` is
kept and a warning is printed when `loadingHeading` is non-literal or empty,
and for any `Modal` that spreads props that may carry `loadingText`, even when
a literal `loadingText` is also present.
