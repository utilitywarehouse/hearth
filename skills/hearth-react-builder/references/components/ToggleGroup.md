# ToggleGroup / ToggleButtonCard

Visually rich toggle selection — use for tariff pickers, plan selectors, and option cards where [`RadioGroup`](RadioGroup.md) is too simple visually.

```tsx
import { ToggleGroup, ToggleButtonCard } from '@utilitywarehouse/hearth-react';
```

**ToggleGroup props:**

| Prop | Values |
|---|---|
| `type` | `'single'` \| `'multiple'` |
| `value` | `string` or `string[]` — controlled |
| `onValueChange` | `(value: string \| string[]) => void` |
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
  <ToggleButtonCard value="variable" label="Variable plan" aria-labelledby="variable-heading">
    <Heading as="h3" id="variable-heading" size="sm">Variable</Heading>
    <DetailText size="3xl">£153.00</DetailText>
  </ToggleButtonCard>
</ToggleGroup>
```

**Accessibility:**
- `label` is required — it's the accessible name read by screen readers even if visually hidden
- Use `aria-labelledby` to point at the visible heading inside the card
- Use `aria-describedby` for supplementary description text
