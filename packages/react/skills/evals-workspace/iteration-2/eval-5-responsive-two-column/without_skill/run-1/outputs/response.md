# Two-column responsive layout with Cards in hearth-react

You have two good options in hearth-react: `Grid` or `Flex`. `Grid` is the most direct fit for an equal-column layout.

## Option 1: Grid (recommended)

Use the `Grid` component with a responsive `columns` prop. On `mobile` it defaults to a single column (stacking vertically). At `tablet` and above, set `columns="2"` to get two equal-width columns side by side. Use the `gap` prop (which accepts design token spacing values) for the gutter between columns.

```tsx
import { Grid, Card } from '@utilitywarehouse/hearth-react';

<Grid
  columns={{ mobile: '1', tablet: '2' }}
  gap="400"
>
  <Card>
    {/* Column 1 content */}
  </Card>
  <Card>
    {/* Column 2 content */}
  </Card>
</Grid>
```

### How it works

- `columns` accepts a `Responsive` object — keys are breakpoint names (`mobile`, `tablet`, `desktop`, `wide`) and values are applied at that breakpoint and above (mobile-first).
- `columns={{ mobile: '1', tablet: '2' }}` means: 1 column on mobile, 2 equal columns from 740px and above.
- `gap` accepts any spacing token (`'0'`, `'25'`, `'50'`, `'75'`, `'100'`, `'150'`, `'175'`, `'200'`, `'250'`, `'300'`, `'350'`, `'400'`, `'500'`, `'600'`, `'700'`, `'800'`, `'900'`, `'1000'`). `'400'` is a common comfortable gutter.
- By default `Grid` renders as a `div`. You can pass `as="span"` or use `asChild` to render any semantic element.

### Breakpoints reference

| Name      | Min-width |
| --------- | --------- |
| `mobile`  | 0px       |
| `tablet`  | 740px     |
| `desktop` | 992px     |
| `wide`    | 1200px    |

---

## Option 2: Flex with responsive direction

If you prefer flexbox, use the `Flex` component with a responsive `direction` prop — `column` on mobile, `row` on tablet and above — and the `flex` prop on each `Card` to share space equally.

```tsx
import { Flex, Card } from '@utilitywarehouse/hearth-react';

<Flex
  direction={{ mobile: 'column', tablet: 'row' }}
  gap="400"
>
  <Card flex="1">
    {/* Column 1 content */}
  </Card>
  <Card flex="1">
    {/* Column 2 content */}
  </Card>
</Flex>
```

`Card` extends `Flex` internally and accepts flex item props such as `flex`, `flexGrow`, `flexShrink`, and `flexBasis`. Setting `flex="1"` on each card makes them share the available space equally in the row direction.

---

## Grouping cards as a list (accessibility)

The Card docs recommend that when grouping related cards they should be rendered as list items. Use `asChild` on `Grid` or `Flex` to render the correct semantic element:

```tsx
<Grid
  columns={{ mobile: '1', tablet: '2' }}
  gap="400"
  asChild
>
  <ul role="list">
    <li>
      <Card>
        {/* Column 1 content */}
      </Card>
    </li>
    <li>
      <Card>
        {/* Column 2 content */}
      </Card>
    </li>
  </ul>
</Grid>
```

---

## Card props

`Card` is based on `Flex` and accepts layout and sizing props in addition to its own appearance props:

| Prop          | Type                                                                                                                     | Notes                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| `variant`     | `"emphasis" \| "subtle"`                                                                                                 | Default is `"emphasis"`            |
| `colorScheme` | `"neutralStrong" \| "neutralSubtle" \| "brand" \| "energy" \| "broadband" \| "mobile" \| "insurance" \| "cashback" \| "pig" \| "highlight"` | Card background/border colour set |
| `paddingNone` | `boolean`                                                                                                                | Removes default card padding       |
| `shadowColor` | `"brand" \| "energy" \| ...`                                                                                             | Only use on interactive cards      |

Use `CardContent` to wrap inner content when also using `CardActions`:

```tsx
<Card>
  <CardContent>
    <Heading size="sm">Title</Heading>
    <BodyText size="md">Description</BodyText>
  </CardContent>
</Card>
```

---

## Summary

The `Grid` approach is the cleanest for this use case:

```tsx
<Grid columns={{ mobile: '1', tablet: '2' }} gap="400">
  <Card>...</Card>
  <Card>...</Card>
</Grid>
```

- Stacks vertically on mobile (< 740px)
- Two equal columns side by side on tablet and above (>= 740px)
- `gap="400"` adds a consistent gutter between columns (and rows when stacked)
