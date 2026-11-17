---
'@utilitywarehouse/hearth-codemod': patch
---

🐛 [FIX]: `hearth-codemod` accepts codemod names containing `..` or pointing at test directories

The CLI now rejects these names instead of trying to run them.
