# Em

```tsx
<Flex direction="column" gap="100">
  {sizes.map(size => (
    <BodyText key={size} size={size}>
      We <Em>had</Em> to do something about it.
    </BodyText>
  ))}
</Flex>
```

## Alternatives

- BodyText - For body text
- DetailText - For detail text
- Heading - For heading-level text
- Strong - For strong importance

## API

This component is based on the `em` element and supports the following common props:

- Margin
- Text transform
- Text align
- Text wrap

| Prop            | Type                                                                                                                                                                                                       | Default | Description                                                                                                                                                                                                                           |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asChild`       | `boolean`                                                                                                                                                                                                  | —       | Change the default rendered element for the one passed as a child, merging their props and behavior.                                                                                                                                  |
| `truncate`      | `boolean`                                                                                                                                                                                                  | —       | If true, the text will not wrap, but instead will truncate with a text overflow ellipsis. Note that text overflow can only happen with block or inline-block level elements (the element needs to have a width in order to overflow). |
| `textAlign`     | `Responsive<"center" \| "left" \| "right">`                                                                                                                                                                | —       |                                                                                                                                                                                                                                       |
| `textTransform` | `"none" \| "uppercase" \| "lowercase" \| "capitalize"`                                                                                                                                                     | —       | Set the text-transform on the component.                                                                                                                                                                                              |
| `wrap`          | `Responsive<"wrap" \| "nowrap" \| "balance" \| "pretty">`                                                                                                                                                  | —       | DEPRECATED: use `textWrap` instead of `wrap` @deprecated Use `textWrap` instead of `wrap`                                                                                                                                             |
| `textWrap`      | `Responsive<"wrap" \| "nowrap" \| "balance" \| "pretty">`                                                                                                                                                  | —       |                                                                                                                                                                                                                                       |
| `margin`        | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                       |
| `marginTop`     | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                       |
| `marginRight`   | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                       |
| `marginBottom`  | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                       |
| `marginLeft`    | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                       |
| `marginX`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                       |
| `marginY`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                       |
