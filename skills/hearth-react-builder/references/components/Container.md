# Container

Page-level content wrapper that constrains width and handles horizontal alignment.

```tsx
import { Container } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `align` | `'start'` \| `'center'` \| `'end'` — responsive, horizontal alignment |
| Plus `Flex` props | `direction`, `gap`, `padding`, etc. (excludes `as`, color, border, grid-item props) |

```tsx
// Standard page layout
<Container align="center" direction="column" gap="400">
  <Heading as="h1">Your account</Heading>
  <Grid defaultResponsiveColumns gap="300">
    ...
  </Grid>
</Container>
```

`Container` is a `Flex` with `display="flex"` and `direction="column"` by default. Use it at the page root to centre content and apply consistent max-width constraints from Hearth's design tokens.
