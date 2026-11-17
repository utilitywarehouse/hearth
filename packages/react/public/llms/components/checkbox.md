# Checkbox

Use Checkbox to let a user toggle a dual-state option between checked and
not checked. It can be used independently, but when presenting multiple
checkboxes together use `CheckboxGroup` instead, which handles their state
and layout. If not using the `label` prop, provide an `aria-label` or
`aria-labelledby` so the checkbox has an accessible name.

```tsx
<Checkbox label="Label" helperText="Helper text" value="1" validationText="Validation text" />
```

## Helper text

The `Checkbox` can display a secondary message as a helper text. This will not
show if the `Checkbox` is a child of a `CheckboxGroup` which also displays a helper text message.

```tsx
<Checkbox value="1" label="One" helperText="The number one" />
```

## Validation text

The `Checkbox` can display a validation message when `validationStatus` is `invalid`. This will not
show if the `Checkbox` is a child of a `CheckboxGroup` which also displays a validation message.

```tsx
<Checkbox value="1" label="One" validationText="That is invalid" validationStatus="invalid" />
```

## Image

The `Checkbox` can display an icon or image between the indicator and label.

```tsx
<Checkbox value="2" label="Two" helperText="The number two" image={<CashbackCardMediumIcon />} />
```

```tsx
<Flex width="fit-content" gap="200" direction="column">
  <Checkbox
    {...args}
    label="Mastercard"
    helperText=""
    image={<img src={mastercard} width={40} alt="" />}
  />
  <Checkbox {...args} label="Visa" helperText="" image={<img src={visa} width={40} alt="" />} />
  <Checkbox label="Cash" image={<MoneyMediumIcon />} />
</Flex>
```

**If you are using an `img` element, remember to include a null alt tag
(`alt=""` ) so the image is ignored by assistive technologies.**

```tsx
<Checkbox
  value="2"
  label="Two"
  helperText="The number two"
  image={<img src="https://help.uw.co.uk/images/iPhone.svg" width={25} alt="" />}
/>
```

## Controlled

The checked state can be controlled by using the `checked` and `onCheckedChange` props together.

```tsx
[...]

const [checked, setChecked] = React.useState(false);

[...]

<Checkbox value="1" label="One" checked={checked} onCheckedChange={c => setChecked(c)} />
```

## Accessibility

`Checkbox` is, by default, appropriately labelled when using the `label` prop,
if you do not provide a label, you must specify an `aria-label` or
`aria-labelledby` for accessibility.

## API

This component is based on the `button` element and supports the following common props:

- Margin

| Prop               | Type                           | Default     | Description                                                                                                                                     |
| ------------------ | ------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `form`             | `string`                       | —           | Identifies the form that owns the hidden input. Useful when the checkbox is rendered outside the form.                                          |
| `label`            | `ReactNode`                    | —           | The label for the Checkbox. If not using please properly associate the checkbox with a label using the `aria-label` or `aria-labelledby` props. |
| `style`            | `CSSProperties`                | —           |                                                                                                                                                 |
| `image`            | `ReactNode`                    | —           | Optional image to show between the check indicator and label.                                                                                   |
| `className`        | `string`                       | —           |                                                                                                                                                 |
| `defaultValue`     | `string`                       | —           | The value given as data when submitted with a `name`, when the checkbox is initially rendered uncontrolled.                                     |
| `defaultChecked`   | `boolean`                      | —           | The checked state of the checkbox when it is initially rendered. Use when you do not need to control its checked state.                         |
| `id`               | `string`                       | —           | The id of the input element.                                                                                                                    |
| `value`            | `string`                       | —           | The value given as data when submitted with a `name`.                                                                                           |
| `name`             | `string`                       | `undefined` | Identifies the field when a form is submitted.                                                                                                  |
| `checked`          | `boolean`                      | —           | The controlled checked state of the checkbox. Must be used in conjunction with onCheckedChange.                                                 |
| `disabled`         | `boolean`                      | `false`     | Whether the component should ignore user interaction.                                                                                           |
| `onCheckedChange`  | `((checked: boolean) => void)` | —           | Event handler called when the checked state of the checkbox changes.                                                                            |
| `required`         | `boolean`                      | `false`     | Whether the user must tick the checkbox before submitting a form.                                                                               |
| `inputRef`         | `Ref<HTMLInputElement>`        | —           | A ref to access the hidden `<input>` element.                                                                                                   |
| `helperText`       | `ReactNode`                    | —           | Helper text for the Checkbox. Will not display if the checkbox group has `helperText` set.                                                      |
| `validationStatus` | `"invalid"`                    | —           | Indicates the validation state                                                                                                                  |
| `validationText`   | `string`                       | —           | Text to display when the `validationStatus` is set.                                                                                             |
