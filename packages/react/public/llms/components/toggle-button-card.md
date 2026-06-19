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
- [ToggleGroup API](#togglegroup-api)
- [ToggleButtonCard API](#togglebuttoncard-api)

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

## ToggleGroup API

This component is based on the `Flex` component.

## ToggleButtonCard API

This component is based on the `button` element and `Flex` component and supports the following common props:

- Flex item

| Prop                          | Type                                                                                                                                                                                                       | Default | Description                                                                                                                                            |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `label`                       | `string`                                                                                                                                                                                                   | —       |                                                                                                                                                        |
| `value`                       | `string`                                                                                                                                                                                                   | —       | A string value for the toggle group item. All items within a toggle group should use a unique value.                                                   |
| `asChild`                     | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `spacing`                     | `"none" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"`                                                                                                                                         | —       | Set responsive spacing between child elements.                                                                                                         |
| `flex`                        | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `flexBasis`                   | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `flexShrink`                  | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `flexGrow`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `display`                     | `Responsive<"none" \| "flex" \| "inline-flex">`                                                                                                                                                            | —       |                                                                                                                                                        |
| `direction`                   | `Responsive<"row" \| "column" \| "row-reverse" \| "column-reverse">`                                                                                                                                       | —       |                                                                                                                                                        |
| `wrap`                        | `Responsive<"wrap" \| "nowrap" \| "wrap-reverse">`                                                                                                                                                         | —       |                                                                                                                                                        |
| `alignContent`                | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                                                                                                               | —       |                                                                                                                                                        |
| `alignItems`                  | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "baseline">`                                                                                                                                      | —       |                                                                                                                                                        |
| `alignSelf`                   | `Responsive<"center" \| "start" \| "end" \| "stretch">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `backgroundColor`             | `"primary" \| "secondary" \| "brand" \| `var(--h-${string})``                                                                                                                                              | —       |                                                                                                                                                        |
| `borderColor`                 | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                                                                                                                                        |
| `borderTopColor`              | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                                                                                                                                        |
| `borderRightColor`            | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                                                                                                                                        |
| `borderBottomColor`           | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                                                                                                                                        |
| `borderLeftColor`             | `"strong" \| `var(--h-${string})` \| "subtle"`                                                                                                                                                             | —       |                                                                                                                                                        |
| `borderRadius`                | `Responsive<"none" \| "inherit" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full">`                                                                                                                        | —       |                                                                                                                                                        |
| `borderRadiusTopLeftNone`     | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusTopRightNone`    | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusBottomLeftNone`  | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusBottomRightNone` | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusTopNone`         | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusRightNone`       | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusBottomNone`      | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderRadiusLeftNone`        | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                        |
| `borderStyle`                 | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                                                                                                                                        |
| `borderTopStyle`              | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                                                                                                                                        |
| `borderRightStyle`            | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                                                                                                                                        |
| `borderBottomStyle`           | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                                                                                                                                        |
| `borderLeftStyle`             | `Responsive<"none" \| "solid">`                                                                                                                                                                            | —       |                                                                                                                                                        |
| `borderWidth`                 | `Responsive<"0" \| `var(--h-${string})` \| "1" \| "2">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderTopWidth`              | `Responsive<"0" \| `var(--h-${string})` \| "1" \| "2">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderRightWidth`            | `Responsive<"0" \| `var(--h-${string})` \| "1" \| "2">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderBottomWidth`           | `Responsive<"0" \| `var(--h-${string})` \| "1" \| "2">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `borderLeftWidth`             | `Responsive<"0" \| `var(--h-${string})` \| "1" \| "2">`                                                                                                                                                    | —       |                                                                                                                                                        |
| `gap`                         | `Responsive<"0" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `rowGap`                      | `Responsive<"0" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `columnGap`                   | `Responsive<"0" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `gridColumnSpan`              | `Responsive<Union<string, "1" \| "2" \| "3" \| "4" \| "5" \| "6" \| "7" \| "8" \| "9" \| "10" \| "11" \| "12">>`                                                                                           | —       |                                                                                                                                                        |
| `gridArea`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridColumn`                  | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridColumnStart`             | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridColumnEnd`               | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridRow`                     | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridRowStart`                | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `gridRowEnd`                  | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `justifyContent`              | `Responsive<"center" \| "start" \| "end" \| "stretch" \| "between" \| "around" \| "evenly">`                                                                                                               | —       | For flexboxes, the stretch value behaves as flex-start or start. This is because, in flexboxes, stretching is controlled using the flex-grow property. |
| `margin`                      | `Responsive<"0" \| "auto" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginTop`                   | `Responsive<"0" \| "auto" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginRight`                 | `Responsive<"0" \| "auto" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginBottom`                | `Responsive<"0" \| "auto" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginLeft`                  | `Responsive<"0" \| "auto" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginX`                     | `Responsive<"0" \| "auto" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `marginY`                     | `Responsive<"0" \| "auto" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |                                                                                                                                                        |
| `opacity`                     | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `order`                       | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `overflow`                    | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                                                                                                                                        |
| `overflowX`                   | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                                                                                                                                        |
| `overflowY`                   | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">`                                                                                                                                        | —       |                                                                                                                                                        |
| `padding`                     | `Responsive<"0" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingTop`                  | `Responsive<"0" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingRight`                | `Responsive<"0" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingBottom`               | `Responsive<"0" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingLeft`                 | `Responsive<"0" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingX`                    | `Responsive<"0" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `paddingY`                    | `Responsive<"0" \| `var(--h-${string})` \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">`           | —       |                                                                                                                                                        |
| `position`                    | `Responsive<"fixed" \| "static" \| "relative" \| "absolute" \| "sticky">`                                                                                                                                  | —       |                                                                                                                                                        |
| `inset`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `top`                         | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `right`                       | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `bottom`                      | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `left`                        | `Responsive<Union<string, "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">>`                    | —       |                                                                                                                                                        |
| `width`                       | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `maxWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `minWidth`                    | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `height`                      | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `maxHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `minHeight`                   | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `textAlign`                   | `Responsive<"center" \| "right" \| "left">`                                                                                                                                                                | —       |                                                                                                                                                        |
| `textTransform`               | `"none" \| "uppercase" \| "lowercase" \| "capitalize"`                                                                                                                                                     | —       | Set the text-transform on the component.                                                                                                               |
| `zIndex`                      | `Responsive<string>`                                                                                                                                                                                       | —       |                                                                                                                                                        |
| `as`                          | `"div" \| "span"`                                                                                                                                                                                          | —       |                                                                                                                                                        |
