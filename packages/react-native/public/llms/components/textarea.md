# Textarea

The input component is a text field that allows users to enter text, numbers, or other data. It is commonly used in forms and search fields.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
  - [`Textarea`](#input)
  - [`TextareaField`](#inputfield)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Playground

```tsx
// Example usage
<Textarea placeholder="Textarea placeholder" validationStatus="initial" />
```

## Usage

```tsx
// Example usage
import { Textarea } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = useState('');
  const handleChange = e => {
    setValue(e.target.value);
  };
  return <Textarea onChange={handleChange} value={value} placeholder="Placeholder" />;
};
```

### `Textarea`

When using the component with basic usage the `Textarea` inherits all of the React Native [`TextTextarea` props](https://reactnative.dev/docs/textinput).
Otherwise when used with children including the `TextareaField`, `TextareaSlot` and `TextareaIcon` components, the `Textarea` component inherits
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
| helperIcon       | `ComponentType`                    | `-`         | Icon to display alongside the helper text. **(Only to be used if the input has no children)**                                                                           |
| validText        | `string`                           | `-`         | Text to display when validation status is 'valid'. **(Only to be used if the input has no children)**                                                                   |
| invalidText      | `string`                           | `-`         | Text to display when validation status is 'invalid'.                                                                                                                    |
| required         | `boolean`                          | `true`      | Whether the input is required. **(Only to be used if the input has no children)**                                                                                       |
| defaultHeight    | `number`                           | `96`        | The initial height of the textarea in pixels when `resizable` is `true`.                                                                                                |
| resizable        | `boolean`                          | `false`     | Adds a bottom-right drag handle so the textarea can be resized vertically.                                                                                              |
| value            | `string`                           | `-`         | The value of the input. **(Only to be used if the input has no children)**                                                                                              |
| onChange         | `function`                         | `-`         | Callback function that is triggered when the input value changes. **(Only to be used if the input has no children)** **(Only to be used if the input has no children)** |
| onBlur           | `function`                         | `-`         | Callback function that is triggered when the input loses focus. **(Only to be used if the input has no children)**                                                      |
| onFocus          | `function`                         | `-`         | Callback function that is triggered when the input gains focus. **(Only to be used if the input has no children)**                                                      |
| placeholder      | `string`                           | `-`         | The placeholder text for the input. **(Only to be used if the input has no children)**                                                                                  |

If the `leadingIcon` or `trailingIcon` props are used, the `Textarea` component should not have any children.

### `TextareaField`

The `TextareaField` inherits all of the React Native [`TextTextarea` props](https://reactnative.dev/docs/textinput).

| Prop        | Type                   | Default  | Description                                                       |
| ----------- | ---------------------- | -------- | ----------------------------------------------------------------- |
| type        | `'text' \| 'password'` | `'text'` | The type of the input.                                            |
| value       | `string`               | `-`      | The value of the input.                                           |
| onChange    | `function`             | `-`      | Callback function that is triggered when the input value changes. |
| onBlur      | `function`             | `-`      | Callback function that is triggered when the input loses focus.   |
| onFocus     | `function`             | `-`      | Callback function that is triggered when the input gains focus.   |
| placeholder | `string`               | `-`      | The placeholder text for the input.                               |

### With Label and Helper Text

The `Textarea` component can display a label and helper text by passing the appropriate props.

```tsx
// Example usage
import { Textarea } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = useState('');
  const handleChange = text => {
    setValue(text);
  };

  return (
    <Textarea
      label="Description"
      helperText="Provide a detailed description"
      placeholder="Enter your text here..."
      value={value}
      onChangeText={handleChange}
    />
  );
};
```

### Resizable

Set `resizable` to `true` to let people drag the bottom-right handle and increase the textarea height.

```tsx
// Example usage
import { Textarea } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <Textarea
      label="Additional notes"
      helperText="Drag the corner handle to resize"
      placeholder="Enter your text here..."
      resizable
      defaultHeight={140}
    />
  );
};
```

## Accessibility

We have outlined the various features that ensure the Textarea component is accessible to all users, including those with disabilities. These features help ensure that your application is inclusive and meets accessibility standards.Adheres to the [WAI-ARIA design pattern](https://www.w3.org/TR/wai-aria-1.2/#textbox).

### Keyboard

- Setting the aria-label and aria-hint to help users understand the purpose and function of the Textarea

### Screen Reader

- When setting the label prop, it is associated with the Textarea using aria-label.
- When setting the helperText prop, it is associated with the Textarea using aria-describedby.
- The required prop to indicate if the Textarea is required or optional and is read out by screen readers.
- Compatible with screen readers such as VoiceOver and Talk-back.
- The accessible and aria-label props to provide descriptive information about the Textarea
- Setting aria-traits and aria-hint to provide contextual information about the various states of the Textarea, such as "double tap to edit".

### Focus Management

- The onFocus and onBlur props to manage focus states and provide visual cues to users. This is especially important for users who rely on keyboard navigation.

### States

- In error state, aria-invalid will be passed to indicate that the Textarea has an error, and providing support for an aria-errormessage to describe the error in more detail.
- In disabled state, aria-hidden will be passed to make input not focusable.
- In required state, aria-required will be passed to indicate that the Textarea is required.
