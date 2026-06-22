# Heading

```tsx
<Flex direction="column" gap="100">
  <Heading size="sm">Hamburgefons (sm)</Heading>
  <Heading size="md">Hamburgefons (md)</Heading>
  <Heading size="lg">Hamburgefons (lg)</Heading>
  <Heading size="xl">Hamburgefons (xl)</Heading>
  <Heading size="2xl">Hamburgefons (2xl)</Heading>
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

| Size | Mobile font-size | Mobile line-height | Desktop font-size | Desktop line-height |
| ---- | ---------------- | ------------------ | ----------------- | ------------------- |
| sm   | 18px             | 22px               | 18px              | 22px                |
| md   | 20px             | 24px               | 24px              | 28px                |
| lg   | 24px             | 32px               | 30px              | 36px                |
| xl   | 30px             | 36px               | 40px              | 48px                |
| 2xl  | 44px             | 52px               | 54px              | 62px                |

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

| Prop       | Type                                    | Default | Description                                                                                          |
| ---------- | --------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `as`       | `"h2" \| "h1" \| "h3" \| "h4"`          | `h2`    |                                                                                                      |
| `asChild`  | `boolean`                               | —       | Change the default rendered element for the one passed as a child, merging their props and behavior. |
| `size`     | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `md`    | Set the text size styles.                                                                            |
| `inverted` | `boolean`                               | —       | Inverts the component colours, for use on darker surface colours.                                    |
