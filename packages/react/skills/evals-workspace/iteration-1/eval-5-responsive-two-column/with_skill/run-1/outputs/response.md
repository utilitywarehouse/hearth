# Responsive Two-Column Layout with hearth-react

Here are two solid approaches for this layout. Both stack vertically on mobile and sit side-by-side on tablet and above. Choose based on how you want to control column widths.

---

## Approach 1: Flex (recommended for equal columns)

Use `Flex` with a responsive `direction` prop. On mobile it flows as a column; at the `tablet` breakpoint it switches to a row. Set `gap` to space the columns and use `flex="1"` on each child so the columns share available space equally.

```tsx
import { Flex, Box } from '@utilitywarehouse/hearth-react';

function TwoColumnLayout() {
  return (
    <Flex
      direction={{ mobile: 'column', tablet: 'row' }}
      gap={{ mobile: '200', tablet: '300' }}
    >
      <Box flex="1">
        <Card />
      </Box>
      <Box flex="1">
        <Card />
      </Box>
    </Flex>
  );
}
```

Key points:
- `direction={{ mobile: 'column', tablet: 'row' }}` — stacks vertically on mobile, horizontal on tablet+.
- Always include `mobile` in a responsive object. Values do not cascade down from larger breakpoints, so omitting `mobile` means no style is applied at mobile size.
- `gap` on the parent handles all spacing between the columns — do not add `margin` to individual siblings.
- `flex="1"` on each `Box` makes both columns equal width regardless of content.

---

## Approach 2: Grid (explicit column control)

`Grid` with `defaultResponsiveColumns` gives you a 4-column grid on mobile and 12 columns on tablet+. Set `gridItemColumns` on each child to span half the grid at each breakpoint.

```tsx
import { Grid, Box } from '@utilitywarehouse/hearth-react';

function TwoColumnLayout() {
  return (
    <Grid defaultResponsiveColumns gap={{ mobile: '200', tablet: '300' }}>
      <Box gridItemColumns={{ mobile: '4', tablet: '6' }}>
        <Card />
      </Box>
      <Box gridItemColumns={{ mobile: '4', tablet: '6' }}>
        <Card />
      </Box>
    </Grid>
  );
}
```

Key points:
- On mobile (4-column grid) each item spans all 4 columns, so they stack.
- On tablet (12-column grid) each item spans 6 columns — exactly half each.
- Use `gridItemColumns` when you need precise control (e.g., a 1/3 + 2/3 split later).

---

## Adding real cards inside the columns

Here is a complete example combining the Flex layout with a card-style column content:

```tsx
import { Flex, Box, Heading, BodyText, Button } from '@utilitywarehouse/hearth-react';

function CardColumn({ title, description }: { title: string; description: string }) {
  return (
    // Card: white background, border radius, padding, shadow via CSS variable
    <Flex
      direction="column"
      gap="300"
      padding="400"
      backgroundColor="white"
      borderRadius="md"
      flex="1"
    >
      <Flex direction="column" gap="100">
        <Heading size="md">{title}</Heading>
        <BodyText>{description}</BodyText>
      </Flex>
      <Button variant="solid" colorScheme="highlight">
        Get started
      </Button>
    </Flex>
  );
}

export default function TwoColumnPage() {
  return (
    <Flex
      direction={{ mobile: 'column', tablet: 'row' }}
      gap={{ mobile: '200', tablet: '300' }}
    >
      <CardColumn
        title="Plan A"
        description="Everything you need to get started."
      />
      <CardColumn
        title="Plan B"
        description="Advanced features for growing teams."
      />
    </Flex>
  );
}
```

---

## Spacing token reference

The `gap` values in the examples map to these tokens:

| Token | Approx CSS value |
|-------|-----------------|
| `100` | 8px             |
| `200` | 16px            |
| `300` | 24px            |
| `400` | 32px            |

Pick the gap that matches your design. A common choice is `200` on mobile and `300` or `400` on tablet.

---

## Wrapping in a page Container

If this layout sits on a page, wrap it in `Container` so it gets correct max-width and gutters:

```tsx
import { Container, Flex, Box } from '@utilitywarehouse/hearth-react';

export default function Page() {
  return (
    <Container spacing="xl">
      <Flex
        direction={{ mobile: 'column', tablet: 'row' }}
        gap={{ mobile: '200', tablet: '300' }}
      >
        <Box flex="1">
          <Card />
        </Box>
        <Box flex="1">
          <Card />
        </Box>
      </Flex>
    </Container>
  );
}
```

---

## Summary

- Use `Flex` with `direction={{ mobile: 'column', tablet: 'row' }}` for the responsive stacking behaviour.
- Always include `mobile` when using responsive prop objects.
- Use `gap` on the parent — never `margin` on individual children — to control the space between columns.
- Use `flex="1"` on each column `Box` to make them equal width.
- Use `Grid` with `defaultResponsiveColumns` if you need finer control over column widths via `gridItemColumns`.
