---
'@utilitywarehouse/hearth-codemod': patch
---

🐛 [FIX]: Modal codemods rewrite files that don't import `Modal` from Hearth

The `remove-modal-loading-text` and `remove-modal-fullscreen` codemods now
return files that don't import `Modal` from `@utilitywarehouse/hearth-react`
unchanged, including empty and comment-only files.
