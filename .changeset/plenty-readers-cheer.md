---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Adds `labelVariant` prop to components with a label

# Adds `labelVariant` prop to components with a label

Added a `labelVariant` prop to allow consumers to choose between a body or heading style for component labels. Defaults to `body`.

**Components affected**:

- `CheckboxGroup`
- `FormField`
- `Label`
- `RadioGroup`
- `RadioCard`
- `Select`
- `VerificationInput`

**Developer changes**:

You can now pass `labelVariant="heading"` to these components to render the label as a heading instead of body text.

```tsx
<FormField label="My Label" labelVariant="heading">
  <Input />
</FormField>
```

