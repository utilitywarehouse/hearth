# TextArea

`TextArea` is a multi-line text input field that allows users to enter longer text content.

```tsx
<TextArea {...args} />
```

- [Label](#label)
- [Helper Text](#helper-text)
- [Validation](#validation)
- [Disabled and Read-only](#disabled-and-read-only)
- [Custom Rows](#custom-rows)
- [Height](#height)
- [Controlled Usage](#controlled-usage)
- [API](#api)

## Label

A label is required for the `TextArea` component. It should clearly describe
the purpose of the field.

## Helper Text

You can provide additional context or instructions using the `helperText` prop.

## Validation

The `validationStatus` prop can be set to either `"valid"` or `"invalid"` to
indicate the validation state. This must be accompanied by a `validationText`
to explain the reason for the status.

```tsx
<Flex direction="column" gap="400">
  <TextArea
    {...args}
    label="Valid TextArea"
    validationStatus="valid"
    validationText="Looks good!"
    value="This is valid input."
  />
  <TextArea
    {...args}
    label="Invalid TextArea"
    validationStatus="invalid"
    validationText="Please correct the error."
    value="This is invalid input."
  />
</Flex>
```

## Disabled and Read-only

- **Disabled**: The `disabled` prop prevents user interaction with the `TextArea`.
- **Read-only**: The `readOnly` prop allows the field to be focusable but not editable.

```tsx
<Flex direction="column" gap="400">
  <TextArea {...args} label="Disabled" disabled helperText="This field is disabled." />
  <TextArea
    {...args}
    label="Read-only"
    readOnly
    value="This is a read-only text area."
    helperText="This field is read-only."
  />
</Flex>
```

## Custom Rows

You can control the number of visible rows using the `rows` prop.

```tsx
<Flex direction="column" gap="400">
  <TextArea {...args} label="3 Rows" rows={3} />
  <TextArea {...args} label="5 Rows" rows={5} />
  <TextArea {...args} label="10 Rows" rows={10} />
</Flex>
```

## Height

You can set a minimum and maximum height for the `TextArea` using the `minHeight` & `maxHeight` props.

```tsx
<TextArea {...args} />
```

## Controlled Usage

The `TextArea` can be used as a controlled component by managing its `value` and `onChange` props.

```tsx
const [value, setValue] = React.useState<string>('Initial value');
return (
  <TextArea
    {...args}
    value={value}
    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)}
    label="Controlled TextArea"
  />
);
```

```tsx
<TextArea
  {...args}
  value={value}
  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)}
  label="Controlled TextArea"
/>
```

## API

This component is based on the `textarea` element, and supports the following common props:

- Margin

| Prop               | Type                                             | Default  | Description                                                                    |
| ------------------ | ------------------------------------------------ | -------- | ------------------------------------------------------------------------------ |
| `label`            | `string`                                         | —        | The label for the form field, describing its purpose.                          |
| `value`            | `string`                                         | —        | The controlled value of the TextArea. Must be used with an `onChange` handler. |
| `labelId`          | `string`                                         | —        |                                                                                |
| `helperTextId`     | `string`                                         | —        |                                                                                |
| `validationTextId` | `string`                                         | —        |                                                                                |
| `labelVariant`     | `"body" \| "heading"`                            | —        | Change the label variant                                                       |
| `helperText`       | `string`                                         | —        | Optional helper text to provide additional context or instructions.            |
| `validationText`   | `string`                                         | —        | Text to display when the `validationStatus` is set.                            |
| `validationStatus` | `"valid" \| "invalid"`                           | —        | Indicates the validation status.                                               |
| `resize`           | `"none" \| "both" \| "horizontal" \| "vertical"` | `"both"` | Controls the resize behavior of the TextArea.                                  |
| `minHeight`        | `Responsive<string>`                             | —        | Sets the minimum height of the TextArea.                                       |
| `maxHeight`        | `Responsive<string>`                             | —        | Sets the maximum height of the TextArea.                                       |
