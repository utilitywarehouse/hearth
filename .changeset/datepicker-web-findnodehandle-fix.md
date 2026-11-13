---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `DatePicker` threw an uncaught error on web when its bottom sheet opened

Opening the calendar bottom sheet ran a native-only accessibility-focus step that called `findNodeHandle`, which `react-native-web` doesn't implement and always throws for. The screen-reader focus/announcement it fed is a no-op on web anyway, so this step is now skipped there entirely. No change on iOS/Android.
