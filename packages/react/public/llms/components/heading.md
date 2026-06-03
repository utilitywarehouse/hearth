# Heading

```tsx
<Flex direction="column" gap="100">
  {sizes.map(size => (
    <Heading key={size} size={size}>
      Hamburgefons ({size})
    </Heading>
  ))}
</Flex>
```

```tsx
<Heading size="md">The five boxing wizards jump quickly.</Heading>
```

## Alternatives

- BodyText - For body text
- DetailText - For detail text
- Strong - For strong importance
- Em - For emphasis

## Sizes

The size prop is not responsive, as the sizes themselves are already responsive
where necessary.

## Inverted

When using `Heading` on a darker background, specifically `purple700` &
`purple1000`, use the `inverted` prop to ensure colour contrast.

```tsx
<Box backgroundColor="brand" padding="400">
  <Heading {...args}>Inverted text</Heading>
</Box>
```

## API

This component is based on the `h2` element and supports the following common props:

- Margin
- Text transform
- Text align
- Text wrap

| Prop            | Type                                                                                                                                                                                                       | Default | Description                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `as`            | `"h2" \| "h1" \| "h3" \| "h4"`                                                                                                                                                                             | `h2`    |                                                                                                      |
| `asChild`       | `boolean`                                                                                                                                                                                                  | —       | Change the default rendered element for the one passed as a child, merging their props and behavior. |
| `size`          | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"`                                                                                                                                                                    | `md`    | Set the text size styles.                                                                            |
| `inverted`      | `boolean`                                                                                                                                                                                                  | —       | Inverts the component colours, for use on darker surface colours.                                    |
| `textAlign`     | `Responsive<"center" \| "left" \| "right">`                                                                                                                                                                | —       |                                                                                                      |
| `textTransform` | `"none" \| "uppercase" \| "lowercase" \| "capitalize"`                                                                                                                                                     | —       | Set the text-transform on the component.                                                             |
| `wrap`          | `Responsive<"wrap" \| "nowrap" \| "balance" \| "pretty">`                                                                                                                                                  | —       | DEPRECATED: use `textWrap` instead of `wrap` @deprecated Use `textWrap` instead of `wrap`            |
| `textWrap`      | `Responsive<"wrap" \| "nowrap" \| "balance" \| "pretty">`                                                                                                                                                  | —       |                                                                                                      |
| `margin`        | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                      |
| `marginTop`     | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                      |
| `marginRight`   | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                      |
| `marginBottom`  | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                      |
| `marginLeft`    | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                      |
| `marginX`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                      |
| `marginY`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                      |
