# BodyText

```tsx
<Flex direction="column" gap="100">
  {sizes.map(size =>
    weights.map(weight => (
      <BodyText key={`${size}${weight}`} size={size} weight={weight}>
        Hamburgefons ({size}, {weight})
      </BodyText>
    ))
  )}
</Flex>
```

```tsx
<BodyText size="md">The five boxing wizards jump quickly.</BodyText>
```

## Alternatives

- DetailText - For detail text
- Heading - For heading-level text
- Strong - For strong importance
- Em - For emphasis

## Semantic HTML

By default `BodyText` renders a `p` element, this can be customised using the
`as` prop, to render a `span` or a `div`.

```tsx
<BodyText as="span">...</Box>
```

To render any other valid HTML element, you can use the `asChild` prop.

```tsx
<BodyText asChild>
  <label>...</label>
</Box>
```

This will render the child element, with all the styles declared on the `Box`
component passed down to it as well.

## Size

The size prop is responsive, so you can render different sizes at different breakpoints.

```tsx
<BodyText size={{ mobile: 'sm', tablet: 'md', desktop: 'lg'}}>{...}</BodyText>
```

```tsx
<Flex direction="column" gap="100">
  {sizes.map(size => (
    <BodyText key={size} size={size}>
      {size}
    </BodyText>
  ))}
  <BodyText size={{ mobile: 'sm', tablet: 'md', desktop: 'lg' }}>Responsive size</BodyText>
</Flex>
```

## Weight

The weight prop is responsive, so you can render different weights at different breakpoints.

```tsx
<BodyText weight={{ mobile: 'bold', tablet: 'regular'}}>{...}</BodyText>
```

```tsx
<Flex direction="column" gap="100">
  {weights.map(weight => (
    <BodyText key={weight} weight={weight}>
      {weight}
    </BodyText>
  ))}
  <BodyText weight={{ mobile: 'bold', tablet: 'regular' }}>Responsive weight</BodyText>
</Flex>
```

## Colour

You can use the `color` prop to set a semantic text colour.

```tsx
<BodyText color="primary" />
<BodyText color="secondary" />
<BodyText color="brand" />
<BodyText color="affirmative" />
<BodyText color="inverted" />
```

```tsx
<Flex direction="column" width="fit-content">
  <Flex direction="column" backgroundColor="secondary" padding="400" gap="400">
    <BodyText color="primary">Primary</BodyText>
    <BodyText color="secondary">Secondary</BodyText>
    <BodyText color="brand">Brand</BodyText>
    <BodyText color="affirmative">Affirmative</BodyText>
  </Flex>
  <Box backgroundColor="brand" padding="400">
    <BodyText color="inverted">Inverted</BodyText>
  </Box>
</Flex>
```

## Inverted

When using `BodyText` on a brand background you can set the `color` prop to
inverted to ensure proper colour contrast.

```tsx
<Flex direction="column">
  <Box backgroundColor="brand" padding="400">
    <BodyText {...args}>Inverted text</BodyText>
  </Box>
</Flex>
```

## Text truncate

Use the `truncate` prop to set the text to truncate, instead of wrapping, with a
text overflow ellipsis. Note that text overflow can only happen with block or
inline-block level elements (the element needs to have a width in order to
overflow).

```tsx
<Flex direction="column" gap="100" width="200px">
  {sizes.map(size => (
    <BodyText key={size} {...args} size={size}>
      the quick brown fox jumped over the lazy dog.
    </BodyText>
  ))}
</Flex>
```

## Paragraph Spacing

The `paragraphSpacing` prop aligns with the auto spacing between paragraphs in
Figma designs. While layout components are preferred for managing layouts, and
applying spacing between elements, sometimes multiple paragraphs can be stacked
without a parent layout component. When this happens in a design there is no
indication what the spacing is between these stacked paragraphs. You can use
`paragraphSpacing` on these `BodyText` elements to apply a predefined bottom
gutter.

```tsx
<Flex gap="500">
  {sizes.map(size => (
    <Flex key={size} direction="column" width="360px">
      <BodyText paragraphSpacing size={size}>
        EV tariffs offer fantastic value if your driving patterns mean you can regularly charge your
        car at home - and can schedule your vehicle to charge while you sleep.
      </BodyText>
      <BodyText paragraphSpacing size={size}>
        You’ll get the most value out of our EV tariff by consistently charging your car off-peak
        between midnight and 5am in the morning
      </BodyText>
      <BodyText size={size}>
        And don&apos;t forget, any domestic usage (e.g. washing machines) in that off-peak window
        will also be charged at the reduced rate.
      </BodyText>
    </Flex>
  ))}
</Flex>
```

## API

This component is based on the `p` element and supports the following common props:

- Margin
- Color
- Text align
- Text wrap
- Text transform

| Prop               | Type                                                                                                                                                                                                       | Default   | Description                                                                                                                                                                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`               | `"span" \| "div" \| "label" \| "p"`                                                                                                                                                                        | `p`       | Shorthand for changing the default rendered element into a semantically appropriate alternative. Cannot be used in combination with `asChild`.                                                                                        |
| `asChild`          | `boolean`                                                                                                                                                                                                  | —         | Change the default rendered element for the one passed as a child, merging their props and behavior.                                                                                                                                  |
| `size`             | `Responsive<"sm" \| "md" \| "lg">`                                                                                                                                                                         | `md`      | Set the text size styles.                                                                                                                                                                                                             |
| `weight`           | `Responsive<"regular" \| "semibold" \| "bold">`                                                                                                                                                            | `regular` | Set the font-weight                                                                                                                                                                                                                   |
| `truncate`         | `boolean`                                                                                                                                                                                                  | —         | If true, the text will not wrap, but instead will truncate with a text overflow ellipsis. Note that text overflow can only happen with block or inline-block level elements (the element needs to have a width in order to overflow). |
| `paragraphSpacing` | `boolean`                                                                                                                                                                                                  | —         | If true, the text will have a bottom margin.                                                                                                                                                                                          |
| `color`            | `"primary" \| "secondary" \| "brand" \| "affirmative" \| "inverted" \| `var(--h-${string})``                                                                                                               | —         |                                                                                                                                                                                                                                       |
| `textAlign`        | `Responsive<"center" \| "left" \| "right">`                                                                                                                                                                | —         |                                                                                                                                                                                                                                       |
| `textTransform`    | `"none" \| "uppercase" \| "lowercase" \| "capitalize"`                                                                                                                                                     | —         | Set the text-transform on the component.                                                                                                                                                                                              |
| `wrap`             | `Responsive<"wrap" \| "nowrap" \| "balance" \| "pretty">`                                                                                                                                                  | —         | DEPRECATED: use `textWrap` instead of `wrap` @deprecated Use `textWrap` instead of `wrap`                                                                                                                                             |
| `textWrap`         | `Responsive<"wrap" \| "nowrap" \| "balance" \| "pretty">`                                                                                                                                                  | —         |                                                                                                                                                                                                                                       |
| `margin`           | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —         |                                                                                                                                                                                                                                       |
| `marginTop`        | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —         |                                                                                                                                                                                                                                       |
| `marginRight`      | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —         |                                                                                                                                                                                                                                       |
| `marginBottom`     | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —         |                                                                                                                                                                                                                                       |
| `marginLeft`       | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —         |                                                                                                                                                                                                                                       |
| `marginX`          | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —         |                                                                                                                                                                                                                                       |
| `marginY`          | `Responsive<`var(--h-${string})` \| "auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —         |                                                                                                                                                                                                                                       |
