# Switch

Use Switch to let users toggle a single setting on or off immediately,
such as activating or deactivating a feature. For choosing between more
than two related options, use ToggleGroup or SegmentedControl instead.
Always provide a `label`, or otherwise label the component for screen
reader users if the visible `label` prop isn't used.

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
than not knowing there is a button there at all. While disabled, the `Switch`
won't toggle and its `onClick` and `onCheckedChange` handlers aren't called.

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

| Prop              | Type                                                                                                                                                                                                                 | Default | Description                                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `form`            | `string`                                                                                                                                                                                                             | —       | Identifies the form that owns the hidden input. Useful when the switch is rendered outside the form.                                                 |
| `label`           | `string`                                                                                                                                                                                                             | —       | The label for the Switch, describing its purpose.                                                                                                    |
| `style`           | `CSSProperties`                                                                                                                                                                                                      | —       |                                                                                                                                                      |
| `className`       | `string`                                                                                                                                                                                                             | —       |                                                                                                                                                      |
| `defaultChecked`  | `boolean`                                                                                                                                                                                                            | `false` | Whether the switch is initially active. To render a controlled switch, use the `checked` prop instead.                                               |
| `id`              | `string`                                                                                                                                                                                                             | —       | The id of the switch element.                                                                                                                        |
| `checked`         | `boolean`                                                                                                                                                                                                            | —       | Whether the switch is currently active. To render an uncontrolled switch, use the `defaultChecked` prop instead.                                     |
| `disabled`        | `boolean`                                                                                                                                                                                                            | `false` | Whether the component should ignore user interaction.                                                                                                |
| `inputRef`        | `Ref<HTMLInputElement>`                                                                                                                                                                                              | —       | A ref to access the hidden `<input>` element.                                                                                                        |
| `name`            | `string`                                                                                                                                                                                                             | —       | Identifies the field when a form is submitted.                                                                                                       |
| `onCheckedChange` | `((checked: boolean, eventDetails: { reason: "none"; event: Event; cancel: () => void; allowPropagation: () => void; isCanceled: boolean; isPropagationAllowed: boolean; trigger: Element \| undefined; }) => void)` | —       | Event handler called when the switch is activated or deactivated.                                                                                    |
| `readOnly`        | `boolean`                                                                                                                                                                                                            | `false` | Whether the user should be unable to activate or deactivate the switch.                                                                              |
| `required`        | `boolean`                                                                                                                                                                                                            | `false` | Whether the user must activate the switch before submitting a form.                                                                                  |
| `value`           | `string`                                                                                                                                                                                                             | —       | The value submitted with the form when the switch is on. By default, switch submits the "on" value, matching native checkbox behavior.               |
| `uncheckedValue`  | `string`                                                                                                                                                                                                             | —       | The value submitted with the form when the switch is off. By default, unchecked switches do not submit any value, matching native checkbox behavior. |
| `size`            | `Responsive<"sm" \| "md">`                                                                                                                                                                                           | `md`    | Sets the Switch size.                                                                                                                                |
