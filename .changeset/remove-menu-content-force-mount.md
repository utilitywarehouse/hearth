---
'@utilitywarehouse/hearth-react': major
---

💔 [BREAKING CHANGE]: `MenuContent` `forceMount` removed in favour of `keepMounted`

`forceMount` was a deprecated alias for `keepMounted`. It has now been removed,
matching `AccordionContent`.

**Components affected**:

- `MenuContent`

**Developer changes**:

Replace `forceMount` with `keepMounted`:

```diff
- <MenuContent forceMount>
+ <MenuContent keepMounted>
```
