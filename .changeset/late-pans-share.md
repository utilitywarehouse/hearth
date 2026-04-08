---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add `numberOfLines` support to `Badge` text.

`Badge` now renders its text content on a single line by default and supports a new `numberOfLines` prop when you want to allow more lines.

**Components affected**:
- `Badge`

**Developer changes**:

No changes are required unless you want a `Badge` to wrap onto more than one line. To opt in, pass `numberOfLines`:

```tsx
<Badge numberOfLines={2} text="Long badge text that can wrap onto a second line" />
```
