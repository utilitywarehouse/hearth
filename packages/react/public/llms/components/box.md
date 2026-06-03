# Box

```tsx
<Box {...args} />
```

## Alternatives

- Container - For page content, with default
  responsive padding & gutters
- Grid - For grid layouts
- Flex - For stacked, inline or flexbox based
  layouts

## Semantic HTML

By default `Box` renders a `div` element, this can be customised using the
`as` prop, to render a `span`.

```tsx
<Box as="span">...</Box>
```

To render any other valid HTML element, you can use the `asChild` prop.

```tsx
<Box asChild>
  <main>...</main>
</Box>
```

This will render the child element, with all the styles declared on the `Box`
component passed down to it as well.

### Accessibility

The `Box` component is an all purpose component. By default, it has no
accessibility concerns. If you use the `Box` as a custom element, it is up to
you to manage the resulting accessibility implications.

## Show/hide content

The `display` prop is responsive, you can use this to show or hide content responsively.

```tsx
<Box display={{ mobile: 'none', tablet: 'block' }}>hide on mobile screens</Box>
```

## API

This component is based on the `div` element and supports the following common props:

- AlignSelf
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

| Prop                          | Type                                                                                                                                                                                                       | Default | Description                              |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------- |
| `asChild`                     | `boolean`                                                                                                                                                                                                  | —       |                                          |
| `display`                     | `Responsive<"none" \| "inline" \| "inline-block" \| "block">`                                                                                                                                              | —       |                                          |
| `alignSelf`                   | `Responsive<"center" \| "start" \| "end" \| "stretch">`                                                                                                                                                    | —       |                                          |
| `backgroundColor`             | `"primary" \| "secondary" \| "brand" \| `var(--h-${string})``                                                                                                                                              | —       |                                          |
| `borderColor`                 | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                          |
| `borderTopColor`              | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                          |
| `borderRightColor`            | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                          |
| `borderBottomColor`           | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                          |
| `borderLeftColor`             | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                          |
| `borderRadius`                | `Responsive<"none" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full" \| "inherit">`                                                                                                                        | —       |                                          |
| `borderRadiusTopLeftNone`     | `boolean`                                                                                                                                                                                                  | —       |                                          |
| `borderRadiusTopRightNone`    | `boolean`                                                                                                                                                                                                  | —       |                                          |
| `borderRadiusBottomLeftNone`  | `boolean`                                                                                                                                                                                                  | —       |                                          |
| `borderRadiusBottomRightNone` | `boolean`                                                                                                                                                                                                  | —       |                                          |
| `borderRadiusTopNone`         | `boolean`                                                                                                                                                                                                  | —       |                                          |
| `borderRadiusRightNone`       | `boolean`                                                                                                                                                                                                  | —       |                                          |
| `borderRadiusBottomNone`      | `boolean`                                                                                                                                                                                                  | —       |                                          |
| `borderRadiusLeftNone`        | `boolean`                                                                                                                                                                                                  | —       |                                          |
| `borderStyle`                 | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                          |
| `borderTopStyle`              | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                          |
| `borderRightStyle`            | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                          |
| `borderBottomStyle`           | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                          |
| `borderLeftStyle`             | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                          |
| `borderWidth`                 | `Responsive<"0" \| "1" \| "2">`                                                                                                                                                                            | —       |                                          |
| `borderTopWidth`              | `Responsive<"0" \| "1" \| "2">`                                                                                                                                                                            | —       |                                          |
| `borderRightWidth`            | `Responsive<"0" \| "1" \| "2">`                                                                                                                                                                            | —       |                                          |
| `borderBottomWidth`           | `Responsive<"0" \| "1" \| "2">`                                                                                                                                                                            | —       |                                          |
| `borderLeftWidth`             | `Responsive<"0" \| "1" \| "2">`                                                                                                                                                                            | —       |                                          |
| `color`                       | `"primary" \| "secondary" \| "brand" \| "affirmative" \| "inverted" \| `var(--h-${string})``                                                                                                               | —       |                                          |
| `flex`                        | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `flexBasis`                   | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `flexShrink`                  | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `flexGrow`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `gridColumnSpan`              | `Responsive<Union<string, "1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12">>`                                                                                           | —       |                                          |
| `gridArea`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `gridColumn`                  | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `gridColumnStart`             | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `gridColumnEnd`               | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `gridRow`                     | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `gridRowStart`                | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `gridRowEnd`                  | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `margin`                      | `Responsive<`var(--h-${string})` \| "0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                          |
| `marginTop`                   | `Responsive<`var(--h-${string})` \| "0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                          |
| `marginRight`                 | `Responsive<`var(--h-${string})` \| "0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                          |
| `marginBottom`                | `Responsive<`var(--h-${string})` \| "0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                          |
| `marginLeft`                  | `Responsive<`var(--h-${string})` \| "0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                          |
| `marginX`                     | `Responsive<`var(--h-${string})` \| "0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                          |
| `marginY`                     | `Responsive<`var(--h-${string})` \| "0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                          |
| `opacity`                     | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `order`                       | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `overflow`                    | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                          |
| `overflowX`                   | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                          |
| `overflowY`                   | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                          |
| `padding`                     | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                          |
| `paddingTop`                  | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                          |
| `paddingRight`                | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                          |
| `paddingBottom`               | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                          |
| `paddingLeft`                 | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                          |
| `paddingX`                    | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                          |
| `paddingY`                    | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                          |
| `position`                    | `Responsive<"fixed" \| "static" \| "relative" \| "absolute" \| "sticky">`                                                                                                                                  | —       |                                          |
| `inset`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                          |
| `top`                         | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                          |
| `right`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                          |
| `bottom`                      | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                          |
| `left`                        | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                          |
| `width`                       | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `maxWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `minWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `height`                      | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `maxHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `minHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `textAlign`                   | `Responsive<"center" \| "right" \| "left">`                                                                                                                                                                | —       |                                          |
| `textTransform`               | `"none" \| "uppercase" \| "lowercase" \| "capitalize"`                                                                                                                                                     | —       | Set the text-transform on the component. |
| `zIndex`                      | `Responsive<string>`                                                                                                                                                                                       | —       |                                          |
| `as`                          | `"div" \| "span"`                                                                                                                                                                                          | —       |                                          |
