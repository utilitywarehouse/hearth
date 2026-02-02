---
'@utilitywarehouse/hearth-react-native': patch
---

💅 [ENHANCEMENT]: Add style customisation props to `DateInput` component

The `DateInput` component now supports three new style props for customising the appearance of date segments: `inputContainerStyle`, `inputStyle`, and `inputLabelStyle`. This allows for greater flexibility when integrating DateInput into different layouts.

**Components affected**:
- `DateInput`

**Developer changes**:

No changes required. To customise the appearance of date input segments, use the new style props:

```tsx
<DateInput
  label="Custom date input"
  inputContainerStyle={{ maxWidth: 'auto' }}
  inputStyle={{ fontSize: 16 }}
  inputLabelStyle={{ fontWeight: 'bold' }}
/>
```
