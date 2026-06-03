# CardAccordion

`CardAccordion` breaks a form journey into multiple collapsible cards, allowing
users to progress step-by-step on a single page while keeping previously
completed steps visible and editable. Each card represents one logical step in
the journey. As the user progresses, completed cards collapse into a summary
view while the next card expands.

- [Usage](#usage)
- [Current content](#current-content)
- [Summary content](#summary-content)
- [Validation](#validation)
- [Footer actions](#footer-actions)
- [Heading levels](#heading-levels)
- [Accessibility](#accessibility)
  - [Keyboard interactions](#keyboard-interactions)
- [API](#api)

```tsx
<Box width="600px">
  <CardAccordion>
    <CardAccordionItem
      value="1a"
      title="1a. Your new cover"
      summaryTitle="1a. Your home"
      summaryDescription={
        <Flex direction="column" gap="50">
          <HelperText>Your type of cover, address & policy start date.</HelperText>
          <BodyText size="lg">31/08/2025</BodyText>
        </Flex>
      }
    >
      <CardAccordionFooter>
        <CardAccordionButton action="next" />
      </CardAccordionFooter>
    </CardAccordionItem>
    <CardAccordionItem
      value="1b"
      title="1b. About your property"
      summaryDescription={
        <HelperText>Details about your property type, ownership, and number of rooms.</HelperText>
      }
    >
      <Box>Content</Box>
      <CardAccordionFooter>
        <CardAccordionButton action="next" />
        <CardAccordionButton action="previous" />
      </CardAccordionFooter>
    </CardAccordionItem>
    <CardAccordionItem
      value="1c"
      title="1c. How your home was built"
      summaryDescription={<HelperText>Summary of your home’s age and construction.</HelperText>}
    >
      <Box>Content</Box>
      <CardAccordionFooter>
        <CardAccordionButton action="previous" />
        <CardAccordionButton action="next" />
      </CardAccordionFooter>
    </CardAccordionItem>
    <CardAccordionItem
      value="1d"
      title="1d. Use of your home"
      summaryDescription={
        <HelperText>Details about who lives in your home and how the property is used.</HelperText>
      }
    >
      <Box>Content</Box>
      <CardAccordionFooter>
        <CardAccordionButton action="previous" />
        <CardAccordionButton action="next" />
      </CardAccordionFooter>
    </CardAccordionItem>
  </CardAccordion>
</Box>
```

## Usage

The steps in a `CardAccordion` are represented by `CardAccordionItem`
components, and consist of 3 possible states: `previous`, `current`, and
`future`.

- `previous` represents a completed step in the journey - The card is collapsed
  and shows a summary of the user’s submitted information, helping users
  quickly review what they have entered. An Edit button allows users to reopen
  the step and update their answers if needed.
- `current` represents the active step the user is currently completing - The
  card is expanded and contains the form inputs required for this stage of the
  journey. A button group is provided to allow users to continue to the next
  step or return to the previous step if needed.
- `future` represents upcoming steps that have not yet been reached - These
  cards are visible to give users an overview of what remains in the journey,
  but they are inactive and cannot be interacted with until earlier steps are
  completed.

Each `CardAccordionItem` component requires a `value` to be able to automatically
determine the state of each item, as a user progresses through all the steps.

```tsx
<CardAccordion>
  <CardAccordionItem value="step-1" title="Step 1: Personal details">
    ...
    <CardAccordionFooter>
      <CardAccordionButton action="next" />
    </CardAccordionFooter>
  </CardAccordionItem>
  <CardAccordionItem value="step-2" title="Step 2: Address details">
    ...
    <CardAccordionFooter>
      <CardAccordionButton action="previous" />
      <CardAccordionButton action="next" />
    </CardAccordionFooter>
  </CardAccordionItem>
  <CardAccordionItem value="step-3" title="Step 3: Payment details">
    ...
    <CardAccordionFooter>
      <CardAccordionButton action="previous" />
    </CardAccordionFooter>
  </CardAccordionItem>
</CardAccordion>
```

## Current content

The main form content, visible when the item is in the `current` state, should
be rendered as a child of `CardAccordionItem`.

## Summary content

When an item is in the `previous` state, you can render an alternative title
and additional content using the `summaryTitle` & `summaryDescription` props.

```tsx
<CardAccordionItem
  value="1a"
  title="1a. Your new cover"
  summaryTitle="1a. Your home"
  summaryDescription={
    <Flex direction="column" gap="50">
      <HelperText>Your type of cover, address & policy start date.</HelperText>
      <BodyText size="lg">31/08/2025</BodyText>
    </Flex>
  }
>
```

## Validation

It is up to you to ensure the current state has been validated before allowing
the user to progress to the next step.

## Footer actions

You must include a `CardAccordionFooter` component within each
`CardAccordionItem` to render the action buttons for each step. The
`CardAccordionButton` component will be either a `next` or `previous` action, and
can render a custom label if necessary.

```tsx
<CardAccordionFooter>
  <CardAccordionButton action="previous">Back to 1a</CardAccordionButton>
  <CardAccordionButton action="next" />
</CardAccordionFooter>
```

## Heading levels

By default the `CardAccordionItem` title renders an `h3` element. If this
doesn't follow the structure of your page, you can use the `headingElement`
prop to change these to an appropriate heading level.

## Accessibility

Follows the [Accordion WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion).

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
      key: 'Space',
      description:
        'When focus is on a CardAccordionTrigger of a collapsed section, expands the section.',
    },
    {
      key: 'Enter',
      description:
        'When focus is on a CardAccordionTrigger of a collapsed section, expands the section.',
    },
    {
      key: 'Tab',
      description: 'Moves focus to the next focusable element.',
    },
    {
      key: 'Shift+Tab',
      description: 'Moves focus to the previous focusable element.',
    },
    {
      key: 'ArrowDown',
      description: 'Moves focus to the next CardAccordionTrigger.',
    },
    {
      key: 'ArrowUp',
      description: 'Moves focus to the previous CardAccordionTrigger.',
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

## API

This component is based on the `div` element and supports the following common props:

- Margin

| Prop            | Type                                                                                                                                                                                                       | Default | Description |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------- |
| `onValueChange` | `((value: string) => void)`                                                                                                                                                                                | —       |             |
| `value`         | `string`                                                                                                                                                                                                   | —       |             |
| `margin`        | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |             |
| `marginTop`     | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |             |
| `marginRight`   | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |             |
| `marginBottom`  | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |             |
| `marginLeft`    | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |             |
| `marginX`       | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |             |
| `marginY`       | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |             |

### CardAccordionItem

| Prop                 | Type                                   | Default | Description                                                                             |
| -------------------- | -------------------------------------- | ------- | --------------------------------------------------------------------------------------- |
| `title`              | `string`                               | —       |                                                                                         |
| `value`              | `string`                               | —       |                                                                                         |
| `disabled`           | `boolean`                              | —       | Whether or not an accordion item is disabled from user interaction. @defaultValue false |
| `description`        | `string`                               | —       |                                                                                         |
| `summaryTitle`       | `string`                               | —       |                                                                                         |
| `summaryDescription` | `ReactNode`                            | —       |                                                                                         |
| `headingElement`     | `"h1" \| "h2" \| "h3" \| "h4"`         | `h3`    |                                                                                         |
| `onEditClick`        | `MouseEventHandler<HTMLButtonElement>` | —       |                                                                                         |

### CardAccordionButton

| Prop           | Type                                                                                                                                                                                                       | Default | Description                                                                                           |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `margin`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                       |
| `marginTop`    | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                       |
| `marginRight`  | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                       |
| `marginBottom` | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                       |
| `marginLeft`   | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                       |
| `marginX`      | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                       |
| `marginY`      | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                       |
| `loading`      | `boolean`                                                                                                                                                                                                  | —       | Indicate when the button is in a loading state, will also disable the button.                         |
| `inverted`     | `boolean`                                                                                                                                                                                                  | —       | Inverts the component colours, for use on darker surface colours.                                     |
| `size`         | `Responsive<"sm" \| "md">`                                                                                                                                                                                 | `md`    | Sets the button height.                                                                               |
| `paddingNone`  | `boolean`                                                                                                                                                                                                  | —       | Remove the inline padding for better alignment with other elements. Only affects the `ghost` variant. |
| `action`       | `"next" \| "previous"`                                                                                                                                                                                     | —       |                                                                                                       |
