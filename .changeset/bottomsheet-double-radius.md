---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `BottomSheet` no longer shows a second set of rounded corners below the handle

`BottomSheetView` and `BottomSheetScrollView` no longer round their own top corners. Only the outer sheet is rounded, so the backdrop no longer shows through a gap under the drag handle on iOS and Android.

**Developer changes**:

No action is required.
