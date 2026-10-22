---
'@utilitywarehouse/hearth-codemod': patch
---

🐛 [BUG FIX]: `remove-modal-loading-text` treats a type-only `Modal` import as a rendered component

`import type { Modal }` and `import { type Modal }` were collected as runtime
`Modal` bindings, so a `<Modal loadingText>` in the same file was rewritten.
Type-only imports are now ignored.
