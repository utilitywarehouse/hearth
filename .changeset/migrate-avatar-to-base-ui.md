---
'@utilitywarehouse/hearth-react': patch
---

🔧 [Avatar]: migrate from Radix UI to Base UI

`Avatar` now uses Base UI internally instead of Radix UI. Visual output is unchanged.

**Deprecated**:

- `delayMs` is deprecated in favour of `delay`. Both take milliseconds and behave the same. `delayMs` still works and logs a dev-time warning.
