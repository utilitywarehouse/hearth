# TextInput / InputSlot

## TextInput

The standard text input. Includes built-in label, helper text, and validation.

```tsx
import { TextInput, InputSlot } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `label` | string | Required for accessibility |
| `hideLabel` | boolean | Visually hides label, keeps it for screen readers |
| `placeholder` | string | |
| `helperText` | string | Informational text below input |
| `validationStatus` | `'valid'` \| `'invalid'` | |
| `validationText` | string | Error/success message shown below input |
| `type` | `'text'` \| `'email'` \| `'number'` \| `'search'` \| `'tel'` \| `'url'` | |
| `disabled` | boolean | |
| `readOnly` | boolean | |
| `required` | boolean | |
| `children` | `InputSlot` | Prefix/suffix slot only |

```tsx
// Basic
<TextInput label="Email" type="email" placeholder="you@example.com" />

// With validation
<TextInput
  label="Email"
  type="email"
  validationStatus="invalid"
  validationText="Please enter a valid email address"
  required
/>

// With helper text
<TextInput label="Phone" type="tel" helperText="UK numbers only, e.g. 07700 900000" />

// With prefix icon
<TextInput label="Email">
  <InputSlot placement="prefix"><EmailMediumIcon /></InputSlot>
</TextInput>

// With prefix/suffix text
<TextInput label="Price">
  <InputSlot placement="prefix">
    <BodyText size="md" weight="semibold">£</BodyText>
  </InputSlot>
</TextInput>

// React Hook Form
<Controller
  name="email"
  control={control}
  render={({ field, fieldState }) => (
    <TextInput
      {...field}
      label="Email"
      type="email"
      validationStatus={fieldState.error ? 'invalid' : undefined}
      validationText={fieldState.error?.message}
    />
  )}
/>
```

**Accessibility:**
- `label` is required — always provide one (use `hideLabel` if it must be visually hidden)
- `validationStatus="invalid"` automatically sets `aria-invalid` and links `validationText` via `aria-errormessage`
- `helperText` and `validationText` are automatically wired via `aria-describedby`

**Gotchas:**
- Validation is hidden when the input is `disabled` or `readOnly`
- `children` must be `InputSlot` — other children won't render
- Don't use `type="password"` — use [`PasswordInput`](PasswordInput.md) instead

---

## InputSlot

Adds prefix or suffix content inside `TextInput`.

| Prop | Values |
|---|---|
| `placement` | `'prefix'` \| `'suffix'` |

Must be a direct child of `TextInput`. Accepts icons, text, or other inline elements.
