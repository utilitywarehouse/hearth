# Date Input

The `DateInput` component allows users to enter dates manually using separate input fields for day, month, and year. It provides flexibility to show only the date segments you need, supports validation states, and integrates seamlessly with the React Native form system.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)
  - [Date of Birth](#date-of-birth)
  - [Card Expiry](#card-expiry)
  - [Year Only](#year-only)
  - [Validation](#validation)
  - [Disabled](#disabled)
  - [Default Value](#default-value)
  - [Custom Validation](#custom-validation)
  - [Flexible Segments](#flexible-segments)
  - [Grouping Inputs](#grouping-inputs)
  - [With State](#with-state)
  - [Segment Refs](#segment-refs)
  - [Overriding Styles](#overriding-styles)
- [Accessibility](#accessibility)

## Playground

```tsx
<DateInput label="Date" helperText="Helper text" />
```

## Usage

Use state to control the date values:

```tsx
import { useState } from 'react';
import { DateInput } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  return (
    <DateInput
      label="Date of birth"
      dayValue={day}
      monthValue={month}
      yearValue={year}
      onDayChange={setDay}
      onMonthChange={setMonth}
      onYearChange={setYear}
    />
  );
};
```

### DateInputProps

| Prop                  | Type                                | Default     | Description                                           |
| --------------------- | ----------------------------------- | ----------- | ----------------------------------------------------- |
| `label`               | `string`                            | -           | Label text displayed above the inputs                 |
| `helperText`          | `string`                            | -           | Helper text displayed below the inputs                |
| `helperIcon`          | `ComponentType`                     | -           | Icon component to display with helper/validation text |
| `validationStatus`    | `'initial' \| 'valid' \| 'invalid'` | `'initial'` | Validation status of the input                        |
| `validText`           | `string`                            | -           | Text to display when validation status is valid       |
| `invalidText`         | `string`                            | -           | Text to display when validation status is invalid     |
| `required`            | `boolean`                           | `false`     | Whether the input is required                         |
| `disabled`            | `boolean`                           | `false`     | Whether the input is disabled                         |
| `readonly`            | `boolean`                           | `false`     | Whether the input is read-only                        |
| `hideDay`             | `boolean`                           | `false`     | Whether to hide the day segment                       |
| `hideMonth`           | `boolean`                           | `false`     | Whether to hide the month segment                     |
| `hideYear`            | `boolean`                           | `false`     | Whether to hide the year segment                      |
| `dayPlaceholder`      | `string`                            | `'DD'`      | Placeholder text for the day segment                  |
| `monthPlaceholder`    | `string`                            | `'MM'`      | Placeholder text for the month segment                |
| `yearPlaceholder`     | `string`                            | `'YYYY'`    | Placeholder text for the year segment                 |
| `dayValue`            | `string`                            | -           | Controlled value for the day segment                  |
| `monthValue`          | `string`                            | -           | Controlled value for the month segment                |
| `yearValue`           | `string`                            | -           | Controlled value for the year segment                 |
| `dayRef`              | `Ref<TextInput>`                    | -           | Ref for the day input segment                         |
| `monthRef`            | `Ref<TextInput>`                    | -           | Ref for the month input segment                       |
| `yearRef`             | `Ref<TextInput>`                    | -           | Ref for the year input segment                        |
| `onDayChange`         | `(text: string) => void`            | -           | Callback fired when the day value changes             |
| `onMonthChange`       | `(text: string) => void`            | -           | Callback fired when the month value changes           |
| `onYearChange`        | `(text: string) => void`            | -           | Callback fired when the year value changes            |
| `onDayFocus`          | `(e: NativeSyntheticEvent) => void` | -           | Callback fired when the day segment receives focus    |
| `onMonthFocus`        | `(e: NativeSyntheticEvent) => void` | -           | Callback fired when the month segment receives focus  |
| `onYearFocus`         | `(e: NativeSyntheticEvent) => void` | -           | Callback fired when the year segment receives focus   |
| `onDayBlur`           | `(e: NativeSyntheticEvent) => void` | -           | Callback fired when the day segment loses focus       |
| `onMonthBlur`         | `(e: NativeSyntheticEvent) => void` | -           | Callback fired when the month segment loses focus     |
| `onYearBlur`          | `(e: NativeSyntheticEvent) => void` | -           | Callback fired when the year segment loses focus      |
| `inputContainerStyle` | `ViewStyle`                         | -           | Custom style for each input container                 |
| `inputStyle`          | `ViewStyle`                         | -           | Custom style for each input field                     |
| `inputLabelStyle`     | `TextStyle`                         | -           | Custom style for each input label                     |

### Date of Birth

```tsx
<DateInput label="Date of birth" helperText="Enter your date of birth" required />
```

### Card Expiry

Hide the day segment for card expiry dates:

```tsx
<DateInput
  label="Card expiry"
  helperText="Enter the expiry month and year"
  monthValue={month}
  yearValue={year}
  onMonthChange={setMonth}
  onYearChange={setYear}
  hideDay
  required
/>
```

### Year Only

Hide day and month segments for year-only inputs:

```tsx
<DateInput label="Year" helperText="Enter the year" hideDay hideMonth />
```

### Validation

Show validation states with helper text and icons:

```tsx
<View style={{ gap: 16 }}>
  <DateInput
    label="Valid date"
    dayValue={day}
    monthValue={month}
    yearValue={year}
    onDayChange={setDay}
    onMonthChange={setMonth}
    onYearChange={setYear}
    validationStatus="valid"
    validText="Date is valid"
    helperIcon={TickSmallIcon}
    required
  />
  <DateInput
    label="Invalid date"
    dayValue="32"
    monthValue="13"
    yearValue="2025"
    validationStatus="invalid"
    invalidText="Please enter a valid date"
    helperIcon={WarningSmallIcon}
    required
  />
</View>
```

### Disabled

Disabled date inputs:

```tsx
<DateInput
  label="Date of birth"
  helperText="This field is disabled"
  dayValue="15"
  monthValue="06"
  yearValue="1990"
  disabled
/>
```

### Default Value

Set initial values with `value` props:

```tsx
<DateInput label="Date of birth" dayValue="01" monthValue="01" yearValue="2000" />
```

### Custom Validation

Implement custom validation logic:

```tsx
<DateInput
  label="Date of birth"
  helperText="Enter a valid date between 1900 and today"
  dayValue={day}
  monthValue={month}
  yearValue={year}
  onDayChange={setDay}
  onMonthChange={setMonth}
  onYearChange={setYear}
  validationStatus={validation.status}
  validText={validation.status === 'valid' ? validation.message : undefined}
  invalidText={validation.status === 'invalid' ? validation.message : undefined}
  required
/>
```

### Flexible Segments

Control which segments are visible:

```tsx
<View style={{ gap: 16 }}>
  <DateInput label="Full date" helperText="DD/MM/YYYY" />
  <DateInput label="Month and year" helperText="MM/YYYY" hideDay required />
  <DateInput label="Year only" helperText="YYYY" hideDay hideMonth required />
</View>
```

### Grouping Inputs

Group date inputs with other form fields in a card:

```tsx
<Flex spacing="sm">
  <Heading size="lg">Event Registration</Heading>
  <Card variant="subtle" gap="250">
    <DateInput label="Date of birth" helperText="Enter your date of birth" required />
    <DateInput
      label="Event date preference"
      helperText="Select your preferred date"
      required={false}
    />
  </Card>
</Flex>
```

### With State

Programmatically control date values:

```tsx
<Flex spacing="md">
  <DateInput
    label="Date"
    helperText="Select or enter a date"
    dayValue={day}
    monthValue={month}
    yearValue={year}
    onDayChange={setDay}
    onMonthChange={setMonth}
    onYearChange={setYear}
  />
  <Flex spacing="xs">
    <Button onPress={handleSetToday}>Set to Today</Button>
    <Button onPress={handleReset} variant="solid">
      Reset
    </Button>
  </Flex>
</Flex>
```

### Segment Refs

Use `dayRef`, `monthRef`, and `yearRef` to focus each segment programmatically:

```tsx
<Flex spacing="md">
  <DateInput
    label="Date"
    helperText="Use buttons to focus each segment"
    dayValue={day}
    monthValue={month}
    yearValue={year}
    onDayChange={setDay}
    onMonthChange={setMonth}
    onYearChange={setYear}
    dayRef={dayRef}
    monthRef={monthRef}
    yearRef={yearRef}
  />
  <Flex spacing="xs">
    <Button onPress={() => dayRef.current?.focus()}>Focus day</Button>
    <Button onPress={() => monthRef.current?.focus()}>Focus month</Button>
    <Button onPress={() => yearRef.current?.focus()}>Focus year</Button>
  </Flex>
</Flex>
```

```tsx
import { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { Button, DateInput } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const dayRef = useRef<TextInput>(null);
  const monthRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);

  return (
    <>
      <DateInput
        dayValue={day}
        monthValue={month}
        yearValue={year}
        onDayChange={setDay}
        onMonthChange={setMonth}
        onYearChange={setYear}
        dayRef={dayRef}
        monthRef={monthRef}
        yearRef={yearRef}
      />
      <Button onPress={() => monthRef.current?.focus()}>Focus month</Button>
    </>
  );
};
```

### Overriding Styles

You can override the styles of the input containers, input fields, and input labels using the `inputContainerStyle`, `inputStyle`, and `inputLabelStyle` props respectively:

```tsx
<DateInput
  label="Custom width date input"
  helperText="Date input with custom width"
  inputContainerStyle={{ maxWidth: 'auto' }}
/>
```

```tsx
<DateInput
  label="Custom width date input"
  helperText="Date input with custom width"
  inputContainerStyle={{ maxWidth: 'auto' }}
/>
```

## Accessibility

- Each segment has a descriptive label ("Day", "Month", "Year") for screen readers
- Keyboard type is set to `number-pad` for easier numeric input
- Validation states are communicated through helper text and icons
- Disabled state properly communicated to assistive technologies
