# Divider

Horizontal or vertical rule for separating content sections.

```tsx
import { Divider } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `orientation` | `'horizontal'` \| `'vertical'` — default `'horizontal'` |
| `decorative` | boolean — removes from accessibility tree |

```tsx
<Divider />
<Divider orientation="vertical" decorative />
```

**Gotcha:** Don't add a `<Divider>` before `CardActions` — `CardActions` renders its own top separator automatically.
