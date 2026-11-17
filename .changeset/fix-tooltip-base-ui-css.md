---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `Tooltip` applies its maximum width and open animation after the Base UI migration

`Tooltip` styles still read Radix attributes and variables, so the maximum width and the slide-and-fade animation were not applied. They now use the Base UI equivalents.

**Components affected**:

- `Tooltip`
