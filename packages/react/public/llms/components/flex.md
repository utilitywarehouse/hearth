# Flex

Use Flex to build flexbox-based layouts — stacked, inline, or wrapped
arrangements of children — with responsive `direction`, `wrap`, alignment,
and gap props.
For primitive styling with no flexbox behaviour, use Box instead.
For page content with built-in max-width and centering, use Container instead.
For CSS grid layouts, use Grid instead.

```tsx
<Flex {...args}>
  <Placeholder padding="600" />
  <Placeholder padding="600" />
  <Placeholder padding="600" />
  <Placeholder padding="600" />
</Flex>
```

## Alternatives

- Box - For primitive styling and layouts
- Container - For page content, with default
  responsive padding & gutters
- Flex - For stacked, inline or flexbox based
  layouts

## Gap

`Flex` supports the `gap`, `columnGap` and `rowGap` properties, which use the
design token spacing scale. All gap properties are responsive.

```tsx
<Flex columnGap="400" rowGap={{ mobile: "100", desktop: "300" }}>
```

## Spacing

As well as `gap`, there is a `spacing` prop which uses a smaller scale, already
optimised for responsive design. This prop will be overridden by the `gap`
prop.

```tsx
<Flex spacing="lg">
```

## Semantic HTML

By default `Flex` renders a `div` element, this can be customised using the
`as` prop, to render a `span`.

```tsx
<Flex as="span">...</Flex>
```

To render any other valid HTML element, you can use the `asChild` prop.

```tsx
<Flex asChild>
  <main>...</main>
</Flex>
```

This will render the child element, with all the styles declared on the `Flex`
component passed down to it as well.

## Usage with Divider

You can insert a `Divider` component in between `Flex` children in the following way:

```tsx
<Flex direction="column">
  {meters.map((meter, index) => (
    <>
      <EnergyMeter
        key={meter.meterId ? meter.meterId : `${meter.__typename}-${index}`}
        meter={meter}
      />
        <Divider />
      </>
  ))}
</Flex>

<Flex direction="column">
  {["100", "200", "400"].map((padding, i) => (
    <>
      <Box padding={padding} >
        <BodyText>Item {i + 1}</BodyText>
      </Box>
      {i < 2 ? <Divider /> : null}
    </>
  ))}
</Flex>
```

## API

This component is based on the `div` element and supports the following common props:

- AlignSelf
- Gap
- Padding
- Margin
- Position
- Size
- Colour
- Background colour
- Border colour
- Border
- Flex item
- Grid item
- Text align
- Text transform
- Z-Index
- Overflow
- Opacity
- Order

