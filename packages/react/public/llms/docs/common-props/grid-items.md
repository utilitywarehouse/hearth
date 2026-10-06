# Grid items

Grid item props enable styling on components when they are children of a grid
container.

The `gridColumnSpan` prop accepts one of a predefined set of grid
column span steps, the other grid item props accept any valid CSS grid value
for the relevant prop.

```tsx
<Grid>
  <Box gridColumnSpan="4" />
  <Box gridColumn="1 / 3" />
  <Box gridRowStart="2" />
  <Box gridColumnEnd={{ mobile: '-1', tablet: '3', desktop: 'auto' }} />
</Grid>
```

| Prop              | Type                                                                                                             | Default | Description                                                                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gridColumnSpan`  | `Responsive<Union<string, "1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12">>` | —       | Set the number of grid columns this item spans. Supports responsive values.                                                                             |
| `gridArea`        | `Responsive<string>`                                                                                             | —       | Shorthand for `grid-row-start`, `grid-column-start`, `grid-row-end` and `grid-column-end`, placing an item within a named grid area or by line numbers. |
| `gridColumn`      | `Responsive<string>`                                                                                             | —       | Shorthand for `grid-column-start` and `grid-column-end`, setting an item's size and location within the grid column.                                    |
| `gridColumnStart` | `Responsive<string>`                                                                                             | —       | Set an item's starting line within the grid column.                                                                                                     |
| `gridColumnEnd`   | `Responsive<string>`                                                                                             | —       | Set an item's ending line within the grid column.                                                                                                       |
| `gridRow`         | `Responsive<string>`                                                                                             | —       | Shorthand for `grid-row-start` and `grid-row-end`, setting an item's size and location within the grid row.                                             |
| `gridRowStart`    | `Responsive<string>`                                                                                             | —       | Set an item's starting line within the grid row.                                                                                                        |
| `gridRowEnd`      | `Responsive<string>`                                                                                             | —       | Set an item's ending line within the grid row.                                                                                                          |
