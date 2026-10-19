---
'@utilitywarehouse/hearth-codemod': patch
---

Skip files without a Hearth `Modal` import in the `remove-modal-loading-text` and `remove-modal-fullscreen` codemods

Files that don't import `Modal` from `@utilitywarehouse/hearth-react`, including empty and comment-only files, are now returned unchanged.
