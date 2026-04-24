# Box

Generic layout block with style props. Use when you need padding, margin, background, or display control without flexbox.

```tsx
import { Box } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `as` | `'div'` \| `'span'` — default `'div'` |
| `asChild` | boolean |
| `display` | `'none'` \| `'inline'` \| `'inline-block'` \| `'block'` — responsive |
| `padding` / `paddingX` / `paddingY` / `paddingTop` etc. | space token |
| `margin` / `marginX` / `marginY` / `marginTop` etc. | space token |
| `width` / `height` / `minWidth` / `maxWidth` etc. | string |
| `backgroundColor` | token |
| `borderRadius` | token |
| `overflow` | `'hidden'` \| `'auto'` \| `'scroll'` \| `'visible'` |

```tsx
<Box padding="400" backgroundColor="secondary" borderRadius="md">
  Content with padding
</Box>

// Hide on mobile
<Box display={{ mobile: 'none', desktop: 'block' }}>
  Desktop-only content
</Box>
```

Prefer [`Flex`](Flex.md) or [`Grid`](Grid.md) for layout that needs alignment or spacing between children.
