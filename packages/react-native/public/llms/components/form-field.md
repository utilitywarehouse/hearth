# Form Field

The `FormField` component is a container for form elements such as input fields. It provides a consistent layout and styling for form elements in which developers can provide important context to form elements. This context can include whether the element is invalid, disabled, or required.

- [Playground](#playground)
- [Usage](#usage)
  - [Validation Helper Text](#validation-helper-text)
- [Props](#props)
- [Components](#components)
- [Variants](#variants)
- [Advanced Usage](#advanced-usage)
- [Examples](#examples)
  - [Otional `FormField` Component](#optional-formfield-components)
  - [With `RadioGroup`](#with-radiogroup)
  - [With `Checkbox`](#with-checkbox)

## Playground

```tsx
// Example usage
<FormField validationStatus={validationStatus} helperIcon={helperIcon} {...props}>
  <Input />
</FormField>
```

## Usage

```tsx
// Example usage
import { Input, FormField } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <FormField label="Label" helperText="Helper text" helperPosition="bottom">
      <Input onChange={() => console.log('###')} placeholder="Placeholder" />
    </FormField>
  );
};
```

### Validation Helper Text

The `FormField` component can display helper text to provide additional context to the user. This text can be used to provide information about the field, such as the format of the input or the requirements for the field.

```tsx
// Example usage
import { Input, FormField } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <FormField
      validationStatus="invalid"
      label="Label"
      helperText="Helper text"
      validText="Valid form field text"
      invalidText="Invalid form field text"
    >
      <Input onChange={() => console.log('###')} placeholder="Placeholder" />
    </FormField>
  );
};
```

## Props

| Name                               | Type                                | Default     | Description                                                                                          |
| ---------------------------------- | ----------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| `validationStatus`                 | `'initial' \| 'valid' \| 'invalid'` | `'initial'` | The validation status of the field.                                                                  |
| `disabled`                         | `boolean`                           | `false`     | Whether the field is disabled.                                                                       |
| `readonly`                         | `boolean`                           | `false`     | Whether the field is readonly.                                                                       |
| `label`                            | `string`                            | `-`         | The label for the field.                                                                             |
| `labelVariant`                     | `'heading' \| 'body'`               | `'body'`    | The variant of the label text.                                                                       |
| `helperText`                       | `string`                            | `-`         | The helper text for the field.                                                                       |
| `helperIcon`                       | `React.ComponentType`               | `-`         | The icon for the helper text.                                                                        |
| `helperPosition`                   | `'top' \| 'bottom'`                 | `'top'`     | The position of the helper text.                                                                     |
| `validText`                        | `string`                            | `-`         | The valid text for the field.                                                                        |
| `invalidText`                      | `string`                            | `-`         | The invalid text for the field.                                                                      |
| `showValidationIcon`               | `boolean`                           | `false`     | Whether to show the validation icon next to the validation text.                                     |
| `required`                         | `boolean`                           | `true`      | Whether the field is required.                                                                       |
| `accessibilityHandledByChildren`\* | `boolean`                           | `false`     | Whether accessibility is handled by child components. (Hides accessibility for the FormField itself) |

- This prop is useful when the child component (e.g., Input) manages its own accessibility attributes, preventing screen readers from reading the FormField's label and helper text multiple times.

## Components

The `FormField` component is composed of the following components:

- `FormFieldLabel`
- `FormFieldTextContent`
- `FormFieldLabelText`
- `FormFieldHelper`
- `FormFieldHelperText`
- `FormFieldInvalid`
- `FormFieldInvalidIcon`
- `FormFieldInvalidText`
- `FormFieldValid`
- `FormFieldValidIcon`
- `FormFieldValidText`

## Variants

```tsx
// Example usage
<Flex direction="column" spacing="lg">
  <VariantTitle title="Default">
    <FormField label="Label">
      <Input />
    </FormField>
  </VariantTitle>
  <VariantTitle title="With helper text bottom">
    <FormField label="Label" helperText="Helper text">
      <Input />
    </FormField>
  </VariantTitle>
  <VariantTitle title="With helper text top">
    <FormField label="Label" helperText="Helper text">
      <Input />
    </FormField>
  </VariantTitle>
  <VariantTitle title="Valid with valid text">
    <FormField
      validationStatus="valid"
      label="Label"
      helperText="Helper text"
      validText="Valid form field text"
    >
      <Input />
    </FormField>
  </VariantTitle>
  <VariantTitle title="Invalid with invalid text">
    <FormField
      validationStatus="invalid"
      label="Label"
      helperText="Helper Text"
      invalidText="Invalid form field text"
    >
      <Input />
    </FormField>
  </VariantTitle>
  <VariantTitle title="Disabled">
    <FormField disabled label="Label" helperText="Helper text">
      <Input />
    </FormField>
  </VariantTitle>
</Flex>
```

## Advanced Usage

The `FormField` component can be broken down into smaller components to provide more control over the layout and styling of the form field.

```tsx
// Example usage
import {
  Input,
  FormField,
  FormFieldTextContent,
  FormFieldLabel,
  FormFieldLabelText,
  FormFieldHelper,
  FormFieldHelperText,
  FormFieldInvalidIcon,
  FormFieldInvalid,
  FormFieldInvalidText,
  FormFieldValidIcon,
  FormFieldValid,
  FormFieldValidText,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <FormField validationStatus="valid" showValidationIcon={false}>
      <FormFieldTextContent>
        <FormFieldLabel>
          <FormFieldLabelText>Label</FormFieldLabelText>
        </FormFieldLabel>
        <FormFieldHelper>
          <FormFieldHelperText>Helper text</FormFieldHelperText>
        </FormFieldHelper>
      </FormFieldTextContent>
      <Input onChange={() => console.log('###')} placeholder="Placeholder" />
      <FormFieldInvalid>
        <FormFieldInvalidIcon />
        <FormFieldInvalidText>Invalid form field text</FormFieldInvalidText>
      </FormFieldInvalid>
      <FormFieldValid>
        <FormFieldValidIcon />
        <FormFieldValidText>Valid form field text</FormFieldValidText>
      </FormFieldValid>
    </FormField>
  );
};
```

### Optional `FormField` Components

The `FormField` component can be used to wrap any component to provide additional context to the user.
The `FormField` component can be marked as optional by setting the `required` prop to `false`.
This will add the "optional" text to the label.

```tsx
// Example usage
import { Input, FormField } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <FormField label="Label" helperText="Helper text" required={false}>
      <Input onChange={() => console.log('###')} placeholder="Placeholder" />
    </FormField>
  );
};
```

### With `RadioGroup`

The `FormField` component can be used to wrap a `RadioGroup` component to provide additional context to the user.

```tsx
// Example usage
import { RadioGroup, Radio, FormField } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <FormField
      label="What is your favourite fruit?"
      helperText="Choose the fruit you like the most"
      helperPosition="bottom"
    >
      <RadioGroup aria-label="Radio Group">
        <Radio value="mango" label="Mango" />
        <Radio value="apple" label="Apple" />
        <Radio value="orange" label="Orange" />
        <Radio value="banana" label="Banana" />
      </RadioGroup>
    </FormField>
  );
};
```

### With `Checkbox`

The `FormField` component can be used to wrap a `Checkbox` component to provide additional context to the user.

```tsx
// Example usage
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  FormField,
  FormFieldHelper,
  FormFieldHelperText,
  FormFieldInvalidIcon,
  FormFieldInvalid,
  FormFieldInvalidText,
  Flex,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <FormField validationStatus="invalid">
      <Checkbox alignItems="flex-start">
        <CheckboxIndicator />
        <Flex direction="column" spacing="xs">
          <CheckboxLabel nested={false}>I accept the terms and conditions</CheckboxLabel>
          <FormFieldHelper>
            <FormFieldHelperText>Read and accept the terms and conditions</FormFieldHelperText>
          </FormFieldHelper>
          <FormFieldInvalid>
            <FormFieldInvalidIcon />
            <FormFieldInvalidText>Please check the box above</FormFieldInvalidText>
          </FormFieldInvalid>
        </Flex>
      </Checkbox>
    </FormField>
  );
};
```
