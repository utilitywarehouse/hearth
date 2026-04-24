# Checkbox / CheckboxGroup / CheckboxTile

## Checkbox

Standalone checkbox.

```tsx
import { Checkbox } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `label` | string |
| `helperText` | string |
| `value` | string |
| `checked` | boolean |
| `onCheckedChange` | `(checked: boolean) => void` |
| `disabled` | boolean |
| `validationStatus` | `'invalid'` |
| `validationText` | string |
| `image` | React node |

```tsx
<Checkbox label="I agree to the terms and conditions" value="agreed" />

<Checkbox
  label="Marketing emails"
  helperText="We'll send you occasional updates"
  value="marketing"
/>
```

**Accessibility:** Provide either `label` or `aria-label` — never leave a checkbox unlabelled.

---

## CheckboxGroup / CheckboxTile

Group of related checkboxes allowing multiple selections.

```tsx
import { CheckboxGroup, CheckboxTile } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `name` | string |
| `label` | string or React node |
| `helperText` | string |
| `defaultValue` | `string[]` |
| `value` | `string[]` — controlled |
| `onValueChange` | `(values: string[]) => void` |
| `direction` | `'column'` \| `'row'` |
| `validationStatus` | `'valid'` \| `'invalid'` |
| `validationText` | string |

```tsx
<CheckboxGroup name="services" label="Which services do you have?">
  <CheckboxTile value="energy" label="Energy" helperText="Gas & Electricity" />
  <CheckboxTile value="broadband" label="Broadband" />
  <CheckboxTile value="mobile" label="Mobile" />
</CheckboxGroup>

// Row layout
<CheckboxGroup name="preferences" label="Preferences" direction="row">
  <CheckboxTile value="emails" label="Emails" />
  <CheckboxTile value="sms" label="SMS" />
</CheckboxGroup>
```

Use `CheckboxTile` as children of `CheckboxGroup` — `CheckboxTile` has the same props as `Checkbox` with enhanced visual presentation.
