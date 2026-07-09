# Date Picker Input

`DatePickerInput` extends the base input to present a calendar trigger for choosing dates while still allowing direct text entry. It keeps the field inline while delegating selection to the `DatePicker` bottom sheet and formats values with Day.js when needed. The default `DD/MM/YYYY` mask auto-inserts separators and surfaces a numeric keypad for faster entry.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Formatting and validation](#formatting-and-validation)
- [Examples](#examples)
- [Accessibility](#accessibility)
  - [Screen reader support](#screen-reader-support)
  - [Keyboard navigation](#keyboard-navigation)
  - [Best practices](#best-practices)

## Playground

```tsx
<View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
  <ViewWrap>{picker}</ViewWrap>
</View>
```

## Usage

Wrap the component with `BottomSheetModalProvider` so the underlying picker can render its modal. Provide a controlled `value` if you want to react to changes immediately or let the component manage its own display string.

```tsx
import { useState } from 'react';
import {
  BottomSheetModalProvider,
  DatePickerInput,
  type DateType,
} from '@utilitywarehouse/hearth-react-native';

type Props = {};

const BookingDateField = ({}: Props) => {
  const [date, setDate] = useState<DateType>();

  return (
    <BottomSheetModalProvider>
      <DatePickerInput
        value={date}
        onChange={({ date }) => setDate(date ?? undefined)}
        onClear={() => setDate(undefined)}
        placeholder="DD/MM/YYYY"
      />
    </BottomSheetModalProvider>
  );
};
```

When used inside `FormField`, validation, disabled, and required states are inherited from the context.

## Props

`DatePickerInput` inherits all React Native `TextInput` props (except `children`) and adds the following:

| Prop                | Type                                                                   | Default              | Description                                                                                                                                                                 |
| ------------------- | ---------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `validationStatus`  | `'initial' \| 'valid' \| 'invalid'`                                    | `'initial'`          | Renders the corresponding validation style. Inherited from `FormField` when nested.                                                                                         |
| `disabled`          | `boolean`                                                              | `false`              | Disables both typing and the calendar trigger button.                                                                                                                       |
| `readonly`          | `boolean`                                                              | `false`              | Prevents manual typing while keeping the picker available.                                                                                                                  |
| `focused`           | `boolean`                                                              | `false`              | Forces the focused state styling.                                                                                                                                           |
| `label`             | `string`                                                               | `-`                  | The label for the input. When used inside `FormField`, this is inherited from the context.                                                                                  |
| `labelVariant`      | `'heading' \| 'body'`                                                  | `'body'`             | The variant of the label text.                                                                                                                                              |
| `helperText`        | `string`                                                               | `-`                  | Helper text to display below the input. When used inside `FormField`, this is inherited from the context.                                                                   |
| `helperIcon`        | `ComponentType`                                                        | `-`                  | Icon to display alongside the helper                                                                                                                                        |
| `validText`         | `string`                                                               | `-`                  | Text to display when validation status is 'valid'. When used inside `FormField`, this is inherited from the context.                                                        |
| `invalidText`       | `string`                                                               | `-`                  | Text to display when validation status is 'invalid'. When used inside `FormField`, this is inherited from the context.                                                      |
| `inBottomSheet`     | `boolean`                                                              | `false`              | Uses `BottomSheetTextInput` when rendering inside a bottom sheet.                                                                                                           |
| `format`            | `string`                                                               | `'DD/MM/YYYY'`       | Day.js format string used to render selected dates and parse manual input. Leaving it as `'DD/MM/YYYY'` automatically inserts `/` separators and requests a numeric keypad. |
| `openButtonLabel`   | `string`                                                               | `'Open date picker'` | Accessible label read by screen readers for the calendar trigger button.                                                                                                    |
| `autoCloseOnSelect` | `boolean`                                                              | `true`               | Closes the picker automatically after a date is chosen.                                                                                                                     |
| `datePickerProps`   | `Omit<DatePickerSingleProps, 'mode' \| 'date' \| 'onChange' \| 'ref'>` | `-`                  | Forwards props to the underlying `DatePicker` (e.g. `minDate`, `maxDate`, `timeZone`).                                                                                      |
| `onChange`          | `(payload: { date: DateType }) => void`                                | `-`                  | Fired whenever a valid date is parsed from typing or picked via the calendar.                                                                                               |
| `onClear`           | `() => void`                                                           | `-`                  | Called after the clear action resets the input. Also displays a trailing clear button when provided.                                                                        |

### Automatic formatting

When `format` is left as `'DD/MM/YYYY'`, the input automatically inserts `/` separators as people type and requests a numeric keypad on supported platforms. This keeps manual entry quick while matching the preferred UK date layout.

On iOS, a contextual **Done** button appears above the keyboard so people can dismiss it as soon as they're finished typing.

### Handling validation yourself

`DatePickerInput` doesn't display validation styles by itself. Pair it with `FormField` (or your own state) to surface errors whenever the typed value doesn't match your expected format.

```tsx
import { useState } from 'react';
import dayjs from 'dayjs';
import { DatePickerInput, FormField, type DateType } from '@utilitywarehouse/hearth-react-native';

const TravelDateField = () => {
  const [value, setValue] = useState<DateType>();
  const [rawInput, setRawInput] = useState('');
  const [status, setStatus] = useState<'initial' | 'invalid'>('initial');

  const handleBlur = () => {
    if (!rawInput) {
      setStatus('initial');
      return;
    }

    const isValid = dayjs(rawInput, 'DD/MM/YYYY', true).isValid();
    setStatus(isValid ? 'initial' : 'invalid');
  };

  return (
    <FormField
      label="Travel date"
      helperText="Use DD/MM/YYYY"
      validationStatus={status}
      invalidText="Enter a valid date"
    >
      <DatePickerInput
        value={value}
        onChange={({ date }) => {
          setValue(date ?? undefined);
          if (date) {
            setStatus('initial');
          }
        }}
        onChangeText={setRawInput}
        onBlur={handleBlur}
        onClear={() => {
          setValue(undefined);
          setRawInput('');
          setStatus('initial');
        }}
      />
    </FormField>
  );
};
```

Swap `'DD/MM/YYYY'` in the example for the `format` you're using, and reuse the same rule inside `dayjs(..., format, true)` to keep the behaviour aligned.

Selection through the calendar always returns a JavaScript `Date` that is reformatted according to `format` when displayed in the field.

## With Label and Helper Text

The `DatePickerInput` component can display a label and helper text by passing the appropriate props.

```tsx
<DatePickerInput label="Travel date" helperText="Choose a departure day" onClear={() => {}} />
```

### With `FormField`

```tsx
<FormField label="Travel date" helperText="Choose a departure day">
  <DatePickerInput onClear={() => {}} />
</FormField>
```

### Custom formatting

```tsx
<DatePickerInput format="MMM D, YYYY" placeholder="MMM D, YYYY" />
```

## Accessibility

`DatePickerInput` is designed to work seamlessly with VoiceOver (iOS), TalkBack (Android), and other assistive technologies:

### Screen reader support

- **Text input field**:

  - Announces as "Date input" by default (customizable via `accessibilityLabel`).
  - Provides helpful context: "Enter the date in DD/MM/YYYY format" (or your custom format) via `accessibilityHint`.
  - Announces disabled and readonly states appropriately.
  - When focused, screen readers identify it as an editable text field.

- **Calendar trigger button**:

  - Announces as "Open date picker" by default (customizable via `openButtonLabel`).
  - Includes helpful hint: "Opens the date picker calendar".
  - Clearly identified as a button with `accessibilityRole="button"`.
  - Respects disabled/readonly state from the input or surrounding `FormField`.

- **Clear button** (when `onClear` is provided):
  - Announces as "Clear date".
  - Includes hint: "Removes the current date".
  - Only appears when there's a value to clear and the input isn't readonly/disabled.

### Keyboard and input management

- Both the text input and action buttons are individually focusable and navigable.
- The `DD/MM/YYYY` format triggers a numeric keypad on iOS/Android for faster entry.
- On iOS, a contextual **Done** button appears above the keyboard to dismiss it when finished typing.
- Custom formats can be specified to match your application's needs while maintaining accessibility.

### Integration with DatePicker

- When the calendar opens, screen readers announce "Date picker opened" and automatically focus on the calendar content.
- All calendar navigation (days, months, years) is fully accessible with descriptive labels.
- Selected dates are announced with full context: "Monday, October 8, selected".
- The underlying `DatePicker` follows platform-specific accessibility patterns for optimal screen reader experience.

### Validation and state

- Validation state is inherited from surrounding `FormField` or controlled via `validationStatus` prop.
- Invalid states are properly communicated through the `FormField`'s error messaging system.
- The `importantForAccessibility` prop is set to `'yes'` by default to ensure the input is prioritized by screen readers.

### Best practices

- Always pair with `FormField` for proper label, helper text, and error message announcements.
- Use `openButtonLabel` to customise the calendar button announcement if the default doesn't fit your use case.
- Provide clear validation feedback through `FormField` when manual date entry doesn't match the expected format.
- Test with VoiceOver and TalkBack to ensure the date entry flow works smoothly in your specific context.
