# Selections

## Checkbox

Standalone checkbox. For multiple related checkboxes, use `CheckboxGroup`.

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
| `image` | React node — icon/image beside label |
| `aria-label` | string — required if no `label` prop |

```tsx
<Checkbox label="I agree to the terms and conditions" value="agreed" />

// With helper text
<Checkbox
  label="Marketing emails"
  helperText="We'll send you occasional updates"
  value="marketing"
/>

// With validation
<Checkbox
  label="Required checkbox"
  validationStatus="invalid"
  validationText="You must accept before continuing"
/>

// With image
<Checkbox
  label="Mastercard"
  value="mastercard"
  image={<img src={mastercardLogo} width={40} alt="" />}
/>
```

**Accessibility:** Provide either `label` or `aria-label` — never leave a checkbox unlabelled.

---

## CheckboxGroup

Group of related checkboxes allowing multiple selections.

```tsx
import { CheckboxGroup, CheckboxTile } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `name` | string — form input name |
| `label` | string or React node |
| `helperText` | string |
| `defaultValue` | `string[]` |
| `value` | `string[]` — controlled |
| `onValueChange` | `(values: string[]) => void` |
| `direction` | `'column'` \| `'row'` |
| `validationStatus` | `'valid'` \| `'invalid'` |
| `validationText` | string |
| `disabled` | boolean |
| `contentWidth` | string — width constraint on children |

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

// Controlled
<CheckboxGroup
  name="services"
  label="Services"
  value={selectedServices}
  onValueChange={setSelectedServices}
>
  <CheckboxTile value="energy" label="Energy" />
  <CheckboxTile value="broadband" label="Broadband" />
</CheckboxGroup>
```

**CheckboxTile** accepts the same props as `Checkbox` plus enhanced visual presentation. Use `CheckboxTile` as children of `CheckboxGroup`.

---

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
| `disabled` | boolean | |

**RadioTile additional props:**
- `badge` — React node, shown in the corner
- `helperText` — tile-level helper text
- `image` — icon/image beside label
- `flex` — CSS flex value

```tsx
<RadioGroup name="payment" label="How would you like to pay?" defaultValue="card">
  <RadioTile value="card" label="Debit card" />
  <RadioTile value="bank" label="Bank transfer" />
  <RadioTile
    value="wallet"
    label="Cashback card"
    badge={<Badge colorScheme="info">Popular</Badge>}
  />
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

**Accessibility:** `name` is required and must be identical across all radio items in the group.

**Gotcha:** You cannot deselect a radio unless the group is uncontrolled and `collapsible` is supported.

---

## RadioCard

Rich selection card — like `RadioTile` but with arbitrary content inside.

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

Use `RadioCard` when selection options need rich content (plans, tariffs, offers).

---

## Select

Dropdown select for choosing one option from a list.

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
  <SelectItem value="us">United States</SelectItem>
  <SelectItem value="au" disabled>Australia (unavailable)</SelectItem>
</Select>

// With validation
<Select
  label="Property type"
  required
  validationStatus={errors.type ? 'invalid' : undefined}
  validationText={errors.type?.message}
>
  <SelectItem value="house">House</SelectItem>
  <SelectItem value="flat">Flat</SelectItem>
</Select>
```

**Gotcha:** For 20+ items or searchable dropdowns, use `Combobox` instead.

---

## Switch

Toggle for binary on/off settings.

```tsx
import { Switch } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `size` | `'sm'` \| `'md'` | Responsive |
| `checked` | boolean | Controlled |
| `onCheckedChange` | `(checked: boolean) => void` | |
| `disabled` | boolean | |
| `label` | string | Optional visible label |
| `aria-label` | string | Required if no `label` |

```tsx
// With label prop
<Switch label="Enable notifications" />

// With external label element
<Flex gap="200" alignItems="center">
  <BodyText as="label" htmlFor="airplane-mode">Airplane mode</BodyText>
  <Switch id="airplane-mode" aria-label="Airplane mode" />
</Flex>

// Controlled
<Switch
  label="Dark mode"
  checked={darkMode}
  onCheckedChange={setDarkMode}
/>

// Responsive size
<Switch size={{ mobile: 'sm', desktop: 'md' }} label="Notifications" />
```

**Accessibility:** Always provide either `label` or `aria-label` — a switch without a label is inaccessible.

---

## ToggleGroup & ToggleButtonCard

Visually rich toggle selection — use for tariff pickers, plan selectors, and option cards.

```tsx
import { ToggleGroup, ToggleButtonCard } from '@utilitywarehouse/hearth-react';
```

**ToggleGroup props:**

| Prop | Values |
|---|---|
| `type` | `'single'` \| `'multiple'` |
| `value` | `string` or `string[]` — controlled |
| `onValueChange` | `(value: string | string[]) => void` |
| `defaultValue` | `string` or `string[]` |
| `gap` | space token |
| `direction` | `'column'` \| `'row'` or responsive |

**ToggleButtonCard props:**

| Prop | Values |
|---|---|
| `value` | string |
| `label` | string — **required** accessible name |
| `aria-labelledby` | string — IDs of visible heading elements |
| `aria-describedby` | string — IDs of description elements |
| `alignItems` | `'start'` \| `'center'` |

```tsx
// Tariff picker (single)
<ToggleGroup type="single" value={selected} onValueChange={setSelected}>
  <ToggleButtonCard
    value="fixed"
    label="Fixed plan"
    aria-labelledby="fixed-heading"
    aria-describedby="fixed-desc"
  >
    <Heading as="h3" id="fixed-heading" size="sm">Fixed</Heading>
    <DetailText size="3xl">£163.00</DetailText>
    <BodyText id="fixed-desc" size="sm">Rates stay the same until December 2025</BodyText>
  </ToggleButtonCard>
  <ToggleButtonCard
    value="variable"
    label="Variable plan"
    aria-labelledby="variable-heading"
  >
    <Heading as="h3" id="variable-heading" size="sm">Variable</Heading>
    <DetailText size="3xl">£153.00</DetailText>
  </ToggleButtonCard>
</ToggleGroup>
```

**Accessibility:**
- `label` is required — it's the accessible name read by screen readers even if visually hidden
- Use `aria-labelledby` to point at the visible heading inside the card
- Use `aria-describedby` for supplementary description text

**Gotcha:** Use `ToggleButtonCard` for visually complex selections. For simple text options, `RadioGroup` is more appropriate.
