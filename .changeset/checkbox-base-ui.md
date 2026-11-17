---
'@utilitywarehouse/hearth-react': patch
---

🧹 [HOUSEKEEPING]: `Checkbox` now uses Base UI's `Checkbox` primitive instead of Radix's

Part of the ongoing migration off `radix-ui`. Internal only: the public props, behaviour and markup hooks are unchanged apart from the checked-state attribute, which is now `data-checked` / `data-unchecked` (previously `data-state`). Hearth's own `Checkbox` styles are updated accordingly.

No public API change.
