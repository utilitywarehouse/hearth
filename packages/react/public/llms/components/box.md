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

| Prop      | Type                                                          | Default | Description |
| --------- | ------------------------------------------------------------- | ------- | ----------- |
| `asChild` | `boolean`                                                     | —       |             |
| `display` | `Responsive<"none" \| "inline" \| "inline-block" \| "block">` | —       |             |
| `as`      | `"div" \| "span"`                                             | —       |             |
