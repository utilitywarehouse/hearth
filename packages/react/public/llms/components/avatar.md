# Avatar

Use `Avatar` to help humanise the product experience by connecting users with the product and to each other.

```tsx
<Flex direction="row" gap="400">
  <Flex direction="row" gap="200">
    <Avatar size="md" />
    <Avatar size="sm" />
  </Flex>
  <Flex direction="row" gap="200">
    <Avatar size="md" name="Rob Phoenix" />
    <Avatar size="sm" name="Rob Phoenix" />
  </Flex>
  <Flex direction="row" gap="200">
    <Avatar
      size="md"
      src="https://ca.slack-edge.com/T0HR00WDA-UN6U78K0R-afda0a8a2fa7-512"
      name="Rob Phoenix"
    />
    <Avatar
      size="sm"
      src="https://ca.slack-edge.com/T0HR00WDA-UN6U78K0R-afda0a8a2fa7-512"
      name="Rob Phoenix"
    />
  </Flex>
</Flex>
```

```tsx
<Avatar />
```

## Usage

By default `Avatar` will display an icon.

```tsx
<Avatar />
```

If a name is passed then `Avatar` will display initials.

```tsx
<Avatar name="Rob Phoenix" />
```

If a valid image is passed to the `src` prop, then this will be displayed. When
doing this you also need to pass the name of the user in the image, to be used
as an accessible description for the image.

```tsx
<Avatar src="https://ca.slack-edge.com/T0HR00WDA-UN6U78K0R-afda0a8a2fa7-512" name="Rob Phoenix" />
```

## Accessibility

When passing a user image to the `src` prop, you must also pass their name to
the `name` prop so it can be used as an accessible description for the image.

## Image

By default the image will only render when it has loaded. While the image is
loading, or if there has been an error, the user's initials will be rendered.
there was an error. If you notice a flash during loading, you can provide a
`delayMs` prop to delay its rendering so it only renders for those with slower
connections.

## Name

The `name` prop will be used to generate initials used in the `Avatar`, it will
also be used for the `alt` text when an image is provided.

## Sizes

The size prop controls the size of the Avatar. This prop is responsive.

```tsx
<Avatar size={{ mobile: 'sm', desktop: 'md' }} />
```

```tsx
<Flex direction="row" gap="200" alignItems="center">
  <Avatar
    size={{ mobile: 'sm', desktop: 'md' }}
    src="https://ca.slack-edge.com/T0HR00WDA-UN6U78K0R-afda0a8a2fa7-512"
    name="Rob Phoenix"
  />
  <Avatar size={{ mobile: 'sm', desktop: 'md' }} name="Rob Phoenix" />
  <Avatar size={{ mobile: 'sm', desktop: 'md' }} />
</Flex>
```

## API

This component is based on the `img` & `span` elements and supports the following common props:

- Margin

| Prop                    | Type                                                                                                                                                                                                       | Default | Description                                                                                         |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| `onLoadingStatusChange` | `((status: ImageLoadingStatus) => void)`                                                                                                                                                                   | —       |                                                                                                     |
| `delayMs`               | `number`                                                                                                                                                                                                   | —       |                                                                                                     |
| `name`                  | `string`                                                                                                                                                                                                   | —       | Set the name associated with the avatar, used for creating initials, and an accessible description. |
| `size`                  | `Responsive<"sm" \| "md">`                                                                                                                                                                                 | `md`    | Sets the avatar size.                                                                               |
| `margin`                | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                     |
| `marginTop`             | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                     |
| `marginRight`           | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                     |
| `marginBottom`          | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                     |
| `marginLeft`            | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                     |
| `marginX`               | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                     |
| `marginY`               | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                     |
