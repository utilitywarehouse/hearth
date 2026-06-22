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
