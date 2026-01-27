---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: All `Input` components accessibility improvements and you can now pass a label, helper text and validation to the `Input` component directly.

### Input accessibility improvements and FormField integration

The `Input` component has been updated to internally use `FormField`. This allows you to pass props like `label`, `helperText`, and validation status directly to the `Input` component, streamlining its usage.

We have also greatly improved accessibility behavior. The `Input` component now intelligently constructs `aria-label` and `accessibilityHint` based on the provided label, helper text, and validation state. To support this, `FormField` now has a mechanism to hide its own accessibility elements when a child component is handling them, preventing duplicate announcements.

#### Affected components
- `Input`
- `CurrencyInput`
- `DatePickerInput`
- `Textarea`
- `FormField`

#### Developer changes

You can now use `Input`, `CurrencyInput`, `DatePickerInput`, and `Textarea` without explicitly wrapping them in `FormField` for standard layouts:

```tsx
// Before
<FormField label="Email" helperText="Enter email">
  <Input />
</FormField>

// After
<Input label="Email" helperText="Enter email" />
```

No breaking changes. The `Input` component continues to support being wrapped externally by `FormField`.

#### References
- UWDS-4179
