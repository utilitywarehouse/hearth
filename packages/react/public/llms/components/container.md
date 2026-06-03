# Container

```tsx
<Container {...args}>
  <Placeholder
    width="100%"
    height="84px"
    backgroundColor="secondary"
    borderColor="subtle"
    borderWidth="1"
  />
  <Placeholder
    width="100%"
    height="100px"
    backgroundColor="secondary"
    borderColor="subtle"
    borderWidth="1"
  />
  <Placeholder
    width="100%"
    height={{ mobile: '544px', desktop: '383px' }}
    backgroundColor="secondary"
    borderColor="subtle"
    borderWidth="1"
  />
</Container>
```

## Alternatives

- Box - For primitive styling and layouts
- Grid - For grid layouts
- Flex - For stacked, inline or flexbox based
  layouts

## Semantic HTML

By default `Container` renders a `div` element, this can be customised using
the `asChild` prop.

```tsx
<Container asChild>
  <main>...</main>
</Container>
```

## Max width

By default `Container` has a max-width of `100%` for screen widths below the
desktop breakpoint, and for desktop screens, and above, the max-width is
defined by the container width design token.

If you need to, you can apply your app-specific max-width, usually only at the
`desktop` breakpoint.

```tsx
<Container maxWidth={{ desktop: '1096px' }}>{...}</Container>
```

## Align

By default `Container` aligns its content in the center, you can change this
with the `align` prop.

```tsx
<Container align='start'>{...}</Container>
```

## Spacing

As well as the `gap` prop for flexbox spacing, there is a `spacing` prop which
uses fewer steps and is already optimised for responsive design. This prop will
be overridden by the `gap` prop.

```tsx
<Container spacing="lg">
```

## Show/hide content

The `display` prop is responsive, you can use this to show or hide content responsively.

```tsx
<Container display={{ mobile: 'none', tablet: 'flex' }}>hide on mobile screens</Container>
```

## API

This component is based on the `div` element and supports the following common props:

- AlignSelf
- Gap
- Padding
- Margin
- Position
- Size
- Background colour
- Flex item
- Z-Index
- Overflow
- Order

