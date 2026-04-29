---
'@utilitywarehouse/hearth-react': minor
---

💔 [BREAKING CHANGE]: `validationPlacement` prop removed from `DateInput`

This prop has been removed from the public API as it should not have been
exposed in the first place.

**Developer changes**:

Remove any `validationPlacement` usage from `DateInput`:

```diff
- <DateInput validationPlacement="bottom" ... />
+ <DateInput ... />
```
