---
'@utilitywarehouse/hearth-codemod': patch
---

🐛 [FIX]: `remove-modal-fullscreen` gives no warning when a literal `fullScreen` sits beside a spread

A spread that also carried `fullScreen` was never flagged for manual review
when a literal `fullScreen` was present. The codemod now warns about the spread
in addition to removing the literal.
