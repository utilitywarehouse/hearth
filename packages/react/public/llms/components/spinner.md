# Spinner

Using a Spinner is a common method for indicating that an asynchronous process is ongoing.

```tsx
<Flex gap="600">
  {sizes.map(size => (
    <Spinner key={size} size={size} />
  ))}
</Flex>
```

```tsx
<Spinner size="md" />
```

## Size

The size prop is responsive, so you can render different sizes at different breakpoints.

```tsx
<Spinner size={{ mobile: 'sm', tablet: 'md', desktop: 'lg' }} />
```

## Color

The color prop allows you to set the strok width colour to any of the colour token values.

```tsx
<Spinner color="uwPurple" />
```

If you are using the `Spinner` as an element within a parent component, and
need it to inherit the parent's colour scheme, you can set the `currentColor`
prop.

```tsx
<Spinner currentColor />
```

## API

This component is based on the `div` element and supports the following common props:

- Color
- Margin

| Prop           | Type                                       | Default | Description                                                                                                                     |
| -------------- | ------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `size`         | `Responsive<"xs" \| "sm" \| "md" \| "lg">` | `md`    | Sets the button height.                                                                                                         |
| `currentColor` | `boolean`                                  | —       | Sets the Spinner stroke colour to `currentColor`. For use when the Spinner needs to inherit a parent component's colour scheme. |
