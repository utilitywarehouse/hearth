---
'@utilitywarehouse/hearth-codemod': patch
---

🐛 [FIX]: The `hearth-codemod` CLI is now included in the published package

`0.1.1` was published without its built `dist/` folder, so `npx @utilitywarehouse/hearth-codemod` failed with `hearth-codemod: command not found`. The package now builds before publishing.
