# Responsive Two-Column Layout with Cards

Use the `Grid` component with `defaultResponsiveColumns` and responsive `gridColumnSpan` on
each column. On mobile, each column spans all 4 grid columns (stacking vertically). On tablet
and above, each column spans 4 of the 8 available columns, placing them side by side with equal
widths.

```tsx
import { Grid, Box, Flex, Heading, BodyText } from '@utilitywarehouse/hearth-react';

<Grid defaultResponsiveColumns gap={{ mobile: '200', tablet: '300' }}>
  <Box gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '6' }}>
    {/* Card one */}
    <Flex direction="column" gap="200" padding="300">
      <Heading size="md">Card One</Heading>
      <BodyText>Content for the first card.</BodyText>
    </Flex>
  </Box>
  <Box gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '6' }}>
    {/* Card two */}
    <Flex direction="column" gap="200" padding="300">
      <Heading size="md">Card Two</Heading>
      <BodyText>Content for the second card.</BodyText>
    </Flex>
  </Box>
</Grid>
```

## How it works

`defaultResponsiveColumns` sets up a responsive grid with:
- 4 columns on mobile
- 8 columns on tablet
- 12 columns on desktop and wide

Each `Box` uses `gridColumnSpan` to control how many columns it occupies at each breakpoint:

| Breakpoint | Columns available | `gridColumnSpan` | Result |
|---|---|---|---|
| mobile | 4 | `'4'` | Full width — columns stack vertically |
| tablet | 8 | `'4'` | Half width each — side by side |
| desktop | 12 | `'6'` | Half width each — side by side |

The `gap` prop on `Grid` controls the space between the columns. Use a responsive value to
adjust it across breakpoints, as shown above.

## Key rules to follow

**Always include `mobile` in responsive prop objects.** Values are mobile-first and cascade
upward, not downward. An object without `mobile` applies nothing at mobile size:

```tsx
// WRONG — no column span applied at mobile
<Box gridColumnSpan={{ tablet: '4' }} />

// CORRECT
<Box gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '6' }} />
```

**Use `gap` on the `Grid` parent, not margins on child `Box` elements**, to create space
between the columns.

**Space tokens are strings**, not numbers. Use `'200'`, `'300'`, etc. — not `200` or `'16px'`.

## Alternative: Flex approach

If you prefer `Flex` over `Grid`, you can switch direction responsively:

```tsx
<Flex
  direction={{ mobile: 'column', tablet: 'row' }}
  gap={{ mobile: '200', tablet: '300' }}
>
  <Box flex="1">
    {/* Card one */}
  </Box>
  <Box flex="1">
    {/* Card two */}
  </Box>
</Flex>
```

This uses `direction={{ mobile: 'column', tablet: 'row' }}` to stack vertically on mobile and
go side by side on tablet and above. `flex="1"` on each child makes the columns equal width.
The `Grid` approach is generally preferred for grid-based layouts, but `Flex` is a valid choice
when the layout is purely one-dimensional.
