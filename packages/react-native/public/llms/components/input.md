# Input

The input component is a text field that allows users to enter text, numbers, or other data. It is commonly used in forms and search fields.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
  - [`Input`](#input)
  - [`InputField`](#inputfield)
  - [`InputIcon`](#inputicon)
  - [`InputSlot`](#inputslot)
- [Advanced Usage](#advanced-usage)
- [Variants](#variants)
- [Examples](#examples)
  - [With Label and Helper Text](#with-label-and-helper-text)
  - [With `prefix` and `suffix`](#with-prefix-and-suffix)
  - [With `FormField`](#with-formfield)
- [Accessibility](#accessibility)

## Playground

```tsx
// Example usage
<Input
  {...args}
  leadingIcon={leadingIcon}
  trailingIcon={trailingIcon}
  label="First Name"
  helperText="Only enter your first name, not your full name"
/>
```

## Usage

```tsx
// Example usage
import { Input } from '@utilitywarehouse/hearth-react-native';
import { EmailMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => {
  const [value, setValue] = useState('');
  const handleChange = val => {
    setValue(val);
  };
  return (
    <Input
      onChangeText={handleChange}
      value={value}
      placeholder="Placeholder"
      leadingIcon={EmailMediumIcon}
    />
  );
};
```

### `Input`

When using the component with basic usage the `Input` inherits all of the React Native [`TextInput` props](https://reactnative.dev/docs/textinput).
Otherwise when used with children including the `InputField`, `InputSlot` and `InputIcon` components, the `Input` component inherits
all of the React Native [`View` props](https://reactnative.dev/docs/view).

| Prop             | Type                               | Default     | Description                                                                                                                                                             |
| ---------------- | ---------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type             | `'text' \| 'password'`             | `'text'`    | The type of the input.                                                                                                                                                  |
| validationStatus | `'initial' \| 'valid' \| 'invalid` | `'initial'` | The validation status of the input.                                                                                                                                     |
| disabled         | `boolean`                          | `false`     | Disables the input.                                                                                                                                                     |
| readonly         | `boolean`                          | `false`     | Makes the input read-only.                                                                                                                                              |
| focused          | `boolean`                          | `false`     | Sets focus on the input.                                                                                                                                                |
| label            | `string`                           | `-`         | The label for the input. **(Only to be used if the input has no children)**                                                                                             |
| labelVariant     | `'heading' \| 'body'`              | `'body'`    | The variant of the label text. **(Only to be used if the input has no children)**                                                                                       |
| helperText       | `string`                           | `-`         | Helper text to display below the input. **(Only to be used if the input has no children)**                                                                              |
| helperIcon       | `React.ComponentType`              | `-`         | Icon to display alongside the helper text. **(Only to be used if the input has no children)**                                                                           |
| validText        | `string`                           | `-`         | Text to display when validation status is 'valid'. **(Only to be used if the input has no children)**                                                                   |
| invalidText      | `string`                           | `-`         | Text to display when validation status is 'invalid'. **(Only to be used if the input has no children)**                                                                 |
| required         | `boolean`                          | `true`      | Indicates that the input is required. **(Only to be used if the input has no children)**                                                                                |
| leadingIcon      | `React.ComponentType`              | `-`         | The leading icon of the input. **(Only to be used if the input has no children)**                                                                                       |
| trailingIcon     | `React.ComponentType`              | `-`         | The trailing icon of the input. **(Only to be used if the input has no children)**                                                                                      |
| prefix           | `string \| React.ReactNode`        | `-`         | Content to display before the input field. **(Only to be used if the input has no children)**                                                                           |
| suffix           | `string \| React.ReactNode`        | `-`         | Content to display after the input field. **(Only to be used if the input has no children)**                                                                            |
| value            | `string`                           | `-`         | The value of the input. **(Only to be used if the input has no children)**                                                                                              |
| onChangeText     | `function`                         | `-`         | Callback function that is triggered when the input value changes. **(Only to be used if the input has no children)** **(Only to be used if the input has no children)** |
| onBlur           | `function`                         | `-`         | Callback function that is triggered when the input loses focus. **(Only to be used if the input has no children)**                                                      |
| onFocus          | `function`                         | `-`         | Callback function that is triggered when the input gains focus. **(Only to be used if the input has no children)**                                                      |
| placeholder      | `string`                           | `-`         | The placeholder text for the input. **(Only to be used if the input has no children)**                                                                                  |
| required         | `boolean`                          | `true`      | Indicates that the input is required. **(Only to be used if the input has no children)**                                                                                |
| inBottomSheet    | `boolean`                          | `false`     | Indicates if the input is within a bottom sheet.                                                                                                                        |

If the `leadingIcon` or `trailingIcon` props are used, the `Input` component should not have any children.

### `InputField`

The `InputField` inherits all of the React Native [`TextInput` props](https://reactnative.dev/docs/textinput).

| Prop          | Type                   | Default  | Description                                                       |
| ------------- | ---------------------- | -------- | ----------------------------------------------------------------- |
| type          | `'text' \| 'password'` | `'text'` | The type of the input.                                            |
| value         | `string`               | `-`      | The value of the input.                                           |
| onChangeText  | `function`             | `-`      | Callback function that is triggered when the input value changes. |
| onBlur        | `function`             | `-`      | Callback function that is triggered when the input loses focus.   |
| onFocus       | `function`             | `-`      | Callback function that is triggered when the input gains focus.   |
| placeholder   | `string`               | `-`      | The placeholder text for the input.                               |
| required      | `boolean`              | `true`   | Indicates that the input is required.                             |
| inBottomSheet | `boolean`              | `false`  | Indicates if the input is within a bottom sheet.                  |

### `InputIcon`

| Prop | Type     | Default | Description         |
| ---- | -------- | ------- | ------------------- |
| as   | `string` |         | The icon component. |

### `InputSlot`

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| -    | -    | -       | -           |

## Advanced Usage

The `Input` component can be used with the `InputField`, `InputSlot` and `InputIcon` components to create a custom input field.

```tsx
// Example usage
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Pressable,
} from '@utilitywarehouse/hearth-react-native';
import {
  EmailMediumIcon,
  EyeMediumIcon,
  EyeOffMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { useState } from 'react';

const AdvancedExample = () => {
  const [value, setValue] = useState<string>('');
  const [fieldType, setFieldType] = useState<'password' | 'text'>('password');
  const handleChange = (text: string) => {
    setValue(text);
  };
  const handleToggleFieldType = () => {
    setFieldType(fieldType === 'password' ? 'text' : 'password');
  };
  return (
    <Input>
      <InputSlot>
        <InputIcon as={EmailMediumIcon} />
      </InputSlot>
      <InputField
        onChangeText={handleChange}
        type={fieldType}
        value={value}
        placeholder="Secret email address"
      />
      <InputSlot>
        <Pressable onPress={handleToggleFieldType}>
          <InputIcon as={fieldType === 'password' ? EyeMediumIcon : EyeOffMediumIcon} />
        </Pressable>
      </InputSlot>
    </Input>
  );
};

export default AdvancedExample;
```

## Variants

The `Input` component has the following variants:

```tsx
// Example usage
<Flex direction="column" spacing="lg">
  <VariantTitle title="Default">
    <Input />
  </VariantTitle>
  <VariantTitle title="With icon">
    <Input leadingIcon={EmailMediumIcon} />
  </VariantTitle>
  <VariantTitle title="With placeholder">
    <Input placeholder="Input placeholder" />
  </VariantTitle>
  <VariantTitle title="With value">
    <Input placeholder="Input placeholder" value="filling the value" />
  </VariantTitle>
  <VariantTitle title="Focused">
    <Input focused placeholder="Input placeholder" value="filling the value" />
  </VariantTitle>
  <VariantTitle title="Type password">
    <Input placeholder="Input placeholder" value="filling the value" type="password" />
  </VariantTitle>
  <VariantTitle title="Type search">
    <Input placeholder="Input placeholder" type="search" />
  </VariantTitle>
  <VariantTitle title="Type search - clearable">
    <Input
      placeholder="Input placeholder"
      type="search"
      value={clearableSearchValue}
      clearable
      onChange={handleClearableSearchChange}
      onClear={handleClearableSearchClear}
    />
  </VariantTitle>
  <VariantTitle title="Type search - loading">
    <Input placeholder="Input placeholder" type="search" loading />
  </VariantTitle>
  <VariantTitle title="Valid">
    <Input validationStatus="valid" placeholder="Input placeholder" />
  </VariantTitle>
  <VariantTitle title="Valid focused">
    <Input validationStatus="valid" focused placeholder="Input placeholder" />
  </VariantTitle>
  <VariantTitle title="Invalid">
    <Input validationStatus="invalid" placeholder="Input placeholder" />
  </VariantTitle>
  <VariantTitle title="Invalid focused">
    <Input validationStatus="invalid" focused placeholder="Input placeholder" />
  </VariantTitle>
  <VariantTitle title="Disabled">
    <Input disabled placeholder="Input placeholder" />
  </VariantTitle>
  <VariantTitle title="Readonly">
    <Input readonly placeholder="Input placeholder" readOnly />
  </VariantTitle>
</Flex>
```

## With Label and Helper Text

The `Input` component can be used with a label and helper text by passing the `label` and `helperText` props.

```tsx
// Example usage
import { Input } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = useState('');
  const handleChange = text => {
    setValue(text);
  };
  return (
    <Input
      label="Label"
      helperText="Helper text"
      onChangeText={handleChange}
      value={value}
      placeholder="Placeholder"
    />
  );
};
```

## With `prefix` and `suffix`

The `Input` component can be customised with `prefix` and `suffix` props to add content before or after the input field.

```tsx
// Example usage
import { Input } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = useState('');
  const handleChange = text => {
    setValue(text);
  };
  return (
    <Input
      label="Amount"
      prefix="£"
      suffix="GBP"
      onChangeText={handleChange}
      value={value}
      placeholder="0.00"
    />
  );
};
```

### With `FormField`

The `Input` component can be used with the `FormField` component to create a custom input field.
For more information on the `FormField` component view the `FormField` documentation.

```tsx
// Example usage
import { FormField, Input } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = useState('');
  const handleChange = text => {
    setValue(text);
  };
  return (
    <FormField label="Label" helperText="Helper text" helperPosition="bottom">
      <Input onChangeText={handleChange} value={value} placeholder="Placeholder" />
    </FormField>
  );
};
```

## Accessibility

We have outlined the various features that ensure the Input component is accessible to all users, including those with disabilities. These features help ensure that your application is inclusive and meets accessibility standards.Adheres to the [WAI-ARIA design pattern](https://www.w3.org/TR/wai-aria-1.2/#textbox).

### Keyboard

- Setting the aria-label and aria-hint to help users understand the purpose and function of the Input

### Screen Reader

- When setting the label prop, it is associated with the Input using aria-label.
- When setting the helperText prop, it is associated with the Input using aria-describedby.
- The required prop to indicate if the Input is required or optional and is read out by screen readers.
- Compatible with screen readers such as VoiceOver and Talk-back.
- The accessible and aria-label props to provide descriptive information about the Input
- Setting aria-traits and aria-hint to provide contextual information about the various states of the Input, such as "double tap to edit".

### Focus Management

- The onFocus and onBlur props to manage focus states and provide visual cues to users. This is especially important for users who rely on keyboard navigation.

### States

- In error state, aria-invalid will be passed to indicate that the Input has an error, and providing support for an aria-errormessage to describe the error in more detail.
- In disabled state, aria-hidden will be passed to make input not focusable.
- In required state, aria-required will be passed to indicate that the Input is required.
