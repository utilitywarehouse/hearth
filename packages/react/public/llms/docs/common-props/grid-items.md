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

| Prop              | Type                                                                                                             | Default | Description |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- | ------- | ----------- |
| `gridColumnSpan`  | `Responsive<Union<string, "1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12">>` | —       |             |
| `gridArea`        | `Responsive<string>`                                                                                             | —       |             |
| `gridColumn`      | `Responsive<string>`                                                                                             | —       |             |
| `gridColumnStart` | `Responsive<string>`                                                                                             | —       |             |
| `gridColumnEnd`   | `Responsive<string>`                                                                                             | —       |             |
| `gridRow`         | `Responsive<string>`                                                                                             | —       |             |
| `gridRowStart`    | `Responsive<string>`                                                                                             | —       |             |
| `gridRowEnd`      | `Responsive<string>`                                                                                             | —       |             |
