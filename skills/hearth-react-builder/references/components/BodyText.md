# BodyText

General body copy. The default text component for most content.

```tsx
import { BodyText } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `as` | `'p'` \| `'div'` \| `'span'` \| `'label'` — default `'p'` |
| `size` | `'sm'` \| `'md'` \| `'lg'` — responsive, default `'md'` |
| `weight` | `'regular'` \| `'semibold'` \| `'bold'` — responsive |
| `truncate` | boolean — single-line ellipsis |
| `paragraphSpacing` | boolean — adds bottom margin for prose |
| `inverted` | boolean — for dark backgrounds |

```tsx
<BodyText>Default body text</BodyText>
<BodyText size="sm" weight="semibold">Label-like text</BodyText>
<BodyText size="lg">Intro paragraph</BodyText>

// Truncated single line
<BodyText truncate>Very long text that will be cut off with an ellipsis</BodyText>
```
