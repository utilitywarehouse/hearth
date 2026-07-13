# Select

The `Select` component creates a dropdown menu that allows users to choose from a list of options. It's commonly used in forms for selecting one option from many.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
  - [`Select`](#select)
  - [`SelectOption`](#selectoption)
- [Examples](#examples)
  - [With label and helper text](#with-label-and-helper-text)
  - [With `FormField`](#with-formfield)
  - [Searchable `Select`](#searchable-select)
  - [Inline `SelectOption`](#inline-selectoption)

## Playground

```tsx
// Example usage
<Select
  label="Choose an option"
  placeholder="Select an option"
  validationStatus="initial"
  required
  emptyText="No options available"
  searchPlaceholder="Search"
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]}
/>
```

## Usage

```tsx
// Example usage
import { Select } from '@utilitywarehouse/hearth-react-native';
import { useState } from 'react';

const MyComponent = () => {
  const [value, setValue] = useState('1');

  return (
    <Select
      label="Choose an option"
      placeholder="Select an option"
      options={[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
};
```

### `Select`

The `Select` component inherits all of the React Native [`View` props](https://reactnative.dev/docs/view).

| Prop              | Type                                | Default                  | Description                                                                |
| ----------------- | ----------------------------------- | ------------------------ | -------------------------------------------------------------------------- |
| options           | `SelectOptionProps[]`               | `[]`                     | Array of options to display in the select.                                 |
| value             | `string \| null`                    | `-`                      | Currently selected value.                                                  |
| onValueChange     | `(value: string) => void`           | `-`                      | Callback when value changes.                                               |
| label             | `string`                            | `-`                      | Label for the select.                                                      |
| labelVariant      | `'body' \| 'heading'`               | `'body'`                 | Variant for the label. 'inline' will display the label next to the select. |
| helperText        | `string`                            | `-`                      | Helper text to display below the select.                                   |
| helperIcon        | `React.ComponentType`               | `-`                      | Optional icon to display next to the helper text.                          |
| placeholder       | `string`                            | `'Select an option'`     | Placeholder text to show when no value is selected.                        |
| disabled          | `boolean`                           | `false`                  | Whether the select is disabled.                                            |
| readonly          | `boolean`                           | `false`                  | Whether the select is readonly.                                            |
| leadingIcon       | `React.ComponentType`               | `-`                      | Icon to display before the select text.                                    |
| validationStatus  | `'initial' \| 'valid' \| 'invalid'` | `'initial'`              | The validation status of the select.                                       |
| invalidText       | `string`                            | `-`                      | Text to display when validationStatus is 'invalid'.                        |
| validText         | `string`                            | `-`                      | Text to display when validationStatus is 'valid'.                          |
| required          | `boolean`                           | `true`                   | Indicates that the select is required.                                     |
| menuHeading       | `string`                            | `-`                      | Heading to display at the top of the menu.                                 |
| children          | `ReactNode`                         | `-`                      | Children to render inside the select (for custom options).                 |
| bottomSheetProps  | `BottomSheetProps`                  | `-`                      | Props passed to the BottomSheetModal.                                      |
| emptyText         | `string`                            | `'No options available'` | Text to display when no options are available.                             |
| listProps         | `object`                            | `-`                      | Props to be passed to the bottom sheet flat list.                          |
| searchable        | `boolean`                           | `false`                  | Optional search functionality for the select.                              |
| searchPlaceholder | `string`                            | `'Search'`               | Search placeholder.                                                        |

### `SelectOption`

The `SelectOption` component is used to create individual options within the `Select` component. It can be used inline or as part of the `options` prop.

| Prop         | Type                      | Default | Description                            |
| ------------ | ------------------------- | ------- | -------------------------------------- |
| label        | `string`                  | `-`     | Label to display for this option.      |
| value        | `string`                  | `-`     | Value for this option.                 |
| leadingIcon  | `React.ComponentType`     | `-`     | Optional left icon for this option.    |
| trailingIcon | `React.ComponentType`     | `-`     | Optional right icon for this option.   |
| selected     | `boolean`                 | `-`     | Whether this option is selected.       |
| disabled     | `boolean`                 | `false` | Whether this option is disabled.       |
| onPress      | `(value: string) => void` | `-`     | Callback when this option is selected. |

## With label and helper text

```tsx
// Example usage
import { Select } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = useState(null);

  return (
    <Select
      label="Select an option"
      helperText="This is some helper text for the select component."
      placeholder="Select an option"
      options={[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
};
```

### With `FormField`

The `Select` component can be used with the `FormField` component for additional functionality like validation messages and helper text.
For more information on the `FormField` component, view the `FormField` documentation.

```tsx
// Example usage
<Select
  label="Choose an option"
  placeholder="Select an option"
  validationStatus="initial"
  required
  emptyText="No options available"
  searchPlaceholder="Search"
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]}
/>
```

```tsx
// Example usage
import { FormField, Select } from '@utilitywarehouse/hearth-react-native';
import { useState } from 'react';

const MyComponent = () => {
  const [value, setValue] = useState(null);

  return (
    <FormField
      validationStatus="invalid"
      label="Invalid select"
      invalidText="Please select a value"
    >
      <Select
        placeholder="Select an option"
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
        value={value}
        onValueChange={setValue}
      />
    </FormField>
  );
};
```

### Searchable `Select`

```tsx
// Example usage
<Select
  label="Choose an option"
  placeholder="Select an option"
  validationStatus="initial"
  required
  emptyText="No options available"
  searchPlaceholder="Search"
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]}
/>
```

```tsx
// Example usage
import { Select } from '@utilitywarehouse/hearth-react-native';
import { useState } from 'react';

const MyComponent = () => {
  const [value, setValue] = useState(null);

  return (
    <Select
      label="Searchable select"
      placeholder="Select a country"
      searchable
      searchPlaceholder="Search countries..."
      options={[
        { label: 'United Kingdom', value: 'uk' },
        { label: 'United States', value: 'us' },
        { label: 'Canada', value: 'ca' },
        { label: 'Australia', value: 'au' },
        { label: 'France', value: 'fr' },
        { label: 'Germany', value: 'de' },
        { label: 'Japan', value: 'jp' },
        { label: 'Brazil', value: 'br' },
        { label: 'India', value: 'in' },
        { label: 'South Africa', value: 'za' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  );
};
```

### Inline `SelectOption`

The `SelectOption` component can be used inline instead of the options prop. This allows for more flexibility in how the options are displayed.

```tsx
// Example usage
<Select
  label="Choose an option"
  placeholder="Select an option"
  validationStatus="initial"
  required
  emptyText="No options available"
  searchPlaceholder="Search"
  options={[
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]}
/>
```

```tsx
// Example usage
import { Select, SelectOption } from '@utilitywarehouse/hearth-react-native';
import {
  UserSmallIcon,
  HeartSmallIcon,
  EyeSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { useState } from 'react';

const MyComponent = () => {
  const [value, setValue] = useState(null);

  return (
    <Select
      label="Custom options"
      placeholder="Select an option"
      value={value}
      onValueChange={setValue}
    >
      <SelectOption label="Home option" value="home" leadingIcon={UserSmallIcon} />
      <SelectOption label="Car option" value="car" leadingIcon={HeartSmallIcon} />
      <SelectOption label="World option" value="world" leadingIcon={EyeSmallIcon} />
    </Select>
  );
};
```
