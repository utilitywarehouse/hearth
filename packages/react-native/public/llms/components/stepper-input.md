# Stepper Input

The Stepper Input combines a numeric text input with decrement and increment controls. Use it when the value should stay within a defined range but still needs direct text entry.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Playground

```tsx
// Example usage
<StepperInput
  {...args}
  value={value}
  onChangeText={text => {
    setValue(text);
    handleChangeText?.(text);
  }}
  onChangeValue={nextValue => {
    setValue(`${nextValue}`);
    handleChangeValue?.(nextValue);
  }}
/>
```

## Usage

```tsx
// Example usage
import { useState } from 'react';
import { StepperInput } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = useState('2');

  return (
    <StepperInput
      label="Guests"
      helperText="Choose between 1 and 10"
      min={1}
      max={10}
      value={value}
      onChangeText={setValue}
    />
  );
};
```

## Props

The Stepper Input inherits React Native `TextInput` props except `children`, `value`, `defaultValue`, `onChangeText`, `editable`, and `keyboardType`. It also supports the following props:

| Prop                          | Type                                | Default            | Description                                                                                 |
| ----------------------------- | ----------------------------------- | ------------------ | ------------------------------------------------------------------------------------------- |
| `value`                       | `string \| number`                  | -                  | Controlled value displayed in the input.                                                    |
| `defaultValue`                | `number`                            | -                  | Initial value for uncontrolled usage.                                                       |
| `onChangeText`                | `(text: string) => void`            | -                  | Called whenever the displayed string changes.                                               |
| `onChangeValue`               | `(value: number) => void`           | -                  | Called whenever the current text can be parsed as a number.                                 |
| `min`                         | `number`                            | -                  | Minimum allowed numeric value.                                                              |
| `max`                         | `number`                            | -                  | Maximum allowed numeric value.                                                              |
| `step`                        | `number`                            | `1`                | Amount added or removed when the side buttons are pressed. Fractional values are supported. |
| `focusInputOnStepPress`       | `boolean`                           | `false`            | When `true`, pressing a step button moves focus to the text input after updating the value. |
| `validationStatus`            | `'initial' \| 'valid' \| 'invalid'` | `'initial'`        | Validation styling for the center input.                                                    |
| `label`                       | `string`                            | -                  | Label shown above the stepper.                                                              |
| `labelVariant`                | `'heading' \| 'body'`               | `'body'`           | Typography variant used for the label.                                                      |
| `helperText`                  | `string`                            | -                  | Helper text shown below the label.                                                          |
| `helperIcon`                  | `ComponentType`                     | -                  | Optional helper icon shown next to helper text.                                             |
| `invalidText`                 | `string`                            | -                  | Validation text shown when `validationStatus="invalid"`.                                    |
| `validText`                   | `string`                            | -                  | Validation text shown when `validationStatus="valid"`.                                      |
| `disabled`                    | `boolean`                           | `false`            | Disables the input and both stepper buttons.                                                |
| `readonly`                    | `boolean`                           | `false`            | Prevents editing and disables both buttons.                                                 |
| `focused`                     | `boolean`                           | `false`            | Forces the focused visual state on the center input.                                        |
| `decrementAccessibilityLabel` | `string`                            | `'Decrease value'` | Accessibility label for the decrement button.                                               |
| `incrementAccessibilityLabel` | `string`                            | `'Increase value'` | Accessibility label for the increment button.                                               |

### States

```tsx
// Example usage
<Flex direction="column" spacing="lg" style={{ width: 420 }}>
  <VariantTitle title="Default">
    <StepperInput
      label="Label"
      helperText="Helper text"
      value={values.default}
      onChangeText={updateValue('default')}
    />
  </VariantTitle>
  <VariantTitle title="Focused">
    <StepperInput
      label="Label"
      helperText="Helper text"
      focused
      value={values.focused}
      onChangeText={updateValue('focused')}
    />
  </VariantTitle>
  <VariantTitle title="Invalid">
    <StepperInput
      label="Label"
      helperText="Helper text"
      validationStatus="invalid"
      invalidText="Validation text"
      value={values.invalid}
      onChangeText={updateValue('invalid')}
    />
  </VariantTitle>
  <VariantTitle title="Invalid Focused">
    <StepperInput
      label="Label"
      helperText="Helper text"
      focused
      validationStatus="invalid"
      invalidText="Validation text"
      value={values.invalidFocused}
      onChangeText={updateValue('invalidFocused')}
    />
  </VariantTitle>
  <VariantTitle title="Heading Label">
    <StepperInput
      label="Label"
      helperText="Helper text"
      labelVariant="heading"
      value={values.heading}
      onChangeText={updateValue('heading')}
    />
  </VariantTitle>
  <VariantTitle title="Heading Invalid">
    <StepperInput
      label="Label"
      helperText="Helper text"
      labelVariant="heading"
      validationStatus="invalid"
      invalidText="Validation text"
      value={values.headingInvalid}
      onChangeText={updateValue('headingInvalid')}
    />
  </VariantTitle>
  <VariantTitle title="Disabled">
    <StepperInput
      label="Label"
      helperText="Helper text"
      disabled
      value={values.disabled}
      onChangeText={updateValue('disabled')}
    />
  </VariantTitle>
</Flex>
```

### Bounds

```tsx
// Example usage
<StepperInput {...args} value={value} onChangeText={setValue} />
```

### Fractional Values

`StepperInput` supports fractional steps and negative ranges. When `step`, `min`, `max`, or the current value uses decimals, the input switches to a numeric keyboard path that preserves decimal editing.

```tsx
// Example usage
<StepperInput {...args} value={value} onChangeText={setValue} />
```

```tsx
// Example usage
<StepperInput label="Weight" min={-2} max={2} step={0.5} value={value} onChangeText={setValue} />
```

### Opt-In Focus On Step Press

By default, the increment and decrement buttons update the value without moving focus into the text field. Enable `focusInputOnStepPress` when keyboard-first flows need the caret to stay in the input after a button press.

```tsx
// Example usage
<StepperInput {...args} value={value} onChangeText={setValue} />
```

```tsx
// Example usage
<StepperInput label="Guests" value={value} onChangeText={setValue} focusInputOnStepPress />
```

## Accessibility

- The center field remains a standard text input, so screen readers can edit the value directly.
- The side controls expose button semantics with separate accessibility labels for increment and decrement.
- Button presses do not move focus into the text field unless `focusInputOnStepPress` is enabled.
- Validation, helper text, and disabled state follow the same `FormField` treatment as other input components.