| Prop                          | Type                                                                                                                                                                                                       | Default  | Description                                                                                                                                            |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `spacing`                     | `"none" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"`                                                                                                                                         | —        | Set responsive spacing between child elements.                                                                                                         |
| `asChild`                     | `boolean`                                                                                                                                                                                                  | —        |                                                                                                                                                        |
| `display`                     | `Responsive<"flex" \| "none" \| "inline-flex">`                                                                                                                                                            | —        |                                                                                                                                                        |
| `direction`                   | `Responsive<"row" \| "column" \| "row-reverse" \| "column-reverse">`                                                                                                                                       | —        |                                                                                                                                                        |
| `wrap`                        | `Responsive<"wrap" \| "nowrap" \| "wrap-reverse">`                                                                                                                                                         | —        |                                                                                                                                                        |
| `alignContent`                | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                                                                                                               | —        |                                                                                                                                                        |
| `alignItems`                  | `Responsive<"center" \| "start" \| "end" \| "baseline" \| "stretch">`                                                                                                                                      | —        |                                                                                                                                                        |
| `alignSelf`                   | `Responsive<"center" \| "start" \| "end" \| "stretch">`                                                                                                                                                    | —        |                                                                                                                                                        |
| `backgroundColor`             | `"primary" \| "secondary" \| "brand" \| `var(--h-${string})``                                                                                                                                              | —        |                                                                                                                                                        |
| `borderRadius`                | `Responsive<"none" \| "inherit" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full">`                                                                                                                        | —        |                                                                                                                                                        |
| `borderRadiusTopLeftNone`     | `boolean`                                                                                                                                                                                                  | —        |                                                                                                                                                        |
| `borderRadiusTopRightNone`    | `boolean`                                                                                                                                                                                                  | —        |                                                                                                                                                        |
| `borderRadiusBottomLeftNone`  | `boolean`                                                                                                                                                                                                  | —        |                                                                                                                                                        |
| `borderRadiusBottomRightNone` | `boolean`                                                                                                                                                                                                  | —        |                                                                                                                                                        |
| `borderRadiusTopNone`         | `boolean`                                                                                                                                                                                                  | —        |                                                                                                                                                        |
| `borderRadiusRightNone`       | `boolean`                                                                                                                                                                                                  | —        |                                                                                                                                                        |
| `borderRadiusBottomNone`      | `boolean`                                                                                                                                                                                                  | —        |                                                                                                                                                        |
| `borderRadiusLeftNone`        | `boolean`                                                                                                                                                                                                  | —        |                                                                                                                                                        |
| `flex`                        | `Responsive<string>`                                                                                                                                                                                       | —        |                                                                                                                                                        |
| `flexBasis`                   | `Responsive<string>`                                                                                                                                                                                       | —        |                                                                                                                                                        |
| `flexShrink`                  | `Responsive<string>`                                                                                                                                                                                       | —        |                                                                                                                                                        |
| `flexGrow`                    | `Responsive<string>`                                                                                                                                                                                       | —        |                                                                                                                                                        |
| `gap`                         | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —        |                                                                                                                                                        |
| `rowGap`                      | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —        |                                                                                                                                                        |
| `columnGap`                   | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —        |                                                                                                                                                        |
| `justifyContent`              | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                                                                                                               | —        | For flexboxes, the stretch value behaves as flex-start or start. This is because, in flexboxes, stretching is controlled using the flex-grow property. |
| `margin`                      | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —        |                                                                                                                                                        |
| `marginTop`                   | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —        |                                                                                                                                                        |
| `marginRight`                 | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —        |                                                                                                                                                        |
| `marginBottom`                | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —        |                                                                                                                                                        |
| `marginLeft`                  | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —        |                                                                                                                                                        |
| `marginX`                     | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —        |                                                                                                                                                        |
| `marginY`                     | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —        |                                                                                                                                                        |
| `order`                       | `Responsive<string>`                                                                                                                                                                                       | —        |                                                                                                                                                        |
| `overflow`                    | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —        |                                                                                                                                                        |
| `overflowX`                   | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —        |                                                                                                                                                        |
| `overflowY`                   | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —        |                                                                                                                                                        |
| `padding`                     | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —        |                                                                                                                                                        |
| `paddingTop`                  | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —        |                                                                                                                                                        |
| `paddingRight`                | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —        |                                                                                                                                                        |
| `paddingBottom`               | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —        |                                                                                                                                                        |
| `paddingLeft`                 | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —        |                                                                                                                                                        |
| `paddingX`                    | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —        |                                                                                                                                                        |
| `paddingY`                    | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —        |                                                                                                                                                        |
| `position`                    | `Responsive<"static" \| "relative" \| "absolute" \| "fixed" \| "sticky">`                                                                                                                                  | —        |                                                                                                                                                        |
| `inset`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —        |                                                                                                                                                        |
| `top`                         | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —        |                                                                                                                                                        |
| `right`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —        |                                                                                                                                                        |
| `bottom`                      | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —        |                                                                                                                                                        |
| `left`                        | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —        |                                                                                                                                                        |
| `width`                       | `Responsive<string>`                                                                                                                                                                                       | —        |                                                                                                                                                        |
| `maxWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —        |                                                                                                                                                        |
| `minWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —        |                                                                                                                                                        |
| `height`                      | `Responsive<string>`                                                                                                                                                                                       | —        |                                                                                                                                                        |
| `maxHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —        |                                                                                                                                                        |
| `minHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —        |                                                                                                                                                        |
| `zIndex`                      | `Responsive<string>`                                                                                                                                                                                       | —        |                                                                                                                                                        |
| `align`                       | `Responsive<"center" \| "start" \| "end">`                                                                                                                                                                 | `center` |                                                                                                                                                        |
