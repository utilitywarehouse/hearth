# Select / SelectItem

Dropdown for choosing one option from a list. For 20+ items or searchable dropdowns, use [`Combobox`](Combobox.md) instead.

```tsx
import { Select, SelectItem } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `label` | string |
| `labelVariant` | `'body'` \| `'heading'` |
| `placeholder` | string |
| `helperText` | string |
| `validationStatus` | `'valid'` \| `'invalid'` |
| `validationText` | string |
| `disabled` | boolean |
| `required` | boolean |
| `defaultValue` | string |
| `value` | string — controlled |
| `onValueChange` | `(value: string) => void` |

```tsx
<Select label="Country" placeholder="Select a country">
  <SelectItem value="gb">United Kingdom</SelectItem>
  <SelectItem value="ie">Ireland</SelectItem>
  <SelectItem value="au" disabled>Australia (unavailable)</SelectItem>
</Select>

// React Hook Form
<Controller
  name="contactMethod"
  control={control}
  render={({ field, fieldState }) => (
    <Select
      label="Preferred contact method"
      placeholder="Select a method"
      value={field.value ?? ''}
      onValueChange={field.onChange}
      validationStatus={fieldState.error ? 'invalid' : undefined}
      validationText={fieldState.error?.message}
    >
      <SelectItem value="email">Email</SelectItem>
      <SelectItem value="sms">SMS</SelectItem>
      <SelectItem value="post">Post</SelectItem>
    </Select>
  )}
/>
```
