---
'@utilitywarehouse/hearth-react': patch
---

🧹 [HOUSEKEEPING]: `Switch` now uses Base UI's Switch primitive instead of `radix-ui`

Part of the ongoing migration off `radix-ui`. The public API and rendered
output are unchanged: `Switch` still renders a native `<button>` and keeps
`asChild` support.
