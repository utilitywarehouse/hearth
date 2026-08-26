---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `Modal` loading state squeezed at the bottom on devices with safe area insets

The loading state's content sat flush against the bottom of the sheet (and the home indicator area) instead of respecting the device's bottom safe area inset, most noticeable when `loadingDescription` made the content taller. This affected all loading modals using the default `stickyFooter` behaviour, since no footer is ever shown while `loading` is `true`.

**Components affected**:
- `Modal`
