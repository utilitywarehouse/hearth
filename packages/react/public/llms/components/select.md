# Select

`Select` enables users to select an option from a list of choices, and generally requires a final submit action to confirm the selection.

```tsx
<Select {...args}>
  <SelectItem value="1">Item 1</SelectItem>
  <SelectItem value="2">Item 2</SelectItem>
  <SelectItem value="3">Item 3</SelectItem>
  <SelectItem value="4" disabled>
    Item 4
  </SelectItem>
</Select>
```

## Usage

Use the root `Select` component to control the label, helper text and
validation, and to wrap `SelectItem` component's used to display the select
options. A `label` is required on the `Select`.

```tsx
<Select label="Choose one">
  <SelectItem value="1">Item 1</SelectItem>
  <SelectItem value="2">Item 2</SelectItem>
  <SelectItem value="3">Item 3</SelectItem>
</Select>
```

You can change the appearance of the label by using the `labelVariant` prop to
choose between `"heading"` and `"body"` styles.

## Value

By default the selected item's text will be rendered. An optional placeholder
prop is also available for when the select has no value.

## Required

In its default state the `Select` is optional, and is indicated as such
with the `(optional)` text following the label.

When using online forms, most users assume all fields are required by default,
so the `Select` draws attention to when it is optional. Please make sure
that when the input field is required for successful completion of the form,
that you apply the `required` prop and appropriate validation is included.

## Validation

The input `validationStatus` can be set to either `"valid"` or `"invalid"` to
indicate the status. This status must be accompanied by a validation text to
explain the reason for the status.

## Accessibility

Follows the [ListBox WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox).

See the W3C [Select-Only Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/) example for more information.

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
        'When focus is on SelectTrigger, opens the select and focuses the selected item. When focus is on an item, selects the focused item.',
    },
    {
      key: 'Enter',
      description:
        'When focus is on SelectTrigger, opens the select and focuses the first item. When focus is on an item, selects the focused item.',
    },
    {
      key: 'ArrowDown',
      description:
        'When focus is on SelectTrigger, opens the select. When focus is on an item, moves focus to the next item.',
    },
    {
      key: 'ArrowUp',
      description:
        'When focus is on SelectTrigger, opens the select. When focus is on an item, moves focus to the previous item.',
    },
    {
      key: 'Esc',
      description: 'Closes the select and moves focus to SelectTrigger.',
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

This component is based on the `button` element and supports the following common props:

- Margin

| Prop               | Type                        | Default | Description                                                         |
| ------------------ | --------------------------- | ------- | ------------------------------------------------------------------- |
| `label`            | `string`                    | —       | The label for the form field, describing its purpose.               |
| `value`            | `string`                    | —       |                                                                     |
| `defaultValue`     | `string`                    | —       |                                                                     |
| `asChild`          | `boolean`                   | —       |                                                                     |
| `open`             | `boolean`                   | —       |                                                                     |
| `defaultOpen`      | `boolean`                   | —       |                                                                     |
| `onOpenChange`     | `((open: boolean) => void)` | —       |                                                                     |
| `autoComplete`     | `string`                    | —       |                                                                     |
| `required`         | `boolean`                   | —       |                                                                     |
| `onValueChange`    | `((value: string) => void)` | —       |                                                                     |
| `labelId`          | `string`                    | —       |                                                                     |
| `helperTextId`     | `string`                    | —       |                                                                     |
| `validationTextId` | `string`                    | —       |                                                                     |
| `labelVariant`     | `"body" \| "heading"`       | —       | Change the label variant                                            |
| `helperText`       | `string`                    | —       | Optional helper text to provide additional context or instructions. |
| `validationText`   | `string`                    | —       | Text to display when the `validationStatus` is set.                 |
| `validationStatus` | `"valid" \| "invalid"`      | —       | Indicates the validation status.                                    |
| `placeholder`      | `string`                    | —       |                                                                     |

### SelectItem API

This component is based on the `div` element.
