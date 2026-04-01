---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: Correct `NavModal` safe area handling across sheet and full-screen presentations.

`NavModal` now applies safe area insets directly within the component layout, which fixes padding in full-screen presentations and keeps sheet-style presentations aligned with the modal footer behaviour.

**Developer changes**:

If you need to disable the inset padding, use the `useSafeAreaInsets` prop. The old `safeAreaViewProps` escape hatch is no longer available.