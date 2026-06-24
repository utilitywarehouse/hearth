# ToggleButtonCard

```tsx
<Box maxWidth="750px">
  <ToggleGroup
    {...args}
    gap="300"
    type="single"
    value={value}
    direction={{ mobile: 'column', tablet: 'row' }}
    onValueChange={(value: string) => {
      if (value) setValue(value);
    }}
  >
    <ToggleButtonCard
      value="fixed"
      label={value === 'fixed' ? 'Selected plan' : 'Select plan'}
      aria-labelledby="fixed-label fixed-secondary-label"
      aria-describedby="fixed-description"
    >
      <Flex direction="column" gap="200">
        <Heading id="fixed-label" size="md">
          Fixed
        </Heading>
        <Flex id="fixed-secondary-label" direction="row" gap="100" alignItems="baseline">
          <DetailText size="3xl">£163.00</DetailText>
          <BodyText size="md" color="secondary" as="span">
            monthly estimate
          </BodyText>
        </Flex>
        <BodyText id="fixed-description" as="p" size="md">
          Your energy rates will stay the same until December 2025
        </BodyText>
      </Flex>
    </ToggleButtonCard>
    <ToggleButtonCard
      value="variable"
      label={value === 'variable' ? 'Selected plan' : 'Select plan'}
      aria-labelledby="variable-label variable-secondary-label"
      aria-describedby="variable-description"
    >
      <Flex direction="column" gap="200">
        <Heading id="variable-label" size="md">
          Variable
        </Heading>
        <Flex id="variable-secondary-label" direction="row" gap="100" alignItems="baseline">
          <DetailText size="3xl">£153.00</DetailText>
          <BodyText size="md" color="secondary" as="span">
            monthly estimate
          </BodyText>
        </Flex>
        <BodyText id="variable-description" as="p" size="md">
          Your energy rates will stay the same until December 2025
        </BodyText>
      </Flex>
    </ToggleButtonCard>
  </ToggleGroup>
</Box>
```

