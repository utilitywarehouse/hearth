# Strong

The `Strong` component is based on the HTML `strong` element and is used to indicate text that is of
strong importance, seriousness, or urgency. `Strong` should be wrapped in a `BodyText` component,
and will inherit its styles from its parent. You can also use this component within the `Heading`
component, however as `Heading` has only one font-weight there will be no visual distinction, and
so this is discouraged.

```tsx
<Flex direction="column" gap="100">
  {sizes.map(size => (
    <BodyText key={size} size={size}>
      The most important thing to remember is, <Strong>stay positive</Strong>.
    </BodyText>
  ))}
</Flex>
```

## Alternatives

- BodyText - For body text
- DetailText - For detail text
- Heading - For heading-level text
- Em - For emphasis

## API

This component is based on the `strong` element and supports the following common props:

- Margin
- Text transform
- Text align
- Text wrap

| Prop       | Type      | Default | Description                                                                                                                                                                                                                           |
| ---------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asChild`  | `boolean` | —       | Change the default rendered element for the one passed as a child, merging their props and behavior.                                                                                                                                  |
| `truncate` | `boolean` | —       | If true, the text will not wrap, but instead will truncate with a text overflow ellipsis. Note that text overflow can only happen with block or inline-block level elements (the element needs to have a width in order to overflow). |
