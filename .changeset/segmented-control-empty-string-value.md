---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `SegmentedControl` dropped an empty-string value when its options changed

When the rendered options changed, the uncontrolled value was checked for falsiness, so `''` was replaced by the first option. It is now checked for `undefined` specifically, and `''` is kept. This matches the `Tabs` fix.
