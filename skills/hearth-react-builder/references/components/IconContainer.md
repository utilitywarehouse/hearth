# IconContainer

Coloured container for icons, used in service cards and action lists.

```tsx
import { IconContainer } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `colorScheme` | `'energy'` \| `'mobile'` \| `'broadband'` \| `'insurance'` \| `'cashback'` \| `'pig'` \| `'highlight'` — default `'pig'` |
| `variant` | `'emphasis'` \| `'subtle'` — default `'subtle'` |
| `size` | `'sm'` \| `'md'` \| `'lg'` — responsive, default `'md'` |
| `fill` | `'height'` \| `'width'` \| `'both'` — fills the container instead of fixed size |

```tsx
<IconContainer colorScheme="energy" variant="emphasis">
  <ElectricityMediumIcon />
</IconContainer>

// In a service card (fill="height" requires Card paddingNone)
<Card paddingNone shadowColor="energy">
  <Flex>
    <IconContainer colorScheme="energy" fill="height" borderRadius="none">
      <ElectricityMediumIcon />
    </IconContainer>
    <Flex direction="column" padding="300" gap="100">
      <Heading as="h3" size="sm">Energy</Heading>
    </Flex>
  </Flex>
</Card>
```

**Gotcha:** When using `fill="height"`, the parent `Card` must have `paddingNone` — otherwise the icon container won't reach the card edges.
