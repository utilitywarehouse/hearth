---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add a `background` option for Modal when used inside navigation modals

Modal now supports a `background` prop with `default` and `brand` values. When `background="brand"` is used in a navigation modal, the buttons and close icon invert for contrast, and the content area is scrollable.

**Components affected**:
- `Modal`

**Developer changes**:

No changes required. To opt in to the brand background:

```tsx
<Modal background="brand" inNavModal>
  ...
</Modal>
```
