---
'@utilitywarehouse/hearth-codemod': patch
---

🐛 [BUG FIX]: Mistyped flags and missing paths no longer pass silently in `hearth-codemod`

Unknown flags such as `--dry-run` were ignored, so a run meant as a preview
rewrote files. Paths that don't exist, such as a typo like `scr`, matched
nothing and exited 0. The CLI now exits with an error for both, before any
codemod runs.
