# DateInput

`DateInput` allows users to enter a date manually using separate input fields for day, month, and year. It provides flexibility to show only the date segments you need. Use `DateInput` when you need users to enter dates manually.

```tsx
<DateInput label="Date" helperText="Helper text" dayValue="15" monthValue="06" yearValue="1990" />
```

## Alternatives

- DatePicker - For when a calendar adds
  visual benefit to the user.

## Validation

`DateInput` provides the UI for `valid` & `invalid` states visually, however
there is not internal validation logic.

```tsx
<DateInput
  label="Date of birth"
  helperText="Enter a valid date between 1900 and today"
  dayValue={day}
  monthValue={month}
  yearValue={year}
  onDayChange={(event: React.ChangeEvent<HTMLInputElement>) => setDay(event.target.value)}
  onMonthChange={(event: React.ChangeEvent<HTMLInputElement>) => setMonth(event.target.value)}
  onYearChange={(event: React.ChangeEvent<HTMLInputElement>) => setYear(event.target.value)}
  validationStatus={validation.status}
  validationText={validation.message}
  required
/>
```

## Optional inputs

Control which inputs are shown using `hideDay`, `hideMonth`, and `hideYear`
props.

```tsx
<Flex direction="column" gap="400">
  <DateInput label="Full date" helperText="DD/MM/YYYY" />
  <DateInput label="Month and year" helperText="MM/YYYY" hideDay required />
  <DateInput label="Year only" helperText="YYYY" hideDay hideMonth required />
</Flex>
```

## API

This component is based on the `fieldset` element and supports the following common props:

- Margin

| Prop                | Type                                                                        | Default | Description                                                                                                                                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hideDay`           | `boolean`                                                                   | `false` | Whether the day segment is visible.                                                                                                                                                                                                                                   |
| `hideMonth`         | `boolean`                                                                   | `false` | Whether the month segment is visible.                                                                                                                                                                                                                                 |
| `hideYear`          | `boolean`                                                                   | `false` | Whether the year segment is visible.                                                                                                                                                                                                                                  |
| `dayPlaceholder`    | `string`                                                                    | —       | Placeholder text for the day segment.                                                                                                                                                                                                                                 |
| `monthPlaceholder`  | `string`                                                                    | —       | Placeholder text for the month segment.                                                                                                                                                                                                                               |
| `yearPlaceholder`   | `string`                                                                    | —       | Placeholder text for the year segment.                                                                                                                                                                                                                                |
| `dayValue`          | `string`                                                                    | —       | The controlled value for the day segment. Must be used with an `onDayChange` handler.                                                                                                                                                                                 |
| `monthValue`        | `string`                                                                    | —       | The controlled value for the month segment. Must be used with an `onMonthChange` handler.                                                                                                                                                                             |
| `yearValue`         | `string`                                                                    | —       | The controlled value for the year segment. Must be used with an `onYearChange` handler.                                                                                                                                                                               |
| `defaultDayValue`   | `string`                                                                    | —       | The initial value for the day segment when rendered (uncontrolled).                                                                                                                                                                                                   |
| `defaultMonthValue` | `string`                                                                    | —       | The initial value for the month segment when rendered (uncontrolled).                                                                                                                                                                                                 |
| `defaultYearValue`  | `string`                                                                    | —       | The initial value for the year segment when rendered (uncontrolled).                                                                                                                                                                                                  |
| `onDayChange`       | `ChangeEventHandler<HTMLInputElement, HTMLInputElement>`                    | —       | Callback fired when the day value changes.                                                                                                                                                                                                                            |
| `onMonthChange`     | `ChangeEventHandler<HTMLInputElement, HTMLInputElement>`                    | —       | Callback fired when the month value changes.                                                                                                                                                                                                                          |
| `onYearChange`      | `ChangeEventHandler<HTMLInputElement, HTMLInputElement>`                    | —       | Callback fired when the year value changes.                                                                                                                                                                                                                           |
| `onDayFocus`        | `FocusEventHandler<HTMLInputElement>`                                       | —       | Callback fired when the day segment receives focus.                                                                                                                                                                                                                   |
| `onMonthFocus`      | `FocusEventHandler<HTMLInputElement>`                                       | —       | Callback fired when the month segment receives focus.                                                                                                                                                                                                                 |
| `onYearFocus`       | `FocusEventHandler<HTMLInputElement>`                                       | —       | Callback fired when the year segment receives focus.                                                                                                                                                                                                                  |
| `onDayBlur`         | `FocusEventHandler<HTMLInputElement>`                                       | —       | Callback fired when the day segment loses focus.                                                                                                                                                                                                                      |
| `onMonthBlur`       | `FocusEventHandler<HTMLInputElement>`                                       | —       | Callback fired when the month segment loses focus.                                                                                                                                                                                                                    |
| `onYearBlur`        | `FocusEventHandler<HTMLInputElement>`                                       | —       | Callback fired when the year segment loses focus.                                                                                                                                                                                                                     |
| `label`             | `ReactNode`                                                                 | —       | The label for the formfield group. This should contain the question being answered by the formfield group. If you don't include a label you need to ensure you use the `aria-label` or `aria-labelledby` prop to properly associate a label with the formfield group. |
| `labelVariant`      | `"body" \| "heading"`                                                       | —       | Set the label variant                                                                                                                                                                                                                                                 |
| `helperText`        | `ReactNode`                                                                 | —       | Helper text for the formfield group. Provides a hint such as specific requirements for what to choose. When displayed, child components should not display their own `helperText`.                                                                                    |
| `validationText`    | `ReactNode`                                                                 | —       | Text to display when the `validationStatus` is set.                                                                                                                                                                                                                   |
| `validationStatus`  | `"valid" \| "invalid"`                                                      | —       | Indicates the validation status of the formfield group.                                                                                                                                                                                                               |
| `type`              | `"number" \| "search" \| "text" \| "tel" \| "url" \| "email" \| "password"` | `text`  | Sets the input's HTML `type` attribute, which determines the keyboard and validation behavior the browser applies to it.                                                                                                                                              |
| `value`             | `string \| number`                                                          | —       | The controlled value of the input. Must be used with an `onChange` handler.                                                                                                                                                                                           |
