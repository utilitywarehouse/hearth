---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add validation and helper text props to `Select` component

The `Select` component now supports built-in validation messages and helper text through new props: `invalidText`, `validText`, `helperText`, and `helperIcon`. This provides a more integrated validation experience without needing to wrap the component in FormField.

**Components affected**:
- `Select`

**Developer changes**:

You can now add helper text and validation messages directly to Select:

```tsx
import { Select } from '@utilitywarehouse/hearth-react-native';

<Select
  label="Choose an option"
  placeholder="Select an option"
  helperText="This is some helper text for the select component."
  validationStatus="invalid"
  invalidText="Please select a valid option"
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]}
  value={value}
  onValueChange={setValue}
/>
```

The component now also supports a `labelVariant` prop to control label styling:

```tsx
<Select
  label="Choose an option"
  labelVariant="heading"
  // ... other props
/>
```

These new props work seamlessly alongside the existing FormField wrapper if you prefer that approach. No changes are required to existing Select implementations.
