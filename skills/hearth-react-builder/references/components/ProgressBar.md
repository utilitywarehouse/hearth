# ProgressBar

Linear or circular progress indicator.

```tsx
import { ProgressBar } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `value` | number | Required |
| `label` | string | Required — visually shown by default |
| `variant` | `'linear'` \| `'circular'` | Default `'linear'` |
| `colorScheme` | `'default'` \| `'success'` \| `'danger'` | Default `'default'` |
| `min` | number | Default `0` |
| `max` | number | Default `100` |
| `hideLabel` | boolean | Visually hides the label |
| `size` | `'sm'` \| `'md'` | Circular only, responsive |
| `formatValueText` | `(value: number) => string` | Override percentage display |

```tsx
<ProgressBar value={45} label="Profile completion" />

<ProgressBar
  variant="circular"
  value={75}
  label="Upload progress"
  colorScheme="success"
  hideLabel
/>

<ProgressBar
  value={3}
  min={0}
  max={5}
  label="Step 3 of 5"
  formatValueText={v => `Step ${v} of 5`}
/>
```
