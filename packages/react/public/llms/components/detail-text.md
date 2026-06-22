# DetailText

```tsx
<Flex direction="column" gap="100">
  <DetailText size="sm">Hamburgefons (sm)</DetailText>
  <DetailText size="md">Hamburgefons (md)</DetailText>
  <DetailText size="lg">Hamburgefons (lg)</DetailText>
  <DetailText size="xl">Hamburgefons (xl)</DetailText>
  <DetailText size="2xl">Hamburgefons (2xl)</DetailText>
  <DetailText size="3xl">Hamburgefons (3xl)</DetailText>
  <DetailText size="4xl">Hamburgefons (4xl)</DetailText>
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

| Size | Font-size | Line-height | Letter-spacing |
| ---- | --------- | ----------- | -------------- |
| sm   | 14px      | 18px        | -0.42px        |
| md   | 16px      | 24px        | -0.48px        |
| lg   | 18px      | 22px        | -0.54px        |
| xl   | 20px      | 22px        | -0.60px        |
| 2xl  | 24px      | 32px        | -0.72px        |
| 3xl  | 30px      | 36px        | -0.90px        |
| 4xl  | 36px      | 36px        | -1.08px        |

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

| Prop       | Type                                                                  | Default | Description                                                                                          |
| ---------- | --------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `asChild`  | `boolean`                                                             | —       | Change the default rendered element for the one passed as a child, merging their props and behavior. |
| `size`     | `Responsive<"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl">` | `md`    | Set the text size styles.                                                                            |
| `color`    | `(Responsive<"text" \| "valid" \| "invalid"> & string)`               | `text`  | Set the text color                                                                                   |
| `inverted` | `boolean`                                                             | —       | Inverts the component colours, for use on darker surface colours.                                    |
| `as`       | `"span" \| "div" \| "p"`                                              | —       |                                                                                                      |
