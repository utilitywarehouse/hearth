# Grid

```tsx
<Grid {...args}>
  <Placeholder padding="400" />
  <Placeholder padding="400" />
  <Placeholder padding="400" />
  <Placeholder padding="400" />
  <Placeholder padding="400" />
  <Placeholder padding="400" />
</Grid>
```

## Alternatives

- Box - For primitive styling and layouts
- Container - For page content, with default
  responsive padding & gutters
- Flex - For stacked, inline or flexbox based
  layouts

## Gap

`Grid` supports the `gap`, `columnGap` and `rowGap` properties, which use the
design token spacing scale. All gap properties are repsonsive.

```tsx
<Grid columnGap="400" rowGap={{ mobile: "100", desktop: "300" }}>
```

## Columns

The `Grid` component also supports a custom `columns` prop, which can
responsively set the number of grid columns.

```tsx
<Grid
  defaultResponsiveColumns // columns={{ mobile: '4', tablet: '8', desktop: '12' }}
  width={{ mobile: '360px', tablet: '744px', desktop: '1096px' }}
  padding={{ mobile: '200', tablet: '400' }}
  gap="200"
>
  <Placeholder gridColumnSpan="4" padding="400" />
  <Placeholder gridColumnSpan="4" padding="400" />
  <Placeholder gridColumnSpan={{ mobile: '4', tablet: '8', desktop: '4' }} padding="400" />
</Grid>
```

```tsx
<Grid
  columns={{ mobile: '4', tablet: '8', desktop: '12' }}
  padding={{ mobile: '200', tablet: '400' }}
  gap="200"
>
  <Box gridColumnSpan="4" />
  <Box gridColumnSpan="4" />
  <Box gridColumnSpan={{ mobile: '4', tablet: '8', desktop: '4' }} padding="400" />
</Grid>
```

### Default Columns

In an effort to be more explicit about the behaviour of the `Grid` component,
there are no default columns set. You can, however, use the
`defaultResponsiveColumns` prop to set our recommended responsive columns:

- 4 columns on `mobile`
- 8 columns on `tablet`
- 12 columns on `desktop` and `wide`

```tsx
<Grid defaultResponsiveColumns>
  {...}
</Grid>
```

## Spacing

As well as `gap`, there is a `spacing` prop which uses a smaller scale, already
optimised for responsive design. This prop will be overridden by the `gap`
prop.

```tsx
<Grid spacing="lg">
```

## Grid Items

Where the `Grid` component is considered the grid parent, or grid container,
all primitive layout components can be used as grid items, or grid children,
and support props to control their behaviour when they are the child of a
`Grid` component.

```tsx
<Grid>
  <Grid gridArea="header">

  <Box gridColumn="1 / 3" />

  <Flex gridColumnEnd={{ mobile: "-1", tablet: "3", desktop: "auto" }} />
</Grid>
```

## Semantic HTML

By default `Grid` renders a `div` element, this can be customised using the
`as` prop, to render a `span`.

```tsx
<Grid as="span">...</Grid>
```

To render any other valid HTML element, you can use the `asChild` prop.

```tsx
<Grid asChild>
  <main>...</main>
</Grid>
```

This will render the child element, with all the styles declared on the `Grid`
component passed down to it as well.

## API

This component is based on the `div` element and supports the following common style props:

- AlignSelf
- Gap
- Padding
- Margin
- Position
- Size
- Colour
- Background colour
- Border colour
- Spacing
- Border
- Flex item
- Grid item
- Text align
- Text transform
- Z-Index
- Overflow
- Opacity
- Order

| Prop              | Type                                                                                                             | Default | Description                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `template`        | `Responsive<string>`                                                                                             | —       | Shorthand for the full `grid-template` property. Supports responsive values.                                                                           |
| `display`         | `Responsive<"none" \| "inline-grid" \| "grid">`                                                                  | —       | Controls the `display` behavior of the grid container.                                                                                                 |
| `columns`         | `Responsive<Union<string, "1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12">>` | —       | Shorthand for configuring columns using the 12-column system or a custom `grid-template-columns` string. Supports responsive values.                   |
| `templateColumns` | `Responsive<string>`                                                                                             | —       | Maps to `grid-template-columns`. Supports responsive values.                                                                                           |
| `templateRows`    | `Responsive<string>`                                                                                             | —       | Maps to `grid-template-rows`. Supports responsive values.                                                                                              |
| `templateAreas`   | `Responsive<string>`                                                                                             | —       | Maps to `grid-template-areas`. Supports responsive values.                                                                                             |
| `autoFlow`        | `Responsive<"row" \| "column" \| "dense" \| "row-dense" \| "column-dense">`                                      | —       | Maps to `grid-auto-flow`. Supports responsive values.                                                                                                  |
| `autoRows`        | `Responsive<string>`                                                                                             | —       | Maps to `grid-auto-rows`. Supports responsive values.                                                                                                  |
| `autoColumns`     | `Responsive<string>`                                                                                             | —       | Maps to `grid-auto-columns`. Supports responsive values.                                                                                               |
| `justifyItems`    | `Responsive<"center" \| "start" \| "end" \| "stretch">`                                                          | —       | Maps to `justify-items`. Supports responsive values.                                                                                                   |
| `alignContent`    | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                     | —       |                                                                                                                                                        |
| `alignItems`      | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "baseline">`                                            | —       |                                                                                                                                                        |
| `justifyContent`  | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                     | —       | For flexboxes, the stretch value behaves as flex-start or start. This is because, in flexboxes, stretching is controlled using the flex-grow property. |
