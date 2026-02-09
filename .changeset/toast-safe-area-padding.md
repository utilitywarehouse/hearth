---
'@utilitywarehouse/hearth-react-native': minor
---

💅 [ENHANCEMENT]: Add `safeAreaPadding` option to `ToastProvider`

`ToastProvider` now supports an optional `safeAreaPadding` prop to control whether toasts respect safe-area inset padding. This can be useful when you want to disable additional safe-area inset space while keeping the base toast padding.

**Components affected**:

- `ToastProvider`

**Developer changes**:

No changes required. To disable safe-area inset padding (while preserving the base bottom padding), set `safeAreaPadding` to `false`:

```tsx
<ToastProvider safeAreaPadding={false}>
  {children}
</ToastProvider>
```
