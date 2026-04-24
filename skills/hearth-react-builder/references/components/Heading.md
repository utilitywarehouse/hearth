# Heading

Semantic headings with design system type scale.

```tsx
import { Heading } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `as` | `'h1'` \| `'h2'` \| `'h3'` \| `'h4'` — default `'h2'` |
| `size` | `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'` — responsive, default `'md'` |
| `inverted` | boolean — for use on dark backgrounds |
| `textAlign` | `'left'` \| `'center'` \| `'right'` — responsive |

```tsx
<Heading as="h1" size="2xl">Page title</Heading>
<Heading as="h2" size="lg">Section title</Heading>
<Heading as="h3" size="md">Card heading</Heading>
<Heading as="h4" size="sm">Sub-section</Heading>
```

**Always set `as` to the correct semantic level.** `size` controls visual appearance independently of the heading level — use this to make an `h3` look like a large heading without skipping levels in the DOM.
