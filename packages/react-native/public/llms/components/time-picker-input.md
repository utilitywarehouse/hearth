# Time Picker Input

`TimePickerInput` extends the base input to present a time picker trigger while still allowing direct text entry. It keeps the field inline and formats values with Day.js when needed.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Formatting](#formatting)
- [Examples](#examples)

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
  TimePickerInput,
  type DateType,
} from '@utilitywarehouse/hearth-react-native';

const BookingTimeField = () => {
  const [time, setTime] = useState<DateType>();

  return (
    <BottomSheetModalProvider>
      <TimePickerInput
        value={time}
        onChange={({ date }) => setTime(date ?? undefined)}
        onClear={() => setTime(undefined)}
        placeholder="HH:mm"
      />
    </BottomSheetModalProvider>
  );
};
```

## Props

`TimePickerInput` inherits all React of the `Input` component props props (except `children`) and adds the following:

| Prop                | Type                                                   | Default              | Description                                                                                               |
| ------------------- | ------------------------------------------------------ | -------------------- | --------------------------------------------------------------------------------------------------------- |
| `validationStatus`  | `'initial' \| 'valid' \| 'invalid'`                    | `'initial'`          | Renders the corresponding validation style. Inherited from `FormField` when nested.                       |
| `disabled`          | `boolean`                                              | `false`              | Disables both typing and the time picker trigger button.                                                  |
| `readonly`          | `boolean`                                              | `false`              | Prevents manual typing while keeping the picker available.                                                |
| `focused`           | `boolean`                                              | `false`              | Forces the focused state styling.                                                                         |
| `label`             | `string`                                               | `-`                  | The label for the input. When used inside `FormField`, this is inherited from the context.                |
| `labelVariant`      | `'heading' \| 'body'`                                  | `'body'`             | The variant of the label text.                                                                            |
| `helperText`        | `string`                                               | `-`                  | Helper text to display below the input. When used inside `FormField`, this is inherited from the context. |
| `helperIcon`        | `ComponentType`                                        | `-`                  | Icon to display alongside the helper                                                                      |
| `validText`         | `string`                                               | `-`                  | Text to display when validation status is 'valid'. When used inside `FormField`, this is inherited.       |
| `invalidText`       | `string`                                               | `-`                  | Text to display when validation status is 'invalid'. When used inside `FormField`, this is inherited.     |
| `inBottomSheet`     | `boolean`                                              | `false`              | Uses `BottomSheetTextInput` when rendering inside a bottom sheet.                                         |
| `format`            | `string`                                               | `'HH:mm'`            | Day.js format string used to render selected times and parse manual input.                                |
| `openButtonLabel`   | `string`                                               | `'Open time picker'` | Accessible label read by screen readers for the time trigger button.                                      |
| `autoCloseOnSelect` | `boolean`                                              | `true`               | Closes the picker automatically after a time is chosen.                                                   |
| `timePickerProps`   | `Omit<TimePickerProps, 'date' \| 'onChange' \| 'ref'>` | `-`                  | Forwards props to the underlying `TimePicker` (e.g. `use12Hours`, `timeZone`, `minuteInterval`).          |
| `onChange`          | `(payload: { date: DateType }) => void`                | `-`                  | Fired whenever a valid time is parsed from typing or picked via the selector.                             |
| `onClear`           | `() => void`                                           | `-`                  | Called after the clear action resets the input. Also displays a trailing clear button when provided.      |

## Formatting

When `format` is left as `'HH:mm'`, the input automatically inserts `:` as people type and requests a numeric keypad on supported platforms.

### With label and helper text

```tsx
<TimePickerInput
  onClear={() => {}}
  label="Meeting time"
  helperText="Pick a time for your meeting"
  validText="Time looks good!"
  invalidText="Please enter a valid time"
/>
```

### With `FormField`

```tsx
<FormField label="Meeting time" helperText="Pick a time">
  <TimePickerInput onClear={() => {}} />
</FormField>
```
