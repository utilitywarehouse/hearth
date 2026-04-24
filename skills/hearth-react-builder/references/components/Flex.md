# Flex

Flexbox layout container. The primary layout primitive for most component compositions.

```tsx
import { Flex } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `direction` | `'row'` \| `'column'` \| `'row-reverse'` \| `'column-reverse'` — responsive, default `'row'` |
| `gap` | space token — shorthand for `rowGap` + `columnGap` |
| `alignItems` | `'start'` \| `'center'` \| `'end'` \| `'stretch'` \| `'baseline'` — responsive |
| `justifyContent` | `'start'` \| `'center'` \| `'end'` \| `'between'` \| `'around'` \| `'evenly'` — responsive |
| `wrap` | `'nowrap'` \| `'wrap'` \| `'wrap-reverse'` — responsive |
| `display` | `'none'` \| `'inline-flex'` \| `'flex'` — responsive |
| `as` | `'div'` \| `'span'` |
| `asChild` | boolean |
| `spacing` | `'none'` \| `'2xs'` \| `'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'` — shorthand for consistent padding |
| Plus all `Box` props | `padding*`, `margin*`, `width`, `height`, etc. |

```tsx
// Stack with gap
<Flex direction="column" gap="400">
  <Heading as="h2">Title</Heading>
  <BodyText>Description</BodyText>
</Flex>

// Horizontal row, space between
<Flex justifyContent="between" alignItems="center">
  <Heading as="h3">Service</Heading>
  <Badge colorScheme="positive">Active</Badge>
</Flex>

// Responsive direction
<Flex direction={{ mobile: 'column', desktop: 'row' }} gap="300">
  <Button variant="solid">Primary</Button>
  <Button variant="outline">Secondary</Button>
</Flex>
```

**Gotcha:** Use `justifyContent` / `alignItems` on the `Flex` parent to position children — don't use `marginLeft="auto"` on a `Box` child for right-alignment.
