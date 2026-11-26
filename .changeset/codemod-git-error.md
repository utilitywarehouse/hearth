---
'@utilitywarehouse/hearth-codemod': patch
---

🐛 [FIX]: `hearth-codemod` reports "stash or commit your changes" when `git` itself fails

Any `git` failure was reported as a dirty working tree, hiding the real cause.
The CLI now reports the underlying `git` error.
