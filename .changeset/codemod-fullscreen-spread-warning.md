---
'@utilitywarehouse/hearth-codemod': patch
---

🐛 [BUG FIX]: `remove-modal-fullscreen` gives no warning when a literal `fullScreen` sits beside a spread

Removing the literal `fullScreen` returned before the spread check, so a
spread that also carried `fullScreen` was never flagged for manual review. The
codemod now warns about the spread in addition to removing the literal.
