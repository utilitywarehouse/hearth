---
'@utilitywarehouse/hearth-react': minor
---

💅 [ENHANCEMENT]: `keepMounted` added to `Modal`, `forceMount` deprecated

`Modal` accepts a new `keepMounted` prop to keep its content mounted in the DOM
while closed. `forceMount` is deprecated in favour of it and will be removed
when `Modal` migrates to Base UI. Passing it logs a warning in development.

**Developer changes**:

```diff
- <Modal forceMount heading="Hearth modal">
+ <Modal keepMounted heading="Hearth modal">
```
