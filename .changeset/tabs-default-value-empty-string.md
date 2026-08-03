---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `Tabs` ignored an explicit empty-string `defaultValue`

`Tabs` treated `defaultValue` as truthy when resolving its initial
uncontrolled value, so `defaultValue=""` was silently ignored in favour of
the first tab's value. `defaultValue` is now checked for `undefined`
specifically, matching `SegmentedControl`'s existing behaviour.
