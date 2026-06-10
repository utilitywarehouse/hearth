---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Move `data-testid` to the outer element in `ToggleGroup`

`data-testid` was being applied to the inner `ToggleGroupPrimitive.Root` rather
than the outer `Flex` wrapper, inconsistent with how other components expose
their test IDs.
