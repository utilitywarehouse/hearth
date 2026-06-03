# CurrencyInput

`CurrencyInput` is an interactive field that specifically used for entering monetary amounts. It’s commonly used across Cashback and payment areas.

```tsx
<Flex direction="column" gap="400">
  <CurrencyInput
    {...args}
    label="Uncontrolled"
    onChange={(event: ChangeEvent<HTMLInputElement>) => console.log(event.target.value)}
  />
  <CurrencyInput
    {...args}
    label="Controlled"
    helperText={`Value: ${value}`}
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
  />
  <CurrencyInput
    {...args}
    required
    label="Group separators"
    value={separatorsValue}
    onChange={(event: ChangeEvent<HTMLInputElement>) => setSeparatorsValue(event.target.value)}
  />
  <CurrencyInput
    {...args}
    required
    label="Group separators disabled"
    disableGroupSeparators
    value={separatorsValue}
    onChange={(event: ChangeEvent<HTMLInputElement>) => setSeparatorsValue(event.target.value)}
  />
</Flex>
```

## Alternatives

- TextInput - For text
- PasswordInput - For passwords
- SearchInput - For search

## Label

A label is required, this should be clear and descriptive to guide the user.

## Formatting

By default the value will be displayed in a readable format, with comma
separated groups of thousands (ie. 1000 -> 1,000). The value will still be
available as a usable numeric format, however you can disable this behaviour
with the `disableGroupSeparators` prop.

## Validation

The input `validationStatus` can be set to either `"valid"` or `"invalid"` to
indicate the status. This status must be accompanied by a validation text to
explain the reason for the status.

## API

This component is based on the `TextInput` component and supports the following common props:

- Margin

| Prop                     | Type                                                                                                                                                                                                       | Default | Description                                                                 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------- |
| `label`                  | `string`                                                                                                                                                                                                   | —       | The label for the form field, describing its purpose.                       |
| `defaultValue`           | `string \| number`                                                                                                                                                                                         | —       | The initial value of the input when rendered.                               |
| `value`                  | `string \| number`                                                                                                                                                                                         | —       | The controlled value of the input. Must be used with an `onChange` handler. |
| `labelId`                | `string`                                                                                                                                                                                                   | —       |                                                                             |
| `helperTextId`           | `string`                                                                                                                                                                                                   | —       |                                                                             |
| `validationTextId`       | `string`                                                                                                                                                                                                   | —       |                                                                             |
| `labelVariant`           | `"body" \| "heading"`                                                                                                                                                                                      | —       | Change the label variant                                                    |
| `helperText`             | `string`                                                                                                                                                                                                   | —       | Optional helper text to provide additional context or instructions.         |
| `validationText`         | `string`                                                                                                                                                                                                   | —       | Text to display when the `validationStatus` is set.                         |
| `validationStatus`       | `"valid" \| "invalid"`                                                                                                                                                                                     | —       | Indicates the validation status.                                            |
| `margin`                 | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                             |
| `marginTop`              | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                             |
| `marginRight`            | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                             |
| `marginBottom`           | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                             |
| `marginLeft`             | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                             |
| `marginX`                | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                             |
| `marginY`                | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                             |
| `disableGroupSeparators` | `boolean`                                                                                                                                                                                                  | —       |                                                                             |
