# VerificationInput

`VerificationInput` allows users to enter a one-time password (OTP) sent via
SMS, email, or authenticator apps.

```tsx
<VerificationInput label="Label" helperText="Helper text" validationText="Validation text" />
```

## Alternatives

- TextInput - For text
- PasswordInput - For entering
  passwords
- SearchInput - For search
- CurrencyInput - For money
- DateInput - For entering dates

## Controlled

Use `value` in conjunction with `onValueChange` for a controlled input.

```tsx
const [value, setValue] = React.useState("");

[...]

<VerificationInput
  label="Controlled"
  value={value}
  onValueChange={setValue}
/>
```

## Input type

By default `VerificationInput` renders a text input where the value is visible.
You can set `type="password"` if you need to visually hide the value being
entered.

## Validation type

The `VerificationInput` only accepts numeric values by default. To change this,
use the `validationType` prop.

If you set this to `"none"` you can use the `sanitizeValue` prop for custom
sanitization. This function will be called before updating values in response
to user interactions.

## Auto submit

Use the `autoSubmit` and `onAutoSubmit` props to define whether the component
should attempt to automatically submit when all fields are filled. If the field
is associated with an HTML form element, the form's `requestSubmit` method will
be called. The `onAutoSubmit` callback will be called when `autoSubmit` is
`true`, before attempting to submit the associated form.

## API

This component is based on the `input` element and supports the following common props:

- Margin

| Prop               | Type                                               | Default | Description                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------ | -------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `form`             | `string`                                           | —       | A string specifying the `form` element with which the input is associated. This string's value, if present, must match the id of a `form` element in the same document. @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#form                                                                                                                |
| `label`            | `string`                                           | —       | The label for the form field, describing its purpose.                                                                                                                                                                                                                                                                                                                       |
| `autoComplete`     | `"off" \| "one-time-code"`                         | —       | Specifies what—if any—permission the user agent has to provide automated assistance in filling out form field values, as well as guidance to the browser as to the type of information expected in the field. Allows `"one-time-code"` or `"off"`. @defaultValue `"one-time-code"` @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete |
| `autoFocus`        | `boolean`                                          | —       | Whether or not the first fillable input should be focused on page-load. @defaultValue `false` @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/autofocus                                                                                                                                                                                  |
| `autoSubmit`       | `boolean`                                          | —       | Whether or not the component should attempt to automatically submit when all fields are filled. If the field is associated with an HTML `form` element, the form's `requestSubmit` method will be called. @defaultValue `false`                                                                                                                                             |
| `defaultValue`     | `string`                                           | —       | The initial value of the uncontrolled field.                                                                                                                                                                                                                                                                                                                                |
| `disabled`         | `boolean`                                          | —       | Whether or not the the field's input elements are disabled.                                                                                                                                                                                                                                                                                                                 |
| `name`             | `string`                                           | —       | A string specifying a name for the input control. This name is submitted along with the control's value when the form data is submitted. @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#name                                                                                                                                               |
| `onAutoSubmit`     | `((value: string) => void)`                        | —       | When the `autoSubmit` prop is set to `true`, this callback will be fired before attempting to submit the associated form. It will be called whether or not a form is located, or if submission is not allowed.                                                                                                                                                              |
| `onValueChange`    | `((value: string) => void)`                        | —       | A callback fired when the field's value changes. When the component is controlled, this should update the state passed to the `value` prop.                                                                                                                                                                                                                                 |
| `placeholder`      | `string`                                           | —       | Defines the text displayed in a form control when the control has no value. @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/placeholder                                                                                                                                                                                                         |
| `readOnly`         | `boolean`                                          | —       | Whether or not the input elements can be updated by the user. @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/readonly                                                                                                                                                                                                                          |
| `sanitizeValue`    | `((value: string) => string)`                      | —       | Function for custom sanitization when `validationType` is set to `"none"`. This function will be called before updating values in response to user interactions.                                                                                                                                                                                                            |
| `type`             | `"text" \| "password"`                             | —       | The input type of the field's input elements. Can be `"password"` or `"text"`.                                                                                                                                                                                                                                                                                              |
| `validationType`   | `"none" \| "numeric" \| "alpha" \| "alphanumeric"` | —       | Specifies the type of input validation to be used. Can be `"alpha"`, `"numeric"`, `"alphanumeric"` or `"none"`. @defaultValue `"numeric"`                                                                                                                                                                                                                                   |
| `value`            | `string`                                           | —       | The controlled value of the field.                                                                                                                                                                                                                                                                                                                                          |
| `labelId`          | `string`                                           | —       |                                                                                                                                                                                                                                                                                                                                                                             |
| `helperTextId`     | `string`                                           | —       |                                                                                                                                                                                                                                                                                                                                                                             |
| `validationTextId` | `string`                                           | —       |                                                                                                                                                                                                                                                                                                                                                                             |
| `required`         | `boolean`                                          | —       |                                                                                                                                                                                                                                                                                                                                                                             |
| `labelVariant`     | `"body" \| "heading"`                              | —       | Change the label variant                                                                                                                                                                                                                                                                                                                                                    |
| `helperText`       | `string`                                           | —       | Optional helper text to provide additional context or instructions.                                                                                                                                                                                                                                                                                                         |
| `validationText`   | `string`                                           | —       | Text to display when the `validationStatus` is set.                                                                                                                                                                                                                                                                                                                         |
| `validationStatus` | `"valid" \| "invalid"`                             | —       | Indicates the validation status.                                                                                                                                                                                                                                                                                                                                            |
