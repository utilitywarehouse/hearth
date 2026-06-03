# ExpandableCard

Use `ExpandableCard` to show a summary header with an optional leading icon and helper text, which
can be expanded to reveal additional content.

- [Leading icon](#leading-icon)
- [Default open](#default-open)
- [Controlled](#controlled)
- [ExpandableCardGroup](#expandablecardgroup)
- [Accessibility](#accessibility)
  - [Keyboard interactions](#keyboard-interactions)
- [API](#api)
  - [ExpandableCardGroup](#expandablecardgroup-api)

```tsx
<Box width="400px" marginX="auto">
  <ExpandableCard {...args}>
    <BodyText size="md">
      This is the expandable content area. It can contain any content you need to show when the card
      is expanded.
    </BodyText>
  </ExpandableCard>
</Box>
```

## Alternatives

- Accordion - for when you have multiple
  sections of content that need to be expanded/collapsed independently.

## Leading icon

Use the `leadingIcon` prop to render an icon to the left of the heading. Pass `aria-hidden` to
ensure it is not announced to screen readers. Use `leadingIconContainerColorScheme` to wrap the
icon in a coloured `IconContainer`.

```tsx
<Flex width="400px" direction="column" gap="200">
  <ExpandableCard {...args} leadingIcon={<SettingsMediumIcon aria-hidden />}>
    <BodyText size="md">
      This is the expandable content area. It can contain any content you need to show when the card
      is expanded.
    </BodyText>
  </ExpandableCard>
  <ExpandableCard
    heading="Broadband"
    helperText="Manage your broadband settings"
    leadingIcon={<BroadbandMediumIcon aria-hidden />}
  >
    <BodyText size="md">Your broadband plan details and settings appear here.</BodyText>
  </ExpandableCard>
  <ExpandableCard heading="Broadband" leadingIcon={<BroadbandMediumIcon aria-hidden />}>
    <BodyText size="md">Your broadband plan details and settings appear here.</BodyText>
  </ExpandableCard>
  <ExpandableCard
    heading="Mobile"
    helperText="Manage your mobile settings"
    leadingIcon={<MobileMediumIcon aria-hidden />}
    leadingIconContainerColorScheme="mobile"
  >
    <BodyText size="md">Your mobile plan details and settings appear here.</BodyText>
  </ExpandableCard>
  <ExpandableCard
    heading="Mobile"
    leadingIcon={<MobileMediumIcon aria-hidden />}
    leadingIconContainerColorScheme="mobile"
  >
    <BodyText size="md">Your mobile plan details and settings appear here.</BodyText>
  </ExpandableCard>
</Flex>
```

## Default open

Use `defaultOpen` to render the card in the open state on initial mount. This is an uncontrolled
approach — the card manages its own open/closed state internally after mount.

```tsx
<ExpandableCard heading="Heading" helperText="Helper text" defaultOpen>
  {children}
</ExpandableCard>
```

```tsx
<Box width="400px" marginX="auto">
  <ExpandableCard
    heading="Heading"
    helperText="This card starts expanded"
    leadingIcon={<SettingsMediumIcon aria-hidden />}
    defaultOpen
  >
    <BodyText size="md">
      This card is open by default using the <code>defaultOpen</code> prop.
    </BodyText>
  </ExpandableCard>
</Box>
```

## Controlled

Use the `open` and `onOpenChange` props together to control the open state externally.

```tsx
const [open, setOpen] = React.useState(false);

<ExpandableCard heading="Heading" helperText="Helper text" open={open} onOpenChange={setOpen}>
  {children}
</ExpandableCard>;
```

## ExpandableCardGroup

Use `ExpandableCardGroup` to group multiple `ExpandableCard` components together with a consistent
gap. An optional `heading`, `helperText`, and `trailingContent` can be provided via the built-in
`SectionHeader`.

If the `ExpandableCard` components are closely related, you might be better off
using the `Accordion` component instead, which has built-in support for
grouping related content.

```tsx
<Box width="400px" marginX="auto">
  <ExpandableCardGroup heading="My services" helperText="Manage your UW services">
    <ExpandableCard
      heading="Broadband"
      helperText="Manage your broadband settings"
      leadingIcon={<BroadbandMediumIcon aria-hidden />}
      leadingIconContainerColorScheme="broadband"
    >
      <BodyText size="md">Your broadband plan details and settings appear here.</BodyText>
    </ExpandableCard>
    <ExpandableCard
      heading="Mobile"
      helperText="Manage your mobile settings"
      leadingIcon={<MobileMediumIcon aria-hidden />}
      leadingIconContainerColorScheme="mobile"
    >
      <BodyText size="md">Your mobile plan details and settings appear here.</BodyText>
    </ExpandableCard>
    <ExpandableCard
      heading="Settings"
      helperText="General account settings"
      leadingIcon={<SettingsMediumIcon aria-hidden />}
      leadingIconContainerColorScheme="highlight"
    >
      <BodyText size="md">Your account settings appear here.</BodyText>
    </ExpandableCard>
  </ExpandableCardGroup>
</Box>
```

## Accessibility

Follows the [Disclosure (Show/Hide) WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/).

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
    { key: 'Space', description: 'Toggles the expanded state of the card.' },
    { key: 'Enter', description: 'Toggles the expanded state of the card.' },
    { key: 'Tab', description: 'Moves focus to the next focusable element.' },
    { key: 'Shift+Tab', description: 'Moves focus to the previous focusable element.' },
  ].map((kbi, i, arr) => (
    <>
      <Flex>
        <Box width="300px">
          <kbd>{kbi.key}</kbd>
        </Box>
        <BodyText as="span">{kbi.description}</BodyText>
      </Flex>
      {i < arr.length - 1 ? <Divider /> : null}
    </>
  ))}
</Flex>

## API

This component is based on the `div` element and supports the following common props:

- Margin

| Prop                              | Type                                                                                                                                                                                                       | Default | Description |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------- |
| `heading`                         | `string`                                                                                                                                                                                                   | —       |             |
| `helperText`                      | `string`                                                                                                                                                                                                   | —       |             |
| `leadingIcon`                     | `ReactNode`                                                                                                                                                                                                | —       |             |
| `leadingIconContainerColorScheme` | `"energy" \| "mobile" \| "broadband" \| "insurance" \| "cashback" \| "pig" \| "highlight"`                                                                                                                 | —       |             |
| `badge`                           | `ReactNode`                                                                                                                                                                                                | —       |             |
| `numericValue`                    | `string`                                                                                                                                                                                                   | —       |             |
| `open`                            | `boolean`                                                                                                                                                                                                  | —       |             |
| `defaultOpen`                     | `boolean`                                                                                                                                                                                                  | —       |             |
| `onOpenChange`                    | `((open: boolean) => void)`                                                                                                                                                                                | —       |             |
| `margin`                          | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |             |
| `marginTop`                       | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |             |
| `marginRight`                     | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |             |
| `marginBottom`                    | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |             |
| `marginLeft`                      | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |             |
| `marginX`                         | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |             |
| `marginY`                         | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |             |

### ExpandableCardGroup API

This component is based on the `div` element and supports the following common props:

- Margin

| Prop              | Type                                                                                                                                                                                                       | Default | Description                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------- |
| `heading`         | `string`                                                                                                                                                                                                   | —       | Actual string to display as section header                          |
| `helperText`      | `string`                                                                                                                                                                                                   | —       | Optional helper text to provide additional context or instructions. |
| `trailingContent` | `ReactNode`                                                                                                                                                                                                | —       | Optional trailing content element                                   |
| `headingElement`  | `"h1" \| "h2" \| "h3" \| "h4"`                                                                                                                                                                             | —       |                                                                     |
| `margin`          | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                     |
| `marginTop`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                     |
| `marginRight`     | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                     |
| `marginBottom`    | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                     |
| `marginLeft`      | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                     |
| `marginX`         | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                     |
| `marginY`         | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                     |
