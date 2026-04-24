# Spinner

Loading indicator.

```tsx
import { Spinner } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `size` | `'xs'` \| `'sm'` \| `'md'` \| `'lg'` — responsive, default `'md'` |
| `color` | `'primary'` \| `'secondary'` \| `'brand'` \| `'inverted'` |
| `currentColor` | boolean — inherits parent's colour |

```tsx
<Spinner />
<Spinner size="sm" color="brand" />

// Inside a button (inherits button's color)
<Button disabled>
  <Spinner currentColor size="xs" />
  Saving...
</Button>
```

**Accessibility:** Always pair a `Spinner` with visible or screen-reader text so users know what's loading. The spinner itself has no accessible label.
