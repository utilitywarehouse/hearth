---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Apply correct border width to the `CardActions`. Previously this was
variable depending on the parent `Card` variant, but is now always set to
`--h-border-width-1`.
