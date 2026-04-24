# Grid

CSS Grid layout container. Use for multi-column page layouts and card grids.

```tsx
import { Grid } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `columns` | `'1'`–`'12'` or custom string — responsive |
| `gap` | space token |
| `templateColumns` | string — CSS grid-template-columns value |
| `autoFlow` | `'row'` \| `'column'` \| `'dense'` etc. |
| `defaultResponsiveColumns` | boolean — applies Hearth's default responsive column layout |
| `display` | `'none'` \| `'inline-grid'` \| `'grid'` — responsive |
| `as` | `'div'` \| `'span'` |
| Plus all `Box` props | |

Children can use `gridColumnSpan` / `gridRowSpan` props for spanning.

```tsx
// Fixed 3-column grid
<Grid columns="3" gap="300">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</Grid>

// Responsive grid (Hearth default breakpoints)
<Grid defaultResponsiveColumns gap="300">
  {services.map(service => (
    <Card key={service.id} gridColumnSpan={{ mobile: 'full', tablet: '4', desktop: '3' }}>
      ...
    </Card>
  ))}
</Grid>

// Custom template
<Grid templateColumns="1fr 2fr" gap="400">
  <Box>Sidebar</Box>
  <Box>Main content</Box>
</Grid>
```

`defaultResponsiveColumns` applies Hearth's 4-column mobile / 8-column tablet / 12-column desktop breakpoints automatically.
