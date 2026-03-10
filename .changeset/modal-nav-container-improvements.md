---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [ENHANCEMENT]: Improve `Modal` behaviour when used inside a React Navigation modal (`inNavModal`).

The following improvements have been made to the `Modal` component when used in a navigation context with `inNavModal={true}`:

- **`scrollable` prop**: Content is now rendered inside a `ScrollView` by default. Set `scrollable={false}` to opt out, for example when you need to centre content or use a custom layout.
- **`stickyFooter` support**: The `stickyFooter` prop now works correctly in `inNavModal` mode.
- **Auto full-screen detection**: When the modal fills the entire screen (e.g. with `presentation: 'fullScreenModal'`), the `fullscreen` style is applied automatically. The `fullscreen` prop is no longer available when `inNavModal` is `true`.

**Components affected**:
- `Modal`

**Developer changes**:

No changes are required for existing usage. If you were passing `fullscreen` alongside `inNavModal={true}`, remove the `fullscreen` prop — full-screen styling is now detected automatically:

```diff
- <Modal inNavModal fullscreen>
+ <Modal inNavModal>
```

To disable the default `ScrollView` wrapping in `inNavModal` mode:

```tsx
<Modal inNavModal scrollable={false}>
  {/* custom layout */}
</Modal>
```
