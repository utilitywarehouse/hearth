# ToggleButton

A standalone toggle button for use with `ToggleGroup`. Unlike
`ToggleButtonCard`, `ToggleButton` is just the button itself - it has no card
wrapper - making it suitable for layouts where the toggle controls live inside
a custom container such as a comparison table.

```tsx
<ToggleGroup type="single" gap="200">
  <ToggleButton {...args} value="one" />
  <ToggleButton {...args} value="two" />
  <ToggleButton {...args} value="three" />
</ToggleGroup>
```

- [Usage](#usage)
- [ToggleGroup type](#togglegroup-type)
- [Custom layout](#custom-layout)
- [Accessibility](#accessibility)
- [ToggleButton API](#togglebutton-api)
- [ToggleGroup API](#togglegroup-api)

## Usage

Wrap `ToggleButton` components in a `ToggleGroup`. The `value` prop on each
button is required and must be unique within the group.

```tsx
<ToggleGroup type="single">
  <ToggleButton value="fixed">Select plan</ToggleButton>
  <ToggleButton value="variable">Select plan</ToggleButton>
</ToggleGroup>
```

## ToggleGroup type

`ToggleGroup` supports `single` (one item selected at a time) and `multiple`
(any number of items can be selected simultaneously).

### Single

```tsx
<ToggleGroup type="single" gap="200">
  {['One', 'Two', 'Three', 'Four'].map(label => (
    <ToggleButton key={label} value={label.toLowerCase()}>
      {label}
    </ToggleButton>
  ))}
</ToggleGroup>
```

### Multiple

```tsx
<ToggleGroup type="multiple" gap="200">
  {['One', 'Two', 'Three', 'Four'].map(label => (
    <ToggleButton key={label} value={label.toLowerCase()}>
      {label}
    </ToggleButton>
  ))}
</ToggleGroup>
```

## Custom layout

Within a `ToggleGroup`, `ToggleButton` can be used in any layout, including
flex and grid containers.

```tsx
<ToggleGroup type="single" value={selected} onValueChange={...} gap="300">
  {tariffs.map(tariff => (
    <Flex key={tariff.id} direction="column" gap="200" flex="1">
      {/* tariff details */}
      <Divider />
      <ToggleButton value={tariff.id}>
        {selected === tariff.id ? 'Selected plan' : 'Select plan'}
      </ToggleButton>
    </Flex>
  ))}
</ToggleGroup>
```

```tsx
<Box maxWidth="800px">
  <ToggleGroup
    type="single"
    value={selected}
    onValueChange={(value: string) => {
      if (value) setSelected(value);
    }}
    gap="300"
  >
    {tariffs.map(tariff => (
      <Flex key={tariff.id} direction="column" gap="200" flex="1">
        <Flex direction="row" gap="100" alignItems="baseline">
          <DetailText size="3xl">{tariff.price}</DetailText>
          <BodyText size="md" color="secondary" as="span">
            /month est.
          </BodyText>
        </Flex>
        <Heading size="sm" as="h3">
          {tariff.name}
        </Heading>
        <BodyText as="p" size="md">
          {tariff.description}
        </BodyText>
        <Divider />
        <ToggleButton value={tariff.id} style={{ width: '100%' }}>
          {selected === tariff.id ? 'Selected plan' : 'Select plan'}
        </ToggleButton>
      </Flex>
    ))}
  </ToggleGroup>
</Box>
```

## Accessibility

Uses [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.2/examples/radio/radio.html)
to manage focus movement among items.

When the button label alone is not descriptive enough, use `aria-label` or
`aria-labelledby`/`aria-describedby` to associate it with surrounding context.

### Keyboard interactions

<Flex direction="column" gap="200" className="sb-unstyled">
  <Flex>
    <Box width="300px">
      <BodyText as="span" weight="bold">
        Key
      </BodyText>
    </Box>
    <BodyText as="span" weight="bold">
      Description
    </BodyText>
  </Flex>
  <Divider />
  {[
    {
      key: 'Tab',
      description: 'Moves focus to either the pressed item or the first item in the group.',
    },
    {
      key: 'Space',
      description: 'Activates/deactivates the item.',
    },
    {
      key: 'Enter',
      description: 'Activates/deactivates the item.',
    },
    {
      key: 'ArrowDown',
      description: 'Moves focus to the next item in the group.',
    },
    {
      key: 'ArrowRight',
      description: 'Moves focus to the next item in the group.',
    },
    {
      key: 'ArrowUp',
      description: 'Moves focus to the previous item in the group.',
    },
    {
      key: 'ArrowLeft',
      description: 'Moves focus to the previous item in the group.',
    },
    {
      key: 'Home',
      description: 'Moves focus to the first item.',
    },
    {
      key: 'End',
      description: 'Moves focus to the last item.',
    },
  ].map((kbi, i) => (
    <>
      <Flex>
        <Box width="300px">
          <kbd>{kbi.key}</kbd>
        </Box>
        <BodyText as="span">{kbi.description}</BodyText>
      </Flex>
      {i < 4 ? <Divider /> : null}
    </>
  ))}
</Flex>

## ToggleButton API

This component is based on the `button` element and supports the following common props:

- Margin
- Flex item

| Prop    | Type     | Default | Description                                                                                          |
| ------- | -------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `value` | `string` | —       | A string value for the toggle group item. All items within a toggle group should use a unique value. |

## ToggleGroup API

This component is based on the `Flex` component.

| Prop            | Type                                                       | Default    | Description                                                                                                                             |
| --------------- | ---------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `type`          | `"single" \| "multiple"`                                   | `multiple` |                                                                                                                                         |
| `value`         | `string \| string[]`                                       | —          | The controlled stateful value of the item that is pressed. The controlled stateful value of the items that are pressed.                 |
| `onValueChange` | `((value: string) => void) \| ((value: string[]) => void)` | —          | The callback that fires when the value of the toggle group changes. The callback that fires when the state of the toggle group changes. |
