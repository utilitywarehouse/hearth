# Layout

These components focus on creating layouts and can be used as base building
blocks for other components and patterns. These layout primitives are built
upon our design tokens, and provide styling options which make it easier to
apply design decisions coherently.

## Box

```tsx
<Box {...args} />
```

`Box` is the most fundamental component, and can be used to provide spacing,
size and colour to elements. It can be used to control behaviour of child
elements within `flexbox` and `grid` containers, and to show or hide content
responsively.

```tsx
<Box
  display={{ mobile: "none", tablet: "block" }}
  padding={{ tablet: "200", desktop: "400" }}
  marginBottom="300"
  maxWidth="800px"
>
  {...}
</Box>
```

## Flex

```tsx
<Flex {...args}>
  <Placeholder padding="600" />
  <Placeholder padding="600" />
  <Placeholder padding="600" />
  <Placeholder padding="600" />
</Flex>
```

`Flex` takes everything `Box` can do, and adds a handy set of props for
building with CSS flexbox properties. This component is useful for defining
layouts along an axis, and replaces the `Stack` component you may have used in
other libraries.

```tsx
<Flex
  padding="400"
  gap={{ mobile: "200", desktop: "400" }}
  direction={{ mobile: 'column', desktop: 'row' }}
  alignItems="center"
>
  {...}
</Flex>
```

## Grid

```tsx
<Grid {...args}>
  <Placeholder padding="400" />
  <Placeholder padding="400" />
  <Placeholder padding="400" />
  <Placeholder padding="400" />
  <Placeholder padding="400" />
  <Placeholder padding="400" />
</Grid>
```

`Grid` is used to create grid layouts, organizing content in columns and rows.
Like `Flex` and `Box`, the `Grid` component provides access to a range of
styling props, and to all the properties needed to build with CSS grid.

You can easily build responsive layouts using Design System defaults.

```tsx
<Grid defaultResponsiveColumns>
  <Box gridItemColumns="4">{...}</Box>
  <Box gridItemColumns="4">{...}</Box>
  <Box gridItemColumns={{ mobile: '4', tablet: '8', desktop: '4' }}>{...}</Box>
</Grid>
```

As well as more complicated grid layouts.

```tsx
<Grid
  gap="100"
  templateColumns="100px 100px 100px 100px"
  templateRows="auto"
  templateAreas='"header header header header" "main main . sidebar" "footer footer footer footer"'
>
  <Box gridArea="header">Header</Box>
  <Box gridArea="main">Main</Box>
  <Box gridArea="sidebar">Sidebar</Box>
  <Box gridArea="footer">Footer</Box>
</Grid>
```

## Container

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

`Container` provides a page content container, constraining the width, while
providing responsive padding, gutters and vertical spacing.

```tsx
<Container spacing='xl'>
  {...}
</Container>
```
