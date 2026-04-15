---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Modal aria description

Modal no longer sets `aria-describedby` when no description is provided. [Radix UI docs](https://www.radix-ui.com/primitives/docs/components/dialog#description)