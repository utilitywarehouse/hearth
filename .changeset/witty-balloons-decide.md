---
'@utilitywarehouse/hearth-react': minor
---

Breaking changes to padding & margin props. These were made for better
readability and familiarity with prop naming conventions.

Rename `marginInline` & `marginBlock` to `marginX` & `marginY`
Rename `paddingInline` & `paddingBlock` to `paddingX` & `paddingY`

```diff
- <Box marginInline="200" marginBlock="200" paddingInline="200" paddingBlock="200" />
+ <Box marginX="200" marginY="200" paddingX="200" paddingY="200" />
```
