# Flex

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

| Prop                          | Type                                                                                                                                                                                                       | Default | Description                                                                                                                                            |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `spacing`                     | `"none" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"`                                                                                                                                         | —       | Set responsive spacing between child elements.                                                                                                         |
| `asChild`                     | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `display`                     | `Responsive<"flex" \| "none" \| "inline-flex">`                                                                                                                                                            | —       |                                                                                                                                                        |
| `direction`                   | `Responsive<"row" \| "column" \| "row-reverse" \| "column-reverse">`                                                                                                                                       | —       |                                                                                                                                                        |
| `wrap`                        | `Responsive<"wrap" \| "nowrap" \| "wrap-reverse">`                                                                                                                                                         | —       |                                                                                                                                                        |
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
| `borderWidth`                 | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderTopWidth`              | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderRightWidth`            | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderBottomWidth`           | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderLeftWidth`             | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">`                                                                                                                                                    | —       |                                                                                                                                                        |
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
| `textAlign`                   | `Responsive<"center" \| "right" \| "left">`                                                                                                                                                                | —       |                                                                                                                                                        |
| `textTransform`               | `"none" \| "uppercase" \| "lowercase" \| "capitalize"`                                                                                                                                                     | —       | Set the text-transform on the component.                                                                                                               |
| `zIndex`                      | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `as`                          | `"span" \| "div"`                                                                                                                                                                                          | —       |                                                                                                                                                        |