| Prop                          | Type                                                                                                                                                                                                       | Default     | Description                                                                                                                                               |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `spacing`                     | `"none" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"`                                                                                                                                         | —           | Set responsive spacing between child elements.                                                                                                            |
| `asChild`                     | `boolean`                                                                                                                                                                                                  | `false`     | Merges the component's props onto its immediate child instead of rendering its own DOM element, so the child determines the rendered tag.                 |
| `display`                     | `Responsive<"flex" \| "none" \| "inline-flex">`                                                                                                                                                            | —           | Sets the CSS `display` property to a flex value. Can be set responsively.                                                                                 |
| `direction`                   | `Responsive<"row" \| "column" \| "row-reverse" \| "column-reverse">`                                                                                                                                       | `row`       | Sets the direction of the flex container's main axis. Can be set responsively.                                                                            |
| `wrap`                        | `Responsive<"wrap" \| "nowrap" \| "wrap-reverse">`                                                                                                                                                         | `nowrap`    | Sets whether flex items wrap onto multiple lines. Can be set responsively.                                                                                |
| `alignContent`                | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                                                                                                               | —           | Set how a flex or grid container distributes space between and around its lines when there is extra space in the cross axis. Supports responsive values.  |
| `alignItems`                  | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "baseline">`                                                                                                                                      | —           | Set how a flex or grid container aligns its items along the cross axis. Supports responsive values.                                                       |
| `alignSelf`                   | `Responsive<"center" \| "start" \| "end" \| "stretch">`                                                                                                                                                    | —           | Override the container's `align-items` value for this individual flex or grid item, aligning it along the cross axis. Supports responsive values.         |
| `backgroundColor`             | `"primary" \| "secondary" \| "brand" \| `var(--h-${string})``                                                                                                                                              | —           | Sets the `background-color` CSS property.                                                                                                                 |
| `borderColor`                 | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —           | Sets the `border-color` CSS property on all sides of the element.                                                                                         |
| `borderTopColor`              | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —           | Sets the `border-top-color` CSS property.                                                                                                                 |
| `borderRightColor`            | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —           | Sets the `border-right-color` CSS property.                                                                                                               |
| `borderBottomColor`           | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —           | Sets the `border-bottom-color` CSS property.                                                                                                              |
| `borderLeftColor`             | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —           | Sets the `border-left-color` CSS property.                                                                                                                |
| `borderRadius`                | `Responsive<"none" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full" \| "inherit">`                                                                                                                        | —           | Sets the responsive `border-radius` CSS property on all corners of the element.                                                                           |
| `borderRadiusTopLeftNone`     | `boolean`                                                                                                                                                                                                  | —           | Removes the border radius from the top-left corner.                                                                                                       |
| `borderRadiusTopRightNone`    | `boolean`                                                                                                                                                                                                  | —           | Removes the border radius from the top-right corner.                                                                                                      |
| `borderRadiusBottomLeftNone`  | `boolean`                                                                                                                                                                                                  | —           | Removes the border radius from the bottom-left corner.                                                                                                    |
| `borderRadiusBottomRightNone` | `boolean`                                                                                                                                                                                                  | —           | Removes the border radius from the bottom-right corner.                                                                                                   |
| `borderRadiusTopNone`         | `boolean`                                                                                                                                                                                                  | —           | Removes the border radius from the top-left and top-right corners.                                                                                        |
| `borderRadiusRightNone`       | `boolean`                                                                                                                                                                                                  | —           | Removes the border radius from the top-right and bottom-right corners.                                                                                    |
| `borderRadiusBottomNone`      | `boolean`                                                                                                                                                                                                  | —           | Removes the border radius from the bottom-left and bottom-right corners.                                                                                  |
| `borderRadiusLeftNone`        | `boolean`                                                                                                                                                                                                  | —           | Removes the border radius from the top-left and bottom-left corners.                                                                                      |
| `borderStyle`                 | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —           | Sets the responsive `border-style` CSS property on all sides of the element.                                                                              |
| `borderTopStyle`              | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —           | Sets the responsive `border-top-style` CSS property.                                                                                                      |
| `borderRightStyle`            | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —           | Sets the responsive `border-right-style` CSS property.                                                                                                    |
| `borderBottomStyle`           | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —           | Sets the responsive `border-bottom-style` CSS property.                                                                                                   |
| `borderLeftStyle`             | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —           | Sets the responsive `border-left-style` CSS property.                                                                                                     |
| `borderWidth`                 | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">`                                                                                                                                                    | —           | Sets the responsive `border-width` CSS property on all sides of the element.                                                                              |
| `borderTopWidth`              | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">`                                                                                                                                                    | —           | Sets the responsive `border-top-width` CSS property.                                                                                                      |
| `borderRightWidth`            | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">`                                                                                                                                                    | —           | Sets the responsive `border-right-width` CSS property.                                                                                                    |
| `borderBottomWidth`           | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">`                                                                                                                                                    | —           | Sets the responsive `border-bottom-width` CSS property.                                                                                                   |
| `borderLeftWidth`             | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">`                                                                                                                                                    | —           | Sets the responsive `border-left-width` CSS property.                                                                                                     |
| `color`                       | `"primary" \| "secondary" \| "brand" \| "affirmative" \| "inverted" \| `var(--h-${string})``                                                                                                               | —           | Sets the text `color` CSS property.                                                                                                                       |
| `flex`                        | `Responsive<string>`                                                                                                                                                                                       | —           | Shorthand for `flex-grow`, `flex-shrink` and `flex-basis`, controlling how a flex item grows or shrinks to fit the space available in its flex container. |
| `flexBasis`                   | `Responsive<string>`                                                                                                                                                                                       | —           | Set the initial main-size of a flex item before remaining space is distributed along the main axis.                                                       |
| `flexShrink`                  | `Responsive<string>`                                                                                                                                                                                       | `1`         | Set how much a flex item shrinks relative to the rest of the flex items when there isn't enough space in the container.                                   |
| `flexGrow`                    | `Responsive<string>`                                                                                                                                                                                       | `0`         | Set how much a flex item grows relative to the rest of the flex items when there is extra space in the container.                                         |
| `gap`                         | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —           | Shorthand for `row-gap` and `column-gap`, setting the space between rows and columns in a flex or grid container. Supports responsive values.             |
| `rowGap`                      | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —           | Set the space between rows in a flex or grid container. Supports responsive values.                                                                       |
| `columnGap`                   | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —           | Set the space between columns in a flex or grid container. Supports responsive values.                                                                    |
| `gridColumnSpan`              | `Responsive<Union<string, "1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12">>`                                                                                           | —           | Set the number of grid columns this item spans. Supports responsive values.                                                                               |
| `gridArea`                    | `Responsive<string>`                                                                                                                                                                                       | —           | Shorthand for `grid-row-start`, `grid-column-start`, `grid-row-end` and `grid-column-end`, placing an item within a named grid area or by line numbers.   |
| `gridColumn`                  | `Responsive<string>`                                                                                                                                                                                       | —           | Shorthand for `grid-column-start` and `grid-column-end`, setting an item's size and location within the grid column.                                      |
| `gridColumnStart`             | `Responsive<string>`                                                                                                                                                                                       | —           | Set an item's starting line within the grid column.                                                                                                       |
| `gridColumnEnd`               | `Responsive<string>`                                                                                                                                                                                       | —           | Set an item's ending line within the grid column.                                                                                                         |
| `gridRow`                     | `Responsive<string>`                                                                                                                                                                                       | —           | Shorthand for `grid-row-start` and `grid-row-end`, setting an item's size and location within the grid row.                                               |
| `gridRowStart`                | `Responsive<string>`                                                                                                                                                                                       | —           | Set an item's starting line within the grid row.                                                                                                          |
| `gridRowEnd`                  | `Responsive<string>`                                                                                                                                                                                       | —           | Set an item's ending line within the grid row.                                                                                                            |
| `justifyContent`              | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                                                                                                               | —           | For flexboxes, the stretch value behaves as flex-start or start. This is because, in flexboxes, stretching is controlled using the flex-grow property.    |
| `margin`                      | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| "auto">` | —           | Sets the responsive `margin` CSS property on all sides of the element.                                                                                    |
| `marginTop`                   | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| "auto">` | —           | Sets the responsive `margin-top` CSS property.                                                                                                            |
| `marginRight`                 | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| "auto">` | —           | Sets the responsive `margin-right` CSS property.                                                                                                          |
| `marginBottom`                | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| "auto">` | —           | Sets the responsive `margin-bottom` CSS property.                                                                                                         |
| `marginLeft`                  | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| "auto">` | —           | Sets the responsive `margin-left` CSS property.                                                                                                           |
| `marginX`                     | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| "auto">` | —           | Sets the responsive `margin-left` and `margin-right` CSS properties.                                                                                      |
| `marginY`                     | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| "auto">` | —           | Sets the responsive `margin-top` and `margin-bottom` CSS properties.                                                                                      |
| `opacity`                     | `Responsive<string>`                                                                                                                                                                                       | —           | Set the transparency of an element, from `0` (fully transparent) to `1` (fully opaque). Supports responsive values.                                       |
| `order`                       | `Responsive<string>`                                                                                                                                                                                       | —           | Set the order in which the component appears among its flex or grid siblings.                                                                             |
| `overflow`                    | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | `'visible'` | Set how content that overflows the component's box is handled, on both axes.                                                                              |
| `overflowX`                   | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | `'visible'` | Set how content that overflows the component's box is handled on the horizontal axis.                                                                     |
| `overflowY`                   | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | `'visible'` | Set how content that overflows the component's box is handled on the vertical axis.                                                                       |
| `padding`                     | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —           | Sets the responsive `padding` CSS property on all sides of the element.                                                                                   |
| `paddingTop`                  | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —           | Sets the responsive `padding-top` CSS property.                                                                                                           |
| `paddingRight`                | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —           | Sets the responsive `padding-right` CSS property.                                                                                                         |
| `paddingBottom`               | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —           | Sets the responsive `padding-bottom` CSS property.                                                                                                        |
| `paddingLeft`                 | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —           | Sets the responsive `padding-left` CSS property.                                                                                                          |
| `paddingX`                    | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —           | Sets the responsive `padding-left` and `padding-right` CSS properties.                                                                                    |
| `paddingY`                    | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —           | Sets the responsive `padding-top` and `padding-bottom` CSS properties.                                                                                    |
| `position`                    | `Responsive<"fixed" \| "static" \| "relative" \| "absolute" \| "sticky">`                                                                                                                                  | `'static'`  | Set how the component is positioned in the document.                                                                                                      |
| `inset`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —           | Set the distance of all four edges (top, right, bottom, left) of a positioned component from its containing block.                                        |
| `top`                         | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —           | Set the distance of the top edge of a positioned component from its containing block.                                                                     |
| `right`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —           | Set the distance of the right edge of a positioned component from its containing block.                                                                   |
| `bottom`                      | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —           | Set the distance of the bottom edge of a positioned component from its containing block.                                                                  |
| `left`                        | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —           | Set the distance of the left edge of a positioned component from its containing block.                                                                    |
| `width`                       | `Responsive<string>`                                                                                                                                                                                       | —           | Set the width of the component.                                                                                                                           |
| `maxWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —           | Set the maximum width the component can grow to.                                                                                                          |
| `minWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —           | Set the minimum width the component can shrink to.                                                                                                        |
| `height`                      | `Responsive<string>`                                                                                                                                                                                       | —           | Set the height of the component.                                                                                                                          |
| `maxHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —           | Set the maximum height the component can grow to.                                                                                                         |
| `minHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —           | Set the minimum height the component can shrink to.                                                                                                       |
| `textAlign`                   | `Responsive<"center" \| "right" \| "left">`                                                                                                                                                                | —           | Set the horizontal alignment of text within the component.                                                                                                |
| `textTransform`               | `"none" \| "uppercase" \| "lowercase" \| "capitalize"`                                                                                                                                                     | —           | Set the text-transform on the component.                                                                                                                  |
| `zIndex`                      | `Responsive<string>`                                                                                                                                                                                       | —           | Set the stack order of a positioned component relative to its siblings.                                                                                   |
| `as`                          | `"span" \| "div"`                                                                                                                                                                                          | —           | Renders a `div` element. This is the default. Renders a `span` element.                                                                                   |
