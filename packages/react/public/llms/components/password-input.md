# PasswordInput

`PasswordInput` is an interactive field that is used to securely collect users passwords.

```tsx
<PasswordInput {...args} />
```

## Alternatives

- TextInput - For text
- SearchInput - For search
- CurrencyInput - For money

## Label

A label is required, this should be clear and descriptive to guide the user.

## Disabled and Read-only

Read-only inputs can not be edited, but remain focusable, and should only be
used readonly when presenting already submitted information. They differ from
disabled inputs, as there may be actions a user can take to activate a disabled
input, but read-only fields should stay undeditable in the same view.

```tsx
<Flex direction="column" gap="400">
  <PasswordInput {...args} label="Disabled" disabled helperText="Please enter you username first" />
  <PasswordInput {...args} label="Read only" readOnly value="password123" />
</Flex>
```

## Validation

The input `validationStatus` can be set to either `"valid"` or `"invalid"` to
indicate the status. This status must be accompanied by a validation text to
explain the reason for the status.

```tsx
<Flex direction="column" gap="400">
  <PasswordInput
    {...args}
    label="Password"
    value="password123"
    validationStatus="valid"
    validationText="Strong password"
  />
  <PasswordInput
    {...args}
    label="Password"
    value="short"
    validationStatus="invalid"
    validationText="Please enter a password with at least 73 characters"
  />
</Flex>
```

## Autocomplete

Use the `autocomplete` attribute on password inputs to help users complete forms
faster.

Autocomplete indicates to browsers and password managers what kind of password
is needed so it can be entered for the user.

Set the autocomplete attribute to `new-password` if the user is creating a
password. Otherwise, use `current-password`.

## API

This component is based on the `TextInput` component and supports the following common props:

- Margin

| Prop               | Type                                                                                                                                                                                                       | Default | Description                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------- |
| `label`            | `string`                                                                                                                                                                                                   | —       | The label for the form field, describing its purpose.                       |
| `defaultValue`     | `string \| number`                                                                                                                                                                                         | —       | The initial value of the input when rendered.                               |
| `value`            | `string \| number`                                                                                                                                                                                         | —       | The controlled value of the input. Must be used with an `onChange` handler. |
| `labelId`          | `string`                                                                                                                                                                                                   | —       |                                                                             |
| `helperTextId`     | `string`                                                                                                                                                                                                   | —       |                                                                             |
| `validationTextId` | `string`                                                                                                                                                                                                   | —       |                                                                             |
| `labelVariant`     | `"body" \| "heading"`                                                                                                                                                                                      | —       | Change the label variant                                                    |
| `helperText`       | `string`                                                                                                                                                                                                   | —       | Optional helper text to provide additional context or instructions.         |
| `validationText`   | `string`                                                                                                                                                                                                   | —       | Text to display when the `validationStatus` is set.                         |
| `validationStatus` | `"valid" \| "invalid"`                                                                                                                                                                                     | —       | Indicates the validation status.                                            |
| `margin`           | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                             |
| `marginTop`        | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                             |
| `marginRight`      | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                             |
| `marginBottom`     | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                             |
| `marginLeft`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                             |
| `marginX`          | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                             |
| `marginY`          | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                             |