- [Usage](#usage)
- [ToggleGroup type](#togglegroup-type)
- [Layout](#layout)
- [Interactive content](#interactive-content)
- [Accessibility](#accessibility)
- [ToggleButtonCard API](#togglebuttoncard-api)
- [ToggleGroup API](#togglegroup-api)

## Usage

Use the `ToggleGroup` to wrap `ToggleButtonCard` components.

```tsx
<ToggleGroup>
  <ToggleButtonCard />
  <ToggleButtonCard />
  <ToggleButtonCard />
</ToggleGroup>
```

## ToggleGroup type

`ToggleGroup` can be rendered as one of two types; `single` or `multiple`. The `type` prop is required.

When `type` is set to `multiple`, then multiple items can be selected at once.

```tsx
<ToggleGroup {...args} type="multiple" gap="200">
  {['One', 'Two', 'Three', 'Four'].map((label, value) => (
    <ToggleButtonCard key={value} value={`${value}`} label={label} aria-labelledby="">
      <Placeholder borderColor="subtle" backgroundColor="primary" width="100%" height="50px" />
    </ToggleButtonCard>
  ))}
</ToggleGroup>
```

When `type` is set to `single`, only one item can be selected at once.

```tsx
<ToggleGroup {...args} type="single" gap="200">
  {['One', 'Two', 'Three', 'Four'].map((label, value) => (
    <ToggleButtonCard key={value} value={`${value}`} label={label} aria-labelledby="">
      <Placeholder borderColor="subtle" backgroundColor="primary" width="100%" height="50px" />
    </ToggleButtonCard>
  ))}
</ToggleGroup>
```

You can control the component to ensure there is always a value.

```tsx
{...}

const [value, setValue] = React.useState('2');

{...}

return (
  <ToggleGroup
    type="single"
    value={value}
    onValueChange={(value: string) => {
      if (value) setValue(value);
    }}
  >
  {...}
  </ToggleGroup
)
```

```tsx
<ToggleGroup
  {...args}
  type="single"
  gap="200"
  value={value}
  onValueChange={(value: string) => {
    if (value) setValue(value);
  }}
>
  {['One', 'Two', 'Three', 'Four'].map((label, value) => (
    <ToggleButtonCard key={value} value={`${value}`} label={label} aria-labelledby="">
      <Placeholder borderColor="subtle" backgroundColor="primary" width="120px" height="50px" />
    </ToggleButtonCard>
  ))}
</ToggleGroup>
```

## Layout

The `ToggleGroup` has access to the `Flex` props for controlling layout.

### Start aligned

In cases where the internal button should fit the content, rather than stretch
to fill the available space, you can set the `alignItems` prop to `start` on
the `ToggleButtonCard`.

```tsx
<Box width="750px">
  <ToggleGroup
    {...args}
    gap="300"
    direction="column"
    type="single"
    value={value}
    onValueChange={(value: string) => {
      if (value) setValue(value);
    }}
  >
    <ToggleButtonCard
      value="fixed"
      label={value === 'fixed' ? 'Selected plan' : 'Select plan'}
      aria-labelledby="fixed-label fixed-secondary-label"
      aria-describedby="fixed-description"
      alignItems="start"
    >
      <Flex direction="column" gap="200">
        <Heading id="fixed-label" size="md">
          Fixed
        </Heading>
        <Flex id="fixed-secondary-label" direction="row" gap="100" alignItems="baseline">
          <DetailText size="3xl">£163.00</DetailText>
          <BodyText size="md" color="secondary" as="span">
            monthly estimate
          </BodyText>
        </Flex>
        <BodyText id="fixed-description" as="p" size="md">
          Your energy rates will stay the same until December 2025
        </BodyText>
      </Flex>
    </ToggleButtonCard>
    <ToggleButtonCard
      value="variable"
      label={value === 'variable' ? 'Selected plan' : 'Select plan'}
      aria-labelledby="variable-label variable-secondary-label"
      aria-describedby="variable-description"
      alignItems="start"
    >
      <Flex direction="column" gap="200">
        <Heading id="variable-label" size="md">
          Variable
        </Heading>
        <Flex id="variable-secondary-label" direction="row" gap="100" alignItems="baseline">
          <DetailText size="3xl">£153.00</DetailText>
          <BodyText size="md" color="secondary" as="span">
            monthly estimate
          </BodyText>
        </Flex>
        <BodyText id="variable-description" as="p" size="md">
          Your energy rates will stay the same until December 2025
        </BodyText>
      </Flex>
    </ToggleButtonCard>
  </ToggleGroup>
</Box>
```

## Interactive content

The entire `ToggleButtonCard` is interactive, so if you need to include
additional interactive content, such as a link or button, then you will need to
wrap it in a `CardInteraction` component.

```tsx
<ToggleButtonCard>
  <Flex direction="column" gap="200">

    {...}

    <CardInteraction secondary>
      <Button variant="ghost" size="sm" paddingNone>
        Tariff price breakdown
        <ChevronRightSmallIcon />
      </Button>
    </CardInteraction>

  </Flex>
</ToggleButtonCard>
```

```tsx
<Box width="750px">
  <ToggleGroup
    {...args}
    gap="300"
    type="single"
    value={value}
    onValueChange={(value: string) => {
      if (value) setValue(value);
    }}
  >
    <ToggleButtonCard
      value="fixed"
      label={value === 'fixed' ? 'Selected plan' : 'Select plan'}
      aria-labelledby="fixed-label fixed-secondary-label"
      aria-describedby="fixed-description"
    >
      <Flex direction="column" gap="200">
        <Heading id="fixed-label" size="md">
          Fixed
        </Heading>
        <Flex id="fixed-secondary-label" direction="row" gap="100" alignItems="baseline">
          <DetailText size="3xl">£163.00</DetailText>
          <BodyText size="md" color="secondary" as="span">
            monthly estimate
          </BodyText>
        </Flex>
        <BodyText id="fixed-description" as="p" size="md">
          Your energy rates will stay the same until December 2025
        </BodyText>
        <CardInteraction secondary>
          <Button variant="ghost" size="sm" paddingNone>
            Tariff price breakdown
            <ChevronRightSmallIcon />
          </Button>
        </CardInteraction>
      </Flex>
    </ToggleButtonCard>
    <ToggleButtonCard
      value="variable"
      label={value === 'variable' ? 'Selected plan' : 'Select plan'}
      aria-labelledby="variable-label variable-secondary-label"
      aria-describedby="variable-description"
    >
      <Flex direction="column" gap="200">
        <Heading id="variable-label" size="md">
          Variable
        </Heading>
        <Flex id="variable-secondary-label" direction="row" gap="100" alignItems="baseline">
          <DetailText size="3xl">£153.00</DetailText>
          <BodyText size="md" color="secondary" as="span">
            monthly estimate
          </BodyText>
        </Flex>
        <BodyText id="variable-description" as="p" size="md">
          Your energy rates will stay the same until December 2025.{' '}
          <CardInteraction secondary asChild>
            <InlineLink href="/tariff-price-breakdown">Tariff price breakdown</InlineLink>
          </CardInteraction>
        </BodyText>
      </Flex>
    </ToggleButtonCard>
  </ToggleGroup>
</Box>
```

## Accessibility

As the `ToggleButtonCard` is intended to contain additional information, you
must ensure it is labelled properly so that this information is available to
assistive technologies. This is especially true as the text contents of the
`button` element are likely to not be usefully descriptive.

You should use the `aria-labelledby` and `aria-describedby` props to label the
element with the information it contains:

```tsx
<ToggleButtonCard
  value="fixed"
  // this label is not useful or descriptive
  label={value === 'fixed' ? 'Selected plan' : 'Select plan'}
  // include ids of any text element which describes the main heading
  // information in the card.
  // You can include multiple ids in a space-separated id reference list.
  aria-labelledby="fixed-label fixed-secondary-label"
  // any additional descriptive information can also be included.
  aria-describedby="fixed-description"
>
  <Flex direction="column" gap="200">
    {/* label id on the main heading */}
    <Heading id="fixed-label" size="md">
      Fixed
    </Heading>
    {/* a secondary label id will include all the text contained within it, to be read out by a screenreader. */}
    <Flex id="fixed-secondary-label" direction="row" gap="100" alignItems="baseline">
      <DetailText size="3xl">£163.00</DetailText>
      <BodyText size="md" color="secondary" as="span">
        monthly estimate
      </BodyText>
    </Flex>
    {/* an id for any helpful further description of the content. */}
    <BodyText id="fixed-description" as="p" size="md">
      Your energy rates will stay the same until December 2025
    </BodyText>
  </Flex>
</ToggleButtonCard>
```

Uses [roving tabindex](https://www.w3.org/TR/wai-aria-practices-1.2/examples/radio/radio.html) to manage focus movement among items.

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

## ToggleButtonCard API

This component is based on the `button` element and `Flex` component and
supports the following common props:

- Margin
- Flex item

| Prop    | Type     | Default | Description                                                                                          |
| ------- | -------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `label` | `string` | —       |                                                                                                      |
| `value` | `string` | —       | A string value for the toggle group item. All items within a toggle group should use a unique value. |

## ToggleGroup API

This component is based on the `Flex` component.

| Prop            | Type                                                       | Default    | Description                                                                                                                             |
| --------------- | ---------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `type`          | `"single" \| "multiple"`                                   | `multiple` |                                                                                                                                         |
| `value`         | `string \| string[]`                                       | —          | The controlled stateful value of the item that is pressed. The controlled stateful value of the items that are pressed.                 |
| `onValueChange` | `((value: string) => void) \| ((value: string[]) => void)` | —          | The callback that fires when the value of the toggle group changes. The callback that fires when the state of the toggle group changes. |
