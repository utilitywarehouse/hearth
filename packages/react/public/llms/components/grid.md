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

| Prop                          | Type                                                                                                                                                                                                       | Default | Description                                                                                                                                            |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `template`                    | `Responsive<string>`                                                                                                                                                                                       | —       | Shorthand for the full `grid-template` property. Supports responsive values.                                                                           |
| `asChild`                     | `boolean`                                                                                                                                                                                                  | —       | When `true`, renders the Grid as a `Slot` so that its props are forwarded to the child element instead of rendering a DOM node.                        |
| `defaultResponsiveColumns`    | `boolean`                                                                                                                                                                                                  | —       | When `true`, applies a default responsive column configuration (typically a single column on small screens and multiple columns on larger screens).    |
| `display`                     | `Responsive<"none" \| "inline-grid" \| "grid">`                                                                                                                                                            | —       | Controls the `display` behavior of the grid container.                                                                                                 |
| `columns`                     | `Responsive<Union<string, "1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12">>`                                                                                           | —       | Shorthand for configuring columns using the 12-column system or a custom `grid-template-columns` string. Supports responsive values.                   |
| `templateColumns`             | `Responsive<string>`                                                                                                                                                                                       | —       | Maps to `grid-template-columns`. Supports responsive values.                                                                                           |
| `templateRows`                | `Responsive<string>`                                                                                                                                                                                       | —       | Maps to `grid-template-rows`. Supports responsive values.                                                                                              |
| `templateAreas`               | `Responsive<string>`                                                                                                                                                                                       | —       | Maps to `grid-template-areas`. Supports responsive values.                                                                                             |
| `autoFlow`                    | `Responsive<"row" \| "column" \| "dense" \| "row-dense" \| "column-dense">`                                                                                                                                | —       | Maps to `grid-auto-flow`. Supports responsive values.                                                                                                  |
| `autoRows`                    | `Responsive<string>`                                                                                                                                                                                       | —       | Maps to `grid-auto-rows`. Supports responsive values.                                                                                                  |
| `autoColumns`                 | `Responsive<string>`                                                                                                                                                                                       | —       | Maps to `grid-auto-columns`. Supports responsive values.                                                                                               |
| `justifyItems`                | `Responsive<"center" \| "start" \| "end" \| "stretch">`                                                                                                                                                    | —       | Maps to `justify-items`. Supports responsive values.                                                                                                   |
| `alignContent`                | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                                                                                                               | —       |                                                                                                                                                        |
| `alignItems`                  | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "baseline">`                                                                                                                                      | —       |                                                                                                                                                        |
| `alignSelf`                   | `Responsive<"center" \| "start" \| "end" \| "stretch">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `backgroundColor`             | `"primary" \| "secondary" \| "brand" \| `var(--h-${string})``                                                                                                                                              | —       |                                                                                                                                                        |
| `borderColor`                 | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                                                                                                                                        |
| `borderTopColor`              | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                                                                                                                                        |
| `borderRightColor`            | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                                                                                                                                        |
| `borderBottomColor`           | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                                                                                                                                        |
| `borderLeftColor`             | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                                                                                                                                        |
| `borderRadius`                | `Responsive<"none" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full" \| "inherit">`                                                                                                                        | —       |                                                                                                                                                        |
| `borderRadiusTopLeftNone`     | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusTopRightNone`    | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusBottomLeftNone`  | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusBottomRightNone` | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusTopNone`         | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusRightNone`       | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusBottomNone`      | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusLeftNone`        | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderStyle`                 | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                                                                                                                                        |
| `borderTopStyle`              | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                                                                                                                                        |
| `borderRightStyle`            | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                                                                                                                                        |
| `borderBottomStyle`           | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                                                                                                                                        |
| `borderLeftStyle`             | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                                                                                                                                        |
| `borderWidth`                 | `Responsive<`var(--h-${string})` \| "1" \| "2" \| "0">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderTopWidth`              | `Responsive<`var(--h-${string})` \| "1" \| "2" \| "0">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderRightWidth`            | `Responsive<`var(--h-${string})` \| "1" \| "2" \| "0">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderBottomWidth`           | `Responsive<`var(--h-${string})` \| "1" \| "2" \| "0">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderLeftWidth`             | `Responsive<`var(--h-${string})` \| "1" \| "2" \| "0">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `color`                       | `"primary" \| "secondary" \| "brand" \| "affirmative" \| "inverted" \| `var(--h-${string})``                                                                                                               | —       |                                                                                                                                                        |
| `flex`                        | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `flexBasis`                   | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `flexShrink`                  | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `flexGrow`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gap`                         | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `rowGap`                      | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `columnGap`                   | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `gridColumnSpan`              | `Responsive<Union<string, "1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12">>`                                                                                           | —       |                                                                                                                                                        |
| `gridArea`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridColumn`                  | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridColumnStart`             | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridColumnEnd`               | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridRow`                     | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridRowStart`                | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridRowEnd`                  | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `justifyContent`              | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                                                                                                               | —       | For flexboxes, the stretch value behaves as flex-start or start. This is because, in flexboxes, stretching is controlled using the flex-grow property. |
| `margin`                      | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| "auto">` | —       |                                                                                                                                                        |
| `marginTop`                   | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| "auto">` | —       |                                                                                                                                                        |
| `marginRight`                 | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| "auto">` | —       |                                                                                                                                                        |
| `marginBottom`                | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| "auto">` | —       |                                                                                                                                                        |
| `marginLeft`                  | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| "auto">` | —       |                                                                                                                                                        |
| `marginX`                     | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| "auto">` | —       |                                                                                                                                                        |
| `marginY`                     | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| "auto">` | —       |                                                                                                                                                        |
| `opacity`                     | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `order`                       | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `overflow`                    | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                                                                                                                                        |
| `overflowX`                   | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                                                                                                                                        |
| `overflowY`                   | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                                                                                                                                        |
| `padding`                     | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingTop`                  | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingRight`                | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingBottom`               | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingLeft`                 | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingX`                    | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingY`                    | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `position`                    | `Responsive<"fixed" \| "static" \| "relative" \| "absolute" \| "sticky">`                                                                                                                                  | —       |                                                                                                                                                        |
| `inset`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `top`                         | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `right`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `bottom`                      | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `left`                        | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `width`                       | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `maxWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `minWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `height`                      | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `maxHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `minHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `spacing`                     | `"none" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xs" \| "2xl"`                                                                                                                                         | —       | Set responsive spacing between child elements.                                                                                                         |
| `rowSpacing`                  | `"none" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xs" \| "2xl"`                                                                                                                                         | —       | Set responsive row spacing between child elements.                                                                                                     |
| `columnSpacing`               | `"none" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xs" \| "2xl"`                                                                                                                                         | —       | Set responsive column spacing between child elements.                                                                                                  |
| `textAlign`                   | `Responsive<"center" \| "right" \| "left">`                                                                                                                                                                | —       |                                                                                                                                                        |
| `textTransform`               | `"none" \| "uppercase" \| "lowercase" \| "capitalize"`                                                                                                                                                     | —       | Set the text-transform on the component.                                                                                                               |
| `zIndex`                      | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `as`                          | `"div" \| "span"`                                                                                                                                                                                          | —       |                                                                                                                                                        |
