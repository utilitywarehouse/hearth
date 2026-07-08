# TextInput

`TextInput` is an interactive field that allows users to enter text and data.

```tsx
<TextInput {...args} />
```

- [Alternatives](#alternatives)
- [Label](#label)
- [Required](#required)
- [Disabled and Read-only](#disabled-and-read-only)
- [Validation](#validation)
- [Prefix and Suffix](#prefix-and-suffix)
- [Grouping inputs](#grouping-inputs)
- [API](#api)

## Alternatives

- PasswordInput - For entering
  passwords
- SearchInput - For search
- CurrencyInput - For money
- VerificationInput - For one-time
  passwords
- DateInput - For entering dates

## Label

A label is required, this should be clear and descriptive to guide the user.

The `hideLabel` prop will visually hide the label but keep it available for screen readers.

## Required

In it's default state the `TextInput` is optional, and is indicated as such
with the `(optional)` text following the label.

When using online forms, most users assume all fields are required by default,
so the `TextInput` draws attention to when it is optional. Please make sure
that when the input field is required for successful completion of the form,
that you apply the `required` prop and appropriate validation is included.

You may also need to set the `novalidate` attribute to prevent the browser from
displaying its own validation errors.

## Disabled and Read-only

Read-only inputs cannot be edited, but remain focusable, and should only be
used when presenting already submitted information. They differ from
disabled inputs, as there may be actions a user can take to activate a disabled
input, but read-only fields should stay undeditable in the same view.

```tsx
<Flex direction="column" gap="400">
  <TextInput {...args} label="Disabled" disabled helperText="Please do something before this" />
  <TextInput
    {...args}
    label="Read only"
    readOnly
    value="Uneditable previously provided information"
  />
</Flex>
```

## Validation

The input `validationStatus` can be set to either `"valid"` or `"invalid"` to
indicate the status. This status must be accompanied by the `validationText` to
explain the reason for the status.

```tsx
<Flex direction="column" gap="400">
  <TextInput
    {...args}
    label="Email"
    type="email"
    defaultValue="design-systems@uw.co.uk"
    validationStatus="valid"
    validationText="Valid email address"
    required
  />
  <TextInput
    {...args}
    label="Email"
    type="email"
    defaultValue="rphoenix@geemail."
    validationStatus="invalid"
    validationText="Please enter a valid email address"
    required
  />
</Flex>
```

You can set the `validationText` according to what the `validationStatus` is:

```tsx
const validationStatus = isValid ? "valid" : isInvalid ? "invalid" : undefined
const validationText = isValid ? "Your input is valid" : isInvalid ? "Your input is invalid" : undefined

[...]

<TextInput
  label="Name"
  required
  validationStatus={validationStatus}
  validationText={validationText}
/>
```

Be aware that you probably want to set `noValidate` on your form to prevent
the browser from displaying its own validation messages.

```tsx
<form noValidate>
  <TextInput
    label="Name"
    required
    validationStatus="invalid"
    validationText="Please enter your name"
  />
</form>
```

## Prefix and Suffix

To include a prefix or suffix in the `TextInput` you need to wrap the content
in the `InputSlot` component. You can then set the `placement` prop on the
`InputSlot` component to display it as either a `prefix` or a `suffix`.

```tsx
<Flex direction="column" gap="400">
  <TextInput {...args}>
    <InputSlot placement="prefix">
      <BodyText size="md" weight="semibold">
        £
      </BodyText>
    </InputSlot>
  </TextInput>
  <TextInput {...args}>
    <InputSlot placement="suffix">
      <BodyText size="md" weight="semibold">
        kWh
      </BodyText>
    </InputSlot>
  </TextInput>
</Flex>
```

You can do the same with icons.

```tsx
<TextInput {...args}>
  <InputSlot placement="prefix">
    <EmailMediumIcon />
  </InputSlot>
</TextInput>
```

## Grouping inputs

When grouping inputs you should
[use the `fieldset` and `legend` elements](https://accessibility.blog.gov.uk/2016/07/22/using-the-fieldset-and-legend-elements/).
This will ensure the group title is properly associated with child input
elements. Make sure you place the `legend` element as the first child of the
`fieldset` otherwise the relationship is broken. If this is not possible, you
can use `aria-label` or `aria-labelledby` to create the relationship.

If you are also including supporting text, then this should be associated with
each individual input, rather than with the grouping fieldset.

Please take the time to test what you build with a screen reader.

```tsx
<Flex asChild direction="column">
  <fieldset>
    <legend>
      <Heading as="h3" size="lg" marginBottom="200">
        Grouping Inputs
      </Heading>
    </legend>
    <BodyText size="md" marginBottom="250" id="supporting-info">
      Supporting information
    </BodyText>
    <Card variant="subtle" direction="column" gap="250">
      <TextInput label="First name" required aria-describedby="supporting-info" />
      <TextInput label="Last name" required aria-describedby="supporting-info" />
      <TextInput
        label="Email"
        helperText="this is the helper text"
        aria-describedby="supporting-info"
      >
        <InputSlot placement="prefix">
          <EmailMediumIcon />
        </InputSlot>
      </TextInput>
    </Card>
  </fieldset>
</Flex>
```

## API

This component is based on the `input` element and supports the following common props:

- Margin

| Prop               | Type                                                                        | Default | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------- |
| `label`            | `string`                                                                    | —       | The label for the form field, describing its purpose.                       |
| `defaultValue`     | `string \| number`                                                          | —       | The initial value of the input when rendered.                               |
| `type`             | `"number" \| "search" \| "text" \| "email" \| "password" \| "tel" \| "url"` | —       |                                                                             |
| `value`            | `string \| number`                                                          | —       | The controlled value of the input. Must be used with an `onChange` handler. |
| `labelId`          | `string`                                                                    | —       |                                                                             |
| `helperTextId`     | `string`                                                                    | —       |                                                                             |
| `validationTextId` | `string`                                                                    | —       |                                                                             |
| `hideLabel`        | `boolean`                                                                   | —       | Visually hide the label.                                                    |
| `labelVariant`     | `"body" \| "heading"`                                                       | —       | Change the label variant                                                    |
| `helperText`       | `string`                                                                    | —       | Optional helper text to provide additional context or instructions.         |
| `validationText`   | `string`                                                                    | —       | Text to display when the `validationStatus` is set.                         |
| `validationStatus` | `"valid" \| "invalid"`                                                      | —       | Indicates the validation status.                                            |
