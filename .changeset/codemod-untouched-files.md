---
'@utilitywarehouse/hearth-codemod': patch
---

🐛 [BUG FIX]: `migrate-accordion` reprints and can crash on files that don't use `Accordion`

The codemod printed every file it visited, so quotes and whitespace could
change in files with no Hearth `Accordion`, and an empty or comment-only file
crashed it. Files that don't import `Accordion` from Hearth are now returned
unchanged.
