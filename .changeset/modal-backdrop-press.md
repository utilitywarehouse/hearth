---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `Modal` can be dismissed by pressing the backdrop while `loading`

The `Modal` now ignores backdrop presses while `loading` is `true`.

A new `closeOnBackdropPress` prop controls this behaviour. It defaults to
`true`, or `false` while `loading`. A custom `backdrop` takes precedence over
this prop. Other ways to close the modal, such as swiping down or the Android
back button, are unchanged.

**Components affected**:
- `Modal`

**Developer changes**:

No action is required. To keep a modal open when the backdrop is pressed, or to
allow backdrop presses while loading, set the prop explicitly:

```tsx
<Modal ref={modalRef} closeOnBackdropPress={false}>
  ...
</Modal>
```
