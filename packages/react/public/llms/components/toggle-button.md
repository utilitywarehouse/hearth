# ToggleButton

A standalone toggle button for use with `ToggleGroup`. Unlike `ToggleButtonCard`, `ToggleButton` is just the button itself — it has no card wrapper — making it suitable for layouts where the toggle controls live inside a custom container such as a comparison table.

```tsx
<Flex direction="column" gap="200">
  <BodyText as="p" size="md" weight="semibold">
    Unselected
  </BodyText>
  <ToggleGroup type="single" gap="200">
    <ToggleButton value="one">Label</ToggleButton>
    <ToggleButton value="two">Label</ToggleButton>
    <ToggleButton value="three">Label</ToggleButton>
  </ToggleGroup>
  <BodyText as="p" size="md" weight="semibold">
    Selected
  </BodyText>
  <ToggleGroup type="single" defaultValue="one" gap="200">
    <ToggleButton value="one">Label</ToggleButton>
    <ToggleButton value="two">Label</ToggleButton>
    <ToggleButton value="three">Label</ToggleButton>
  </ToggleGroup>
</Flex>
```

```tsx
<ToggleGroup type="single" gap="200">
  <ToggleButton {...args} value="one" />
  <ToggleButton {...args} value="two" />
  <ToggleButton {...args} value="three" />
</ToggleGroup>
```

- [Usage](#usage)
- [ToggleGroup type](#togglegroup-type)
- [Tariff comparison pattern](#tariff-comparison-pattern)
- [Accessibility](#accessibility)
- [ToggleGroup API](#togglegroup-api)
- [ToggleButton API](#togglebutton-api)

## Usage

Wrap `ToggleButton` components in a `ToggleGroup`. The `value` prop on each button is required and must be unique within the group.

```tsx
<ToggleGroup type="single">
  <ToggleButton value="fixed">Select plan</ToggleButton>
  <ToggleButton value="variable">Select plan</ToggleButton>
</ToggleGroup>
```

## ToggleGroup type

`ToggleGroup` supports `single` (one item selected at a time) and `multiple` (any number of items can be selected simultaneously).

```tsx
<ToggleGroup type="single" gap="200">
  {['One', 'Two', 'Three', 'Four'].map(label => (
    <ToggleButton key={label} value={label.toLowerCase()}>
      {label}
    </ToggleButton>
  ))}
</ToggleGroup>
```

```tsx
<ToggleGroup type="multiple" gap="200">
  {['One', 'Two', 'Three', 'Four'].map(label => (
    <ToggleButton key={label} value={label.toLowerCase()}>
      {label}
    </ToggleButton>
  ))}
</ToggleGroup>
```

## Tariff comparison pattern

When individual toggle buttons need to live inside a custom layout — such as a comparison table where each column has its own `ToggleButton` — wrap all buttons in a single `ToggleGroup` and place the `ToggleButton` inside each column independently.

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

`ToggleButton` is built on the Radix UI `ToggleGroup.Item` primitive and uses [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.2/examples/radio/radio.html) for keyboard navigation.

When the button label alone is not descriptive enough (e.g. "Select plan"), use `aria-label` or `aria-labelledby`/`aria-describedby` to associate it with surrounding context.

## ToggleGroup API

This component is based on the `Flex` component.

## ToggleButton API

This component is based on the `button` element and supports the following common props:

- Flex item

| Prop         | Type                 | Default | Description                                                                                          |
| ------------ | -------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `value`      | `string`             | —       | A string value for the toggle group item. All items within a toggle group should use a unique value. |
| `flex`       | `Responsive<string>` | —       |                                                                                                      |
| `flexBasis`  | `Responsive<string>` | —       |                                                                                                      |
| `flexShrink` | `Responsive<string>` | —       |                                                                                                      |
| `flexGrow`   | `Responsive<string>` | —       |                                                                                                      |
