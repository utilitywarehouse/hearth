---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX] Modal aria description

Pass `aria-describedby={undefined}` to internal `DialogPrimitive.Content` when no description is provided. [Radix UI docs](https://www.radix-ui.com/primitives/docs/components/dialog#description)