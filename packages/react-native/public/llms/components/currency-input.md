# Currency Input

An input specialised for monetary amounts. It shows a currency symbol prefix and uses a decimal keypad where supported.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)
- [States](#states)
- [Formatting](#formatting)
- [Accessibility](#accessibility)

## Playground

```tsx
<CurrencyInput {...args} value={value} onChangeText={setValue} />
```

## Usage

```tsx
import { CurrencyInput } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = useState('');
  return (
    <CurrencyInput value={value} onChange={e => setValue(e.nativeEvent.text)} placeholder="0.00" />
  );
};
```

## Props

When using `CurrencyInput`, the component inherits React Native TextInput props (except `children`). In addition, it supports:

| Prop                  | Type                                             | Default     | Description                                                                                                                                    |
| --------------------- | ------------------------------------------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| validationStatus      | `'initial' \| 'valid' \| 'invalid'`              | `'initial'` | Validation styling state                                                                                                                       |
| onChangeText          | `(e: { nativeEvent: { text: string } }) => void` | -           | Callback when the text changes                                                                                                                 |
| value                 | `string`                                         | -           | The value of the input                                                                                                                         |
| label                 | `string`                                         | -           | The label for the input                                                                                                                        |
| labelVariant          | `'heading' \| 'body'`                            | `'body'`    | The variant of the label text                                                                                                                  |
| helperText            | `string`                                         | -           | Helper text to display below the input                                                                                                         |
| helperIcon            | `ComponentType`                                  | -           | Icon to display alongside the helper text                                                                                                      |
| required              | `boolean`                                        |
| disabled              | `boolean`                                        | `false`     | Disables the input                                                                                                                             |
| readonly              | `boolean`                                        | `false`     | Makes the input read-only                                                                                                                      |
| focused               | `boolean`                                        | `false`     | Forces the focused visual state                                                                                                                |
| inBottomSheet         | `boolean`                                        | `false`     | Use BottomSheetTextInput when true                                                                                                             |
| placeholder           | `string`                                         | `'0.00'`    | Placeholder text                                                                                                                               |
| disableGroupSeparator | `boolean`                                        | `false`     | Disables automatic inserting of thousand separators while the user types _(Formatting only works with controlled components via onChangeText)_ |

Note: When used inside `FormField`, `validationStatus` and `disabled` are read from the context unless explicitly overridden.

## With Label and Helper Text

The `CurrencyInput` component can display a label and helper text by passing the appropriate props.

```tsx
import { CurrencyInput } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = useState('');
  const handleChange = e => {
    setValue(e.target.value);
  };
  return (
    <CurrencyInput
      label="Amount"
      helperText="Enter the amount in GBP"
      placeholder="0.00"
      value={value}
      onChange={handleChange}
    />
  );
};
```

### With `FormField`

The `CurrencyInput` component can be used with the `FormField` component to create a custom input field.
For more information on the `FormField` component view the `FormField` documentation.

```tsx
import { FormField, CurrencyInput } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = useState('');
  const handleChange = e => {
    setValue(e.target.value);
  };
  return (
    <FormField label="Label" helperText="Helper text" helperPosition="bottom">
      <CurrencyInput onChange={handleChange} value={value} />
    </FormField>
  );
};
```

## States

```tsx
<Flex direction="column" spacing="lg">
  <VariantTitle title="Default">
    <CurrencyInput />
  </VariantTitle>
  <VariantTitle title="With placeholder">
    <CurrencyInput placeholder="0.00" />
  </VariantTitle>
  <VariantTitle title="Focused">
    <CurrencyInput focused value="12.34" />
  </VariantTitle>
  <VariantTitle title="Valid">
    <CurrencyInput validationStatus="valid" />
  </VariantTitle>
  <VariantTitle title="Invalid">
    <CurrencyInput validationStatus="invalid" />
  </VariantTitle>
  <VariantTitle title="Valid - Focused">
    <CurrencyInput validationStatus="valid" focused />
  </VariantTitle>
  <VariantTitle title="Invalid - Focused">
    <CurrencyInput validationStatus="invalid" focused />
  </VariantTitle>
  <VariantTitle title="Disabled">
    <CurrencyInput disabled />
  </VariantTitle>
  <VariantTitle title="Readonly">
    <CurrencyInput readonly value="11666" />
  </VariantTitle>
  <VariantTitle title="Disable auto format thousands">
    <CurrencyInput disableGroupSeparator value="1234.56" />
  </VariantTitle>
</Flex>
```

## Formatting

Automatic thousand separator formatting can be disabled by setting `disableGroupSeparator`.

```tsx
<CurrencyInput {...args} value={value} onChangeText={setValue} />
```

```tsx
<CurrencyInput disableGroupSeparator value="1234567.89" /> // displays 1234567.89
```

Notes:

- Only digits, an optional leading minus and a single decimal point are formatted.
- Formatting is applied as you type; caret will move to the end (standard RN behaviour when programmatically updating value).
- Provide a controlled `value` if you need to manipulate or strip commas before persisting.

## Accessibility

The component uses a standard TextInput field and supports:

- Screen readers (VoiceOver/TalkBack)
- `aria-disabled`, `aria-required`, `aria-invalid` via underlying Input
- Decimal keypad and selection/cursor colors aligned with theme
