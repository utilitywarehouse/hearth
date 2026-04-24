# DetailText

Numeric and detail text with a tabular-style type scale. Use for prices, amounts, stats, and data values.

```tsx
import { DetailText } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `as` | `'div'` \| `'span'` \| `'p'` — default `'span'` |
| `size` | `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'` \| `'3xl'` \| `'4xl'` — responsive, default `'md'` |
| `color` | `'text'` \| `'valid'` \| `'invalid'` — default `'text'` |
| `inverted` | boolean — for dark backgrounds |

```tsx
// Price display
<DetailText size="4xl">£110.00</DetailText>

// Smaller data value
<DetailText size="xl">27 kWh</DetailText>

// Valid/invalid states
<DetailText size="lg" color="valid">+£15.00</DetailText>
<DetailText size="lg" color="invalid">-£25.00</DetailText>
```

**Use `DetailText` (not `Heading`) for prices and numeric values.** DetailText uses a tabular figure set that aligns numbers vertically in lists and tables.
