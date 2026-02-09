---
'@utilitywarehouse/hearth-react-native': minor
---

💅 [ENHANCEMENT]: Add `safeAreaPadding` option to `ToastProvider`

`ToastProvider` now supports an optional `safeAreaPadding` prop to control whether toasts respect safe-area insets. This can be useful when you need edge-to-edge toast placement.

**Components affected**:
- `ToastProvider`

**Developer changes**:

No changes required. To disable safe-area padding, set `safeAreaPadding` to `false`:

```tsx
<ToastProvider safeAreaPadding={false}>
  {children}
</ToastProvider>
```
