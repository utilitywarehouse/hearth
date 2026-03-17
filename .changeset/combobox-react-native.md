---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add `Combobox` and `SafeAreaView` to the React Native library

The React Native package now includes a `Combobox` component for searchable selection in a bottom sheet, plus a `SafeAreaView` primitive that applies Unistyles runtime insets only when a view actually overlaps a screen edge. `Combobox` supports the built-in options API for fixed lists, controlled search values for dynamic results, and custom bottom sheet content for cases where you need to bring your own `BottomSheetFlatList` or bespoke option layout. `Modal` now uses `SafeAreaView` in its full-screen navigation modal path so content like search inputs no longer sits behind the dynamic island on iOS.

**Components affected**:
- `Combobox`
- `ComboboxOption`
- `SafeAreaView`
- `Modal`

**Developer changes**:

Import the new components from `@utilitywarehouse/hearth-react-native` and choose the API that fits your layout. Use `options` for straightforward searchable lists, render custom sheet content when you need virtualised or dynamic results, and wrap full-screen content in `SafeAreaView` when it should only pick up edge insets if it actually touches that edge.