# Layout Components

These components focus on creating layouts and can be used as base building
blocks for other components and patterns. These layout primitives are built
upon our design tokens, and providing styling options which make it easier to
apply design decisions coherently.

- [Box](#box)
- [Container](#container)
- [Flex](#flex)
- [Grid](#grid)

## Box

```tsx
// Example usage
<Box {...args}>
  <BodyText>{args.children}</BodyText>
</Box>
```

`Box` is the most fundamental component, and can be used to provide spacing,
size and colour to elements. It can be used to control behaviour of child
elements within `Flex` and `Grid` containers.

You can view the `Box` docs here.

```tsx
// Example usage
<Box
  padding="400"
  marginBottom="300"
  maxWidth={800}
>
  {...}
</Box>
```

## Container

```tsx
// Example usage
<Box backgroundColor={color.red['100']}>
  <Container {...args} backgroundColor="secondary">
    <Box bg={color.blue['400']} p="200" borderRadius="md">
      <BodyText>Container content 1</BodyText>
    </Box>
    <Box bg={color.purple['400']} p="200" borderRadius="md">
      <BodyText>Container content 2</BodyText>
    </Box>
    <Box bg={color.piggyPink['300']} p="200" borderRadius="md">
      <BodyText>Container content 3</BodyText>
    </Box>
  </Container>
</Box>
```

`Container` is a specialised layout component that provides consistent page-level
spacing using the design system's responsive layout tokens. It automatically applies
appropriate margin and padding based on the current breakpoint, making it ideal for
wrapping page content or major sections.

You can view the `Container` docs here.

```tsx
// Example usage
<Container spacing="lg">
  <Box>{...}</Box>
  <Box>{...}</Box>
</Container>
```

When you need custom spacing, you can override the defaults while maintaining
the convenience of the component:

```tsx
// Example usage
<Container
  marginHorizontal="none"
  spacing="xl"
>
  {...}
</Container>
```

## Flex

```tsx
// Example usage
<Flex {...args}>
  {Array.from({ length: 4 }).map((_, index) => (
    <Box
      key={index}
      // @ts-expect-error - This is a playground
      bg={`grey${index + 1}00`}
      w={100 + index * 10}
      h={100 + index * 10}
      borderColor="strong"
      borderWidth="2"
      borderRadius="md"
    />
  ))}
</Flex>
```

`Flex` adds a handy set of props for building with flexbox properties. This
component is useful for defining layouts along an axis, and replaces the `HStack` and `VStack`
component you may have used in other libraries.

You can view the `Flex` docs here.

```tsx
// Example usage
<Flex
  padding="400"
  spacing="md"
  direction="row"
  alignI="center"
>
  {...}
</Flex>
```

## Grid

```tsx
// Example usage
<Grid {...args} style={{ width: 400 }}>
  <GridItem color="#FFD6D6" />
  <GridItem color="#D6FFD6" />
  <GridItem color="#D6D6FF" />
  <GridItem color="#FFFFD6" />
  <GridItem color="#FFD6FF" />
  <GridItem color="#D6FFFF" />
</Grid>
```

`Grid` is used to create grid layouts, organizing content in columns and rows.
Like `Flex` and `Box`, the `Grid` component provides access to a range of
styling props, and to all the properties needed to build a grid layout.

You can easily build responsive layouts using Design System defaults.

You can view the `Grid` docs here.

```tsx
// Example usage
<Grid columns={2} spacing="md">
  <Box>{...}</Box>
  <Box>{...}</Box>
  <Box>{...}</Box>
</Grid>
```
