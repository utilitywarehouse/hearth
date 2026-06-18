# Switch

`Switch` is used to indicate switching between two opposing options. Switches
allow users to turn an individual option on or off. They are usually used to
activate or deactivate a specific setting.

```tsx
<Switch size="sm" label="Switch label" />
```

## Sizes

The `Switch` component supports two sizes: `sm` (small) and `md` (medium). You
can control the size using the `size` prop.

```tsx
<Switch size="sm" />
<Switch size="md" />
```

```tsx
<Flex direction="row" gap="200">
  {sizes.map(size => (
    <Switch key={size} {...args} size={size} />
  ))}
</Flex>
```

## Disabled State

The `Switch` can be disabled using the `disabled` prop. When disabled, the
`Switch` is non-interactive and visually indicates its disabled state.

```tsx
<Switch disabled />
<Switch disabled checked />
```

```tsx
<Flex direction="row" gap="200">
  <Switch {...args} />
  <Switch {...args} checked />
</Flex>
```

The disabled `Switch` uses `aria-disabled`, rather than the `disabled`
attribute, so that they are still focusable when using the keyboard. This means
that screen readers are still able to find the button, with the insight that it
is disabled and that there is perhaps an action which needs to be taken, rather
than not knowing there is a button there at all. The `onClick` handler will be
disabled, however you will need to make sure you disable any other expected
actions.

## Responsive Sizes

The `Switch` component supports responsive sizes. You can specify different
sizes for different breakpoints using a responsive object.

```tsx
<Switch size={{ mobile: 'sm', desktop: 'md' }} />
```

### Keyboard Interactions

- **Space**: Toggles the state of the `Switch`.
- **Tab**: Moves focus to the `Switch`.

### Label

Do not use `Switch` without a label. If you do not use the `label` prop, then
please make sure you properly label the component for screen reader users.

```tsx
<Flex direction="column" gap="600">
  <Flex direction="row" gap="200" alignItems="center">
    <BodyText as="label" htmlFor="airplane-mode">
      Airplane mode
    </BodyText>
    <Switch id="airplane-mode" {...args} />
  </Flex>
  <Switch aria-label="airplane-mode" {...args} />
</Flex>
```

## API

This component is based on the `button` element, and supports the following common props:

- Margin

| Prop              | Type                                                                                                                                                                                                       | Default | Description                                       |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------- |
| `label`           | `string`                                                                                                                                                                                                   | —       | The label for the Switch, describing its purpose. |
| `defaultChecked`  | `boolean`                                                                                                                                                                                                  | —       |                                                   |
| `asChild`         | `boolean`                                                                                                                                                                                                  | —       |                                                   |
| `checked`         | `boolean`                                                                                                                                                                                                  | —       |                                                   |
| `size`            | `Responsive<"sm" \| "md">`                                                                                                                                                                                 | —       |                                                   |
| `required`        | `boolean`                                                                                                                                                                                                  | —       |                                                   |
| `onCheckedChange` | `((checked: boolean) => void)`                                                                                                                                                                             | —       |                                                   |
| `margin`          | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                   |
| `marginTop`       | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                   |
| `marginRight`     | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                   |
| `marginBottom`    | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                   |
| `marginLeft`      | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                   |
| `marginX`         | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                   |
| `marginY`         | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                   |
