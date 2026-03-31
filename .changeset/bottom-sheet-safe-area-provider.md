---
'@utilitywarehouse/hearth-react-native': patch
---

🌟 [FEATURE]: Add a `useSafeAreaInsets` prop to `BottomSheetModalProvider` to control Hearth's bottom-sheet safe-area spacing.

Bottom-sheet wrappers such as `BottomSheetView`, `BottomSheetScrollView`, `BottomSheetFlatList`, and components that render `SafeAreaView` inside a bottom sheet now respect `BottomSheetModalProvider` configuration.

**Components affected**:
- `BottomSheetModalProvider`
- `BottomSheetView`
- `BottomSheetScrollView`
- `BottomSheetFlatList`
- `Modal`
- `Select`
- `Combobox`

**Developer changes**:

No changes are required if you want the current behaviour. If your app already applies its own safe-area padding around bottom-sheet content, opt out like this:

```tsx
<BottomSheetModalProvider useSafeAreaInsets={false}>
  {/* Your app content */}
</BottomSheetModalProvider>
```