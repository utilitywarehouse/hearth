---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `Checkbox` tick icon stays in place when its scroll container scrolls

The tick icon was absolutely positioned without a positioned parent, so inside a scrolling container such as `Modal` it did not move with the checkbox. The checkbox now anchors the icon to itself.

**Components affected**:

- `Checkbox`

**Developer changes**:

No action required.
