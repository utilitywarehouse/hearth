---
'@utilitywarehouse/hearth-react': major
---

💔 [BREAKING CHANGE]: `Avatar` `delayMs` prop removed in favour of `delay`

`delayMs` was a deprecated alias for `delay`. Both took milliseconds, so renaming the prop is the only change needed.

**Components affected**:

- `Avatar`

**Developer changes**:

```diff
- <Avatar name="Ada Lovelace" delayMs={600} />
+ <Avatar name="Ada Lovelace" delay={600} />
```
