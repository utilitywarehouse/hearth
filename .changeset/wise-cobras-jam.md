---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add optional vertical resizing to `Textarea`.

`Textarea` now supports a new `resizable` prop that adds a bottom-right drag handle so people can increase the field height when they need more space for longer content.

**Components affected**:
- `Textarea`

**Developer changes**:

No changes are required unless you want to enable resizing for a textarea. To opt in, pass the new `resizable` prop:

```tsx
<Textarea
  label="Additional notes"
  helperText="Drag the corner handle to resize"
  placeholder="Enter your text here..."
  resizable
/>
```