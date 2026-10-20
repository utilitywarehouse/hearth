---
'@utilitywarehouse/hearth-codemod': patch
---

🐛 [BUG FIX]: `remove-modal-loading-text` leaves some `Modal` usages unmigrated without saying so

`<H.Modal>` from a namespace import was skipped, and `loadingText` was dropped
whenever `loadingHeading` was present, even a conditional one that can be
empty. Namespace imports are now migrated. `loadingText` is kept and a warning
is printed for a non-literal `loadingHeading`, and for a `Modal` that spreads
props that may carry `loadingText`.
