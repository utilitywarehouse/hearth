# Badge

Small label for status, counts, or category tags.

```tsx
import { Badge } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `colorScheme` | `'info'` \| `'positive'` \| `'warning'` \| `'danger'` \| `'neutral'` |

```tsx
<Badge colorScheme="info">Smart meter</Badge>
<Badge colorScheme="positive">Active</Badge>
<Badge colorScheme="warning">Review needed</Badge>
<Badge colorScheme="danger">Overdue</Badge>
<Badge colorScheme="neutral">Pending</Badge>
```

Commonly used inside `CardActionLink`'s `badge` prop:
```tsx
<CardActionLink
  heading="Electricity"
  badge={<Badge colorScheme="info">Smart meter</Badge>}
  badgePlacement="middle"
  href="/electricity"
/>
```
