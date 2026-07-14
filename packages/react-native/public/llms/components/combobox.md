# Combobox

The `Combobox` component lets people search and select from a list inside a bottom sheet. It keeps the trigger text and the bottom sheet search input in sync, and can render either the built-in options list or fully custom sheet content.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Playground

```tsx
// Example usage
<Combobox
  label="Combobox"
  helperText="Helper text"
  placeholder="Search for a country"
  searchPlaceholder="Search for a country"
  validationStatus="initial"
  noOptionsFoundText="No options found"
  options={countries}
/>
```

## Usage

```tsx
// Example usage
import { Combobox } from '@utilitywarehouse/hearth-react-native';
import { useState } from 'react';

const countries = [
  { label: 'United Kingdom', value: 'uk' },
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
];

const MyComponent = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Combobox
      label="Country"
      placeholder="Search for a country"
      searchPlaceholder="Search for a country"
      options={countries}
      value={value}
      onValueChange={setValue}
    />
  );
};
```

## Props

The `Combobox` component inherits all of the React Native [`View` props](https://reactnative.dev/docs/view).

| Prop                 | Type                                | Default              | Description                                                                  |
| -------------------- | ----------------------------------- | -------------------- | ---------------------------------------------------------------------------- |
| `options`            | `ComboboxOptionItemProps[]`         | `[]`                 | Array of options for the built-in bottom sheet list.                         |
| `value`              | `string \| null`                    | `-`                  | Currently selected value.                                                    |
| `onValueChange`      | `(value: string \| null) => void`   | `-`                  | Callback when the selected value changes.                                    |
| `inputValue`         | `string`                            | `-`                  | Controlled search value for the trigger and bottom sheet input.              |
| `onInputValueChange` | `(value: string) => void`           | `-`                  | Callback when the search value changes.                                      |
| `placeholder`        | `string`                            | `'Search'`           | Placeholder shown in the trigger when empty.                                 |
| `searchPlaceholder`  | `string`                            | `'Search'`           | Placeholder shown in the bottom sheet search input.                          |
| `menuHeading`        | `string`                            | `-`                  | Optional heading shown at the top of the bottom sheet.                       |
| `children`           | `ReactNode \| (props) => ReactNode` | `-`                  | Custom bottom sheet content, or a render function for custom list rendering. |
| `loading`            | `boolean`                           | `false`              | Displays a loading spinner in the trigger and sheet input.                   |
| `noOptionsFoundText` | `string`                            | `'No options found'` | Empty state text for the built-in options list.                              |
| `getValueLabel`      | `(value) => string`                 | `-`                  | Resolve a label for selected values that are not present in `options`.       |
| `filterOption`       | `(option, search) => boolean`       | `-`                  | Override the default label and keyword filtering logic.                      |

### Static Searchable List

```tsx
// Example usage
<Combobox
  label="Combobox"
  helperText="Helper text"
  placeholder="Search for a country"
  searchPlaceholder="Search for a country"
  validationStatus="initial"
  noOptionsFoundText="No options found"
  options={countries}
/>
```

```tsx
// Example usage
import { Combobox } from '@utilitywarehouse/hearth-react-native';
import { useState } from 'react';

const countries = [
  { label: 'United Kingdom', value: 'uk', keywords: ['britain', 'england'] },
  { label: 'United States', value: 'us', keywords: ['america', 'usa'] },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'France', value: 'fr' },
];

const MyComponent = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Combobox
      label="Country"
      helperText="Search a fixed list of countries"
      placeholder="Search for a country"
      searchPlaceholder="Search for a country"
      menuHeading="Choose a country"
      options={countries}
      value={value}
      onValueChange={setValue}
    />
  );
};
```

### Dynamic Items

```tsx
// Example usage
<Combobox
  label="Combobox"
  helperText="Helper text"
  placeholder="Search for a country"
  searchPlaceholder="Search for a country"
  validationStatus="initial"
  noOptionsFoundText="No options found"
  options={countries}
/>
```

```tsx
// Example usage
import { Combobox } from '@utilitywarehouse/hearth-react-native';
import { useEffect, useState } from 'react';

const allProducts = [
  { label: 'Broadband', value: 'broadband' },
  { label: 'Energy', value: 'energy' },
  { label: 'Mobile', value: 'mobile' },
];

const MyComponent = () => {
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(allProducts);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      const query = inputValue.trim().toLowerCase();
      setOptions(allProducts.filter(option => option.label.toLowerCase().includes(query)));
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <Combobox
      label="Products"
      options={options}
      value={value}
      onValueChange={setValue}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      loading={loading}
      getValueLabel={selectedValue =>
        allProducts.find(option => option.value === selectedValue)?.label ?? ''
      }
    />
  );
};
```

### Custom Bottom Sheet Flat List

```tsx
// Example usage
<Combobox
  label="Combobox"
  helperText="Helper text"
  placeholder="Search for a country"
  searchPlaceholder="Search for a country"
  validationStatus="initial"
  noOptionsFoundText="No options found"
  options={countries}
/>
```

```tsx
// Example usage
import {
  BottomSheetFlatList,
  Combobox,
  ComboboxOption,
} from '@utilitywarehouse/hearth-react-native';

const cities = [
  { label: 'London', value: 'london' },
  { label: 'Liverpool', value: 'liverpool' },
  { label: 'Leeds', value: 'leeds' },
];

const MyComponent = () => {
  return (
    <Combobox label="Cities" placeholder="Search a city">
      {({ search }) => {
        const query = search.trim().toLowerCase();
        const filteredCities = cities.filter(option => option.label.toLowerCase().includes(query));

        return (
          <BottomSheetFlatList
            data={filteredCities}
            keyExtractor={item => item.value}
            renderItem={({ item }) => <ComboboxOption label={item.label} value={item.value} />}
          />
        );
      }}
    </Combobox>
  );
};
```

### Inline Custom Content

```tsx
// Example usage
import { Box, Combobox, ComboboxOption } from '@utilitywarehouse/hearth-react-native';
import { useState } from 'react';

const countries = [
  { label: 'United Kingdom', value: 'uk' },
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
];

const MyComponent = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Combobox
      label="Inline options"
      helperText="Compose your own sheet content using ComboboxOption"
      placeholder="Search a country"
      searchPlaceholder="Search a country"
      value={value}
      onValueChange={setValue}
    >
      <Box>
        {countries.map(option => (
          <ComboboxOption key={option.value} label={option.label} value={option.value} />
        ))}
      </Box>
    </Combobox>
  );
};
```

## Accessibility

The `Combobox` is implemented as a button that opens a bottom sheet. By default:

- The trigger uses an accessible label derived from the `label` prop (and, where appropriate, the current value or `placeholder`) and is exposed with `accessibilityRole="button"`.
- When the bottom sheet is open, the trigger reflects its state via `accessibilityState={{ expanded: true }}`; when the sheet is closed, it reports `expanded: false`. Screen readers should announce this state change as “expanded” / “collapsed”.
- The clear control (shown when a value is selected and clearing is allowed) is exposed as a separate button with an accessibility label such as “Clear selection”, so that screen reader users understand its purpose.

When you rely on the built‑in options list via the `options` prop, each option is rendered with appropriate roles and labels so that it can be discovered and activated with assistive technology.

When you provide fully custom sheet content instead of using `ComboboxOption`:

- Make sure interactive elements inside the sheet have the correct `accessibilityRole` (for example, `button` or `checkbox`) and meaningful `accessibilityLabel`s.
- Ensure that the primary search field inside the sheet remains focusable and clearly labelled with `searchPlaceholder` or a custom accessible label.
- Provide clear labelling or headings for grouped content, and ensure focus order inside the sheet is logical.
- Keep a visible and accessible way to dismiss the sheet (for example, a close button with an appropriate accessibility label).

These practices help ensure that the combobox remains understandable and operable for screen reader and keyboard users, regardless of whether you use the built‑in options list or custom content.
