---
'@utilitywarehouse/hearth-codemod': patch
---

🐛 [BUG FIX]: Skip files without a `Modal` import in the Modal codemods

The `remove-modal-loading-text` and `remove-modal-fullscreen` codemods now
return files that don't import `Modal` from `@utilitywarehouse/hearth-react`
unchanged, including empty and comment-only files.
