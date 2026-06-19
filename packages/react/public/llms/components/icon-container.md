# IconContainer

Use the `IconContainer` when using icons that sit within a coloured container.

```tsx
<Flex direction="column" gap="500">
  {sizes.map(size => (
    <Flex key={size} direction="column" gap="200" alignItems="start">
      {variants.map(variant => (
        <Flex key={variant} gap="200" justifyContent="center" direction="row">
          {otherColorSchemes.map(colorScheme => (
            <IconContainer
              key={`${size}${variant}${colorScheme}`}
              variant={variant}
              colorScheme={colorScheme}
              size={size}
            >
              {size === 'sm' ? <PlaceholderSmallIcon /> : <PlaceholderMediumIcon />}
            </IconContainer>
          ))}
          {variant === 'subtle'
            ? subtleOnlyColorSchemes.map(colorScheme => (
                <IconContainer
                  key={`${size}${variant}${colorScheme}`}
                  variant={variant}
                  colorScheme={colorScheme}
                  size={size}
                >
                  {size === 'sm' ? <PlaceholderSmallIcon /> : <PlaceholderMediumIcon />}
                </IconContainer>
              ))
            : null}
        </Flex>
      ))}
    </Flex>
  ))}
</Flex>
```

```tsx
<IconContainer {...args}>
  {args.size === 'sm' ? <PlaceholderSmallIcon /> : <PlaceholderMediumIcon />}
</IconContainer>
```

- [Icons](#icons)
- [Variants](#variants)
- [Sizes](#sizes)
- [Color schemes](#color-schemes)
- [Dead prop combinations](#dead-prop-combinations)
- [Radius none](#radius-none)
- [Fill](#fill)
- [API](#api)

## Icons

The `IconContainer` component is intended to be used with the `@utilitywarehouse/hearth-react-icons` package.

## Variants

The variant prop controls the visual appearance of the Icon container.

```tsx
<Flex gap="200">
  {variants.map(variant => (
    <IconContainer key={variant} variant={variant}>
      <PlaceholderMediumIcon />
    </IconContainer>
  ))}
</Flex>
```

## Sizes

The size prop controls the size of the Icon container. This prop is responsive.

```tsx
<Flex gap="200">
  {sizes.map(size => (
    <IconContainer key={size} size={size}>
      {size === 'sm' ? <PlaceholderSmallIcon /> : <PlaceholderMediumIcon />}
    </IconContainer>
  ))}
</Flex>
```

If you need to render different sized icons in conjunction with the responsive
size prop, there are a couple of ways you can do this.

1. Using JS, with the `useMediaQuery` hook.

```tsx
import { AddMediumIcon, AddSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { IconContainer, useMediaQuery, media } from '@utilitywarehouse/hearth-react';

const MyComponent = () => {
  const showSmallIcon = useMediaQuery(media.below('tablet'));

  return (
    <IconContainer size={{ mobile: 'sm', tablet: 'md', desktop: 'lg' }}>
      {showSmallIcon ? <AddSmallIcon /> : <AddMediumIcon />}
    </IconContainer>
  );
};
```

2. Using CSS, with `Box` and style props.

```tsx
import { AddMediumIcon, AddSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { IconContainer, Box } from '@utilitywarehouse/hearth-react';

const MyComponent = () => (
  <IconContainer size={{ mobile: 'sm', desktop: 'md' }}>
    <Box asChild display={{ mobile: 'none', desktop: 'block' }}>
      <AddMediumIcon />
    </Box>
    <Box asChild display={{ desktop: 'none' }}>
      <AddSmallIcon />
    </Box>
  </IconContainer>
);
```

## Color schemes

The `colorScheme` prop will change the Icon container colours.

```tsx
<Flex gap="200">
  {colorSchemes.map(colorScheme => (
    <IconContainer key={colorScheme} colorScheme={colorScheme}>
      <PlaceholderMediumIcon />
    </IconContainer>
  ))}
</Flex>
```

## Dead prop combinations

Be aware there are some combinations of `colorScheme` & `variant` that do not work together (ie. `emphasis` &
`highlight`), and if used will render an icon container with no colours at all. You will also see a TypeScript error.

## Radius none

Use the border radius common props to remove the default `border-radius`, for
use when the icon container needs to sit flush against the edge of a card.

```tsx
<Flex direction="column" gap="500">
  {sizes.map(size => (
    <Flex key={size} direction="column" gap="200" alignItems="start">
      {variants.map(variant => (
        <Flex key={variant} gap="200" justifyContent="center" direction="row">
          {otherColorSchemes.map(colorScheme => (
            <IconContainer
              key={`${size}${variant}${colorScheme}`}
              variant={variant}
              colorScheme={colorScheme}
              size={size}
              borderRadius="none"
            >
              {size === 'sm' ? <PlaceholderSmallIcon /> : <PlaceholderMediumIcon />}
            </IconContainer>
          ))}
          {variant === 'subtle'
            ? subtleOnlyColorSchemes.map(colorScheme => (
                <IconContainer
                  key={`${size}${variant}${colorScheme}`}
                  variant={variant}
                  colorScheme={colorScheme}
                  size={size}
                  borderRadius="none"
                >
                  {size === 'sm' ? <PlaceholderSmallIcon /> : <PlaceholderMediumIcon />}
                </IconContainer>
              ))
            : null}
        </Flex>
      ))}
    </Flex>
  ))}
</Flex>
```

## Fill

The `fill` prop will remove the `border-radius` and set the size to fill it's
container. You can also use this in conjuntion with the Border Radius common
props to inherit the container border-radius as needed.

```tsx
<Flex direction="row" gap="200">
  <Card width="200px" height="200px" paddingNone>
    <IconContainer fill="both" borderRadius="inherit">
      <PlaceholderSmallIcon />
    </IconContainer>
  </Card>
  <Card width="200px" height="200px" paddingNone>
    <IconContainer
      fill="height"
      borderRadius="none"
      borderTopLeftRadius="inherit"
      borderBottomLeftRadius="inherit"
    >
      <PlaceholderSmallIcon />
    </IconContainer>
  </Card>
  <Card width="200px" height="200px" paddingNone>
    <IconContainer
      fill="width"
      borderRadius="none"
      borderTopLeftRadius="inherit"
      borderTopRightRadius="inherit"
    >
      <PlaceholderSmallIcon />
    </IconContainer>
  </Card>
</Flex>
```

## API

This component is based on the `span` element and supports the following common props:

- Margin
- Border Radius
- Size

| Prop          | Type                                                                                       | Default  | Description                                                                     |
| ------------- | ------------------------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------- |
| `size`        | `Responsive<"sm" \| "md" \| "lg">`                                                         | `md`     | Sets the container size.                                                        |
| `variant`     | `"emphasis" \| "subtle"`                                                                   | `subtle` | Sets the container's visual variant                                             |
| `colorScheme` | `"mobile" \| "energy" \| "broadband" \| "insurance" \| "cashback" \| "pig" \| "highlight"` | `pig`    | Sets the colour scheme.                                                         |
| `fill`        | `"height" \| "width" \| "both"`                                                            | —        | Fill the container height, width or both, rather than having a constrained size |
