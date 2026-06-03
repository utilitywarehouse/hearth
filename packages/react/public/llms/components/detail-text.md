# DetailText

```tsx
<Flex direction="column" gap="100">
  {sizes.map(size => (
    <DetailText key={size} size={size}>
      Hamburgefons ({size})
    </DetailText>
  ))}
</Flex>
```

```tsx
<DetailText size="md" color="text">
  The five boxing wizards jump quickly.
</DetailText>
```

## Alternatives

- BodyText - For body text
- Strong - For strong importance
- Em - For emphasis
- Heading - For heading-level text

## Size

The size prop is responsive, so you can render different sizes at different breakpoints.

```tsx
<DetailText size={{ mobile: 'sm', tablet: 'md', desktop: 'lg'}}>{...}</DetailText>
```

```tsx
<Flex direction="column" gap="100">
  {sizes.map(size => (
    <DetailText key={size} size={size}>
      {size}
    </DetailText>
  ))}
  <DetailText size={{ mobile: 'sm', tablet: 'xl', desktop: '4xl' }}>Responsive size</DetailText>
</Flex>
```

## Color

The text color of `DetailText` can be set to either `text`, `valid` or
`invalid`. These colours will be overridden by the `inverted` prop.

## Inverted

When using `BodyText` on a darker background, specifically `uwPurple` &
`darkPurple`, use the `inverted` prop to ensure colour contrast.

```tsx
<Flex direction="column">
  <Box backgroundColor="brand" padding="400">
    <DetailText {...args}>Inverted text</DetailText>
  </Box>
</Flex>
```

## API

This component is based on the `span` element and supports the following common props:

- Margin
- Text transform
- Text align
- Text wrap

| Prop            | Type                                                                                                                                                                                                       | Default | Description                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `asChild`       | `boolean`                                                                                                                                                                                                  | —       | Change the default rendered element for the one passed as a child, merging their props and behavior. |
| `size`          | `Responsive<"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl">`                                                                                                                                      | `md`    | Set the text size styles.                                                                            |
| `color`         | `(Responsive<"text" \| "valid" \| "invalid"> & string)`                                                                                                                                                    | `text`  | Set the text color                                                                                   |
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
| `as`            | `"span" \| "div" \| "p"`                                                                                                                                                                                   | —       |                                                                                                      |
