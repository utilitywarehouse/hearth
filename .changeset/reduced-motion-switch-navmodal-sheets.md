---
'@utilitywarehouse/hearth-react-native': patch
---

`Switch`, `Tabs`, `NavModal`, `BottomSheet`, `BottomSheetModal` and `Modal` now respect reduced motion. `Switch` no longer animates its press scale, `Tabs` moves the active indicator without animation, `NavModal` skips its Android open and close animation, and the bottom sheets receive the resolved reduced-motion value so they open and close without animation.
