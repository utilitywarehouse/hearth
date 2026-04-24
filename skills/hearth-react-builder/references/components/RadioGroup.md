# RadioGroup / RadioTile / RadioCard

## RadioGroup

Group of radio buttons — single selection only.

```tsx
import { RadioGroup, RadioTile } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `name` | string | **Required** — must be shared across all radios |
| `label` | string or React node | Can pass `<Heading>` for custom styling |
| `helperText` | string | |
| `defaultValue` | string | |
| `value` | string — controlled | |
| `onValueChange` | `(value: string) => void` | |
| `direction` | `'column'` \| `'row'` or responsive | |
| `validationStatus` | `'valid'` \| `'invalid'` | |
| `validationText` | string | |

**RadioTile additional props:** `badge`, `helperText`, `image`, `flex`

```tsx
<RadioGroup name="payment" label="How would you like to pay?" defaultValue="card">
  <RadioTile value="card" label="Debit card" />
  <RadioTile value="bank" label="Bank transfer" />
  <RadioTile value="wallet" label="Cashback card" badge={<Badge colorScheme="info">Popular</Badge>} />
</RadioGroup>

// Responsive direction
<RadioGroup
  name="plan"
  label={<Heading as="h3" size="md">Choose a plan</Heading>}
  direction={{ mobile: 'column', tablet: 'row' }}
>
  <RadioTile value="monthly" label="Monthly" helperText="Pay each month" />
  <RadioTile value="annual" label="Annual" helperText="Save 20%" />
</RadioGroup>
```

**Gotcha:** `name` is required and must be identical across all radio items in the group.

---

## RadioCard

Rich selection card with arbitrary content inside. Use for plans, tariffs, and offers where options need more than a label.

```tsx
import { RadioGroup, RadioCard } from '@utilitywarehouse/hearth-react';

<RadioGroup name="plan" defaultValue="fixed">
  <RadioCard value="fixed" label="Fixed plan" image={<FixedIcon />}>
    <BodyText size="sm">Your rates stay the same until December 2025</BodyText>
    <DetailText size="3xl">£163.00</DetailText>
  </RadioCard>
  <RadioCard value="variable" label="Variable plan" image={<VariableIcon />}>
    <BodyText size="sm">Rates may change with the market</BodyText>
    <DetailText size="3xl">£153.00</DetailText>
  </RadioCard>
</RadioGroup>
```
