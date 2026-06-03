# Badge

A `Badge` is a visual label or indicator used to convey status or highlight content. Badges are read-only status indicators or labels and are not interactive.

```tsx
<Flex direction="column" gap="500">
  {sizes.map(size => (
    <Flex key={size} direction="column" gap="200" alignItems="start">
      {variants.map(variant => (
        <Flex key={variant} gap="200" justifyContent="center" direction="row">
          {allVariantColorSchemes.map(colorScheme => (
            <Badge
              key={`${size}${variant}${colorScheme}`}
              variant={variant}
              colorScheme={colorScheme}
              size={size}
            >
              Badge
            </Badge>
          ))}
          {variant !== 'outline'
            ? nonOutlineColorSchemes.map(colorScheme => (
                <Badge
                  key={`${size}${variant}${colorScheme}`}
                  variant={variant}
                  colorScheme={colorScheme}
                  size={size}
                >
                  Badge
                </Badge>
              ))
            : null}
          {variant === 'subtle'
            ? subtleOnlyColorSchemes.map(colorScheme => (
                <Badge
                  key={`${size}${variant}${colorScheme}`}
                  variant={variant}
                  colorScheme={colorScheme}
                  size={size}
                >
                  Badge
                </Badge>
              ))
            : null}
        </Flex>
      ))}
    </Flex>
  ))}
</Flex>
```

```tsx
<Badge variant="subtle" size="md" colorScheme="info">
  Badge
</Badge>
```

## Variants

The variant prop controls the visual appearance of the Badge.

```tsx
<Flex gap="200">
  <Badge variant="subtle">Subtle</Badge>
  <Badge variant="emphasis">Emphasis</Badge>
  <Badge variant="outline">Outline</Badge>
</Flex>
```

## Sizes

The size prop controls the size of the Badge. This prop is responsive.

```tsx
<Flex gap="200" alignItems="center">
  <Badge size="sm">Small</Badge>
  <Badge size="md">Medium</Badge>
  <Badge size={{ mobile: 'sm', desktop: 'md' }}>Responsive</Badge>
</Flex>
```

## Color schemes

The `colorScheme` prop will change the Badge colours.

```tsx
<Flex gap="200" wrap="wrap">
  <Badge colorScheme="info">Info</Badge>
  <Badge colorScheme="positive">Positive</Badge>
  <Badge colorScheme="danger">Danger</Badge>
  <Badge colorScheme="warning">Warning</Badge>
  <Badge colorScheme="functional">Functional</Badge>
  <Badge colorScheme="energy">Energy</Badge>
  <Badge colorScheme="mobile">Mobile</Badge>
  <Badge colorScheme="broadband">Broadband</Badge>
</Flex>
```

## Dead prop combinations

Be aware there are some combinations of `colorScheme` & `variant` that do not work together (ie. `emphasis` &
`highlight`), and if used will render a button with no colours at all. You will also see a TypeScript error.

## Flat Base

The `flatBase` will remove the `border-bottom-right-radius` and `border-bottom-left-radius`, for use when the badge is positioned on top of another element.

```tsx
<Box>
  <Flex justifyContent="end" paddingRight="300" width="400px">
    <Badge colorScheme="positive" variant="emphasis" size="sm" flatBase>
      Multi SIM offer
    </Badge>
  </Flex>
  <Card width="400px" height="200px" colorScheme="neutralSubtle" />
</Box>
```

## Icons

You can enhance the your badge's meaning by adding a small icon to the
left. This icon is not an interactive icon button; its purpose is to reinforce
the meaning of the text.

```tsx
<Flex gap="200">
  <Badge colorScheme="positive">
    <TickSmallIcon />
    Success
  </Badge>
  <Badge colorScheme="danger">
    <CloseSmallIcon />
    Unsuccessful
  </Badge>
</Flex>
```

## API

This component is based on the `span` element and supports the following common props:

- Margin
- Text transform

| Prop            | Type                                                                                                                                                                                                       | Default  | Description                                                                         |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------- |
| `variant`       | `"emphasis" \| "subtle" \| "outline"`                                                                                                                                                                      | `subtle` | Sets the badges's visual variant                                                    |
| `size`          | `Responsive<"sm" \| "md">`                                                                                                                                                                                 | `md`     | Sets the badge size.                                                                |
| `colorScheme`   | `"mobile" \| "info" \| "positive" \| "danger" \| "warning" \| "functional" \| "energy" \| "broadband" \| "insurance" \| "cashback" \| "pig" \| "highlight"`                                                | `info`   | Sets the colour scheme.                                                             |
| `flatBase`      | `boolean`                                                                                                                                                                                                  | `false`  | Removes the bottom radius, set when the Badge sits directly above another container |
| `margin`        | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —        |                                                                                     |
| `marginTop`     | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —        |                                                                                     |
| `marginRight`   | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —        |                                                                                     |
| `marginBottom`  | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —        |                                                                                     |
| `marginLeft`    | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —        |                                                                                     |
| `marginX`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —        |                                                                                     |
| `marginY`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —        |                                                                                     |
| `textTransform` | `"none" \| "uppercase" \| "lowercase" \| "capitalize"`                                                                                                                                                     | —        | Set the text-transform on the component.                                            |
