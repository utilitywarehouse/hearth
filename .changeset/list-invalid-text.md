---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add `invalidText` prop to `List` component

The `List` component now supports an `invalidText` prop for displaying validation error messages in the section header. This provides consistent validation feedback across list-based forms and grouped content.

**Components affected**:
- `List`

**Developer changes**:

Use the `invalidText` prop to display validation errors:

```tsx
<List
  heading="Payment methods"
  helperText="Select at least one payment method"
  invalidText="You must select a payment method"
>
  <ListItem heading="Credit card" />
  <ListItem heading="Direct debit" />
</List>
```
