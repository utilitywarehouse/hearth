# Date Picker

The `DatePicker` component presents a calendar experience in a bottom sheet so people can choose one or more dates without leaving the current screen. It supports single-day, ranged, and multi-date selection while respecting locale, calendar, and availability rules.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
  - [`DatePicker`](#datepicker)
  - [Change handlers](#change-handlers)
  - [Imperative API](#imperative-api)
- [Examples](#examples)
  - [Range selection](#range-selection)
  - [Multiple selection](#multiple-selection)
- [Integration notes](#integration-notes)
- [Accessibility](#accessibility)
  - [Screen reader support](#screen-reader-support)
  - [Keyboard navigation](#keyboard-navigation)
  - [Best practices](#best-practices)

## Playground

```tsx
// Example usage
<View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
  <ViewWrap>
    <Button onPress={() => modalRef.current?.present()}>Show Date Picker</Button>
    <DatePicker
      ref={modalRef}
      mode="single"
      date={selected}
      onChange={({ date }) => setSelected(date)}
      onCancel={() => setSelected(undefined)}
    />
  </ViewWrap>
</View>
```

## Usage

Use the `DatePicker` with a ref so you can present and dismiss the bottom sheet when people tap a trigger like a button or form field. The picker respects the locale and calendar you provide and can be configured to limit which dates are selectable.

```tsx
// Example usage
import { useRef, useState } from 'react';
import {
  BottomSheetModalProvider,
  Button,
  DatePicker,
  type DateType,
} from '@utilitywarehouse/hearth-react-native';

const BookingDates = () => {
  const pickerRef = useRef(null);
  const [selected, setSelected] = useState<DateType>();

  return (
    <BottomSheetModalProvider>
      <Button onPress={() => pickerRef.current?.present()}>Choose booking date</Button>

      <DatePicker
        ref={pickerRef}
        mode="single"
        date={selected}
        onChange={({ date }) => setSelected(date)}
        onCancel={() => setSelected(undefined)}
        minDate={new Date()}
      />
    </BottomSheetModalProvider>
  );
};
```

### `DatePicker`

The `DatePicker` extends the `BottomSheetModal` component. The table below highlights the most frequently used props.

| Prop                 | Type                                          | Default            | Description                                                                                               |
| -------------------- | --------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------- |
| `mode`               | `'single' \| 'range' \| 'multiple'`           | `'single'`         | Controls whether the picker returns one date, a start/end range, or multiple discrete dates.              |
| `timeZone`           | `string`                                      | `-`                | IANA time zone identifier applied when normalising and comparing dates.                                   |
| `date`               | `DateType`                                    | `-`                | Selected date in single mode.                                                                             |
| `startDate`          | `DateType`                                    | `-`                | Range start value in range mode.                                                                          |
| `endDate`            | `DateType`                                    | `-`                | Range end value in range mode.                                                                            |
| `dates`              | `DateType[]`                                  | `-`                | Selected dates in multiple mode.                                                                          |
| `min`                | `number`                                      | `-`                | Minimum length of a selected range (in days) when using range mode.                                       |
| `max`                | `number`                                      | `-`                | Maximum length of a selected range (in days) or the maximum number of selected dates in multiple mode.    |
| `onChange`           | `SingleChange \| RangeChange \| MultiChange`  | `-`                | Callback fired after a selection changes.                                                                 |
| `minDate`            | `DateType`                                    | `-`                | Earliest selectable date. Values before this are disabled.                                                |
| `maxDate`            | `DateType`                                    | `-`                | Latest selectable date. Values after this are disabled.                                                   |
| `enabledDates`       | `DateType[] \| ((date: DateType) => boolean)` | `-`                | List or predicate that marks which dates can be chosen.                                                   |
| `disabledDates`      | `DateType[] \| ((date: DateType) => boolean)` | `-`                | List or predicate that marks dates that cannot be chosen.                                                 |
| `firstDayOfWeek`     | `number`                                      | `1`                | Index of the first weekday (0 = Sunday, 6 = Saturday).                                                    |
| `showOutsideDays`    | `boolean`                                     | `true`             | Shows the trailing and leading days from adjacent months.                                                 |
| `initialView`        | `'day' \| 'month' \| 'year'`                  | `'day'`            | Determines the first calendar view when the sheet opens.                                                  |
| `containerHeight`    | `number`                                      | `CONTAINER_HEIGHT` | Height of the calendar container.                                                                         |
| `weekdaysHeight`     | `number`                                      | `WEEKDAYS_HEIGHT`  | Height of the weekday header row.                                                                         |
| `navigationPosition` | `'around' \| 'right' \| 'left'`               | `'right'`          | Placement of the navigation controls.                                                                     |
| `weekdaysFormat`     | `'min' \| 'short' \| 'full'`                  | `'min'`            | Formatting used for weekday labels.                                                                       |
| `monthsFormat`       | `'short' \| 'full'`                           | `'short'`          | Formatting used for month names.                                                                          |
| `monthCaptionFormat` | `'short' \| 'full'`                           | `'full'`           | Formatting used for the heading above the calendar grid.                                                  |
| `multiRangeMode`     | `boolean`                                     | `-`                | Enables an experimental range selection where users can keep choosing additional spans before confirming. |
| `hideHeader`         | `boolean`                                     | `-`                | Hides the calendar header controls.                                                                       |
| `hideFooter`         | `boolean`                                     | `-`                | Hides the footer actions.                                                                                 |
| `hideWeekdays`       | `boolean`                                     | `-`                | Removes the weekday labels row.                                                                           |
| `disableMonthPicker` | `boolean`                                     | `-`                | Prevents switching to the month selection view.                                                           |
| `disableYearPicker`  | `boolean`                                     | `-`                | Prevents switching to the year selection view.                                                            |
| `month`              | `number`                                      | `-`                | Forces the calendar to display a specific month (0-11).                                                   |
| `year`               | `number`                                      | `-`                | Forces the calendar to display a specific year.                                                           |
| `onMonthChange`      | `(month: number) => void`                     | `() => {}`         | Fired when the displayed month changes.                                                                   |
| `onYearChange`       | `(year: number) => void`                      | `() => {}`         | Fired when the displayed year changes.                                                                    |
| `onCancel`           | `() => void`                                  | `() => {}`         | Fired when the cancel action is triggered from the footer.                                                |
| `ref`                | `Ref<BottomSheetModalMethods>`                | `-`                | Gives imperative access to the underlying bottom sheet for presenting or dismissing the picker.           |

### Change handlers

Each selection mode provides specialised payloads when `onChange` fires:

- **Single**: `{ date: DateType }`
- **Range**: `{ startDate: DateType; endDate: DateType }`
- **Multiple**: `{ dates: DateType[]; datePressed?: DateType; change: 'added' | 'removed' | 'updated' }`

### Imperative API

Attach a ref that conforms to `BottomSheetModalMethods` so you can call `present()`, `close()`, or `dismiss()` as needed. This matches the API surface of `BottomSheetModal`.

### Range selection

```tsx
// Example usage
<View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
  <ViewWrap>
    <Button onPress={() => modalRef.current?.present()}>Show Range Date Picker</Button>
    <DatePicker
      mode="range"
      ref={modalRef}
      startDate={range.startDate}
      endDate={range.endDate}
      onChange={params => setRange(params)}
      onCancel={() => setRange({ startDate: undefined, endDate: undefined })}
    />
  </ViewWrap>
</View>
```

```tsx
// Example usage
import { useRef, useState } from 'react';
import {
  BottomSheetModalProvider,
  Button,
  DatePicker,
  type DateType,
} from '@utilitywarehouse/hearth-react-native';

const Example = () => {
  const pickerRef = useRef(null);
  const [range, setRange] = useState<{ startDate?: DateType; endDate?: DateType }>({});

  return (
    <BottomSheetModalProvider>
      <Button onPress={() => pickerRef.current?.present()}>Choose booking dates</Button>

      <DatePicker
        ref={pickerRef}
        mode="range"
        startDate={range.startDate}
        endDate={range.endDate}
        onChange={({ startDate, endDate }) => setRange({ startDate, endDate })}
        onCancel={() => setRange({})}
        minDate={new Date()}
        min={2}
        max={14}
      />
    </BottomSheetModalProvider>
  );
};
```

### Multiple selection

```tsx
// Example usage
<View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
  <ViewWrap>
    <Button onPress={() => modalRef.current?.present()}>Show Multi Date Picker</Button>
    <DatePicker
      mode="multiple"
      ref={modalRef}
      dates={dates}
      onChange={({ dates }) => setDates(dates)}
      onCancel={() => setDates([])}
    />
  </ViewWrap>
</View>
```

```tsx
// Example usage
import { useRef, useState } from 'react';
import {
  BottomSheetModalProvider,
  Button,
  DatePicker,
} from '@utilitywarehouse/hearth-react-native';

const Example = () => {
  const pickerRef = useRef(null);
  const [dates, setDates] = useState<DateType[]>([]);

  return (
    <BottomSheetModalProvider>
      <Button onPress={() => pickerRef.current?.present()}>Choose booking dates</Button>

      <DatePicker
        ref={pickerRef}
        mode="multiple"
        dates={dates}
        onChange={({ dates, datePressed, change }) => setDates(dates)}
        onCancel={() => setDates([])}
        minDate={new Date()}
        min={2}
        max={14}
      />
    </BottomSheetModalProvider>
  );
};
```

## Integration notes

- Wrap your application (or the portion that renders the picker) with `BottomSheetModalProvider` so the sheet can mount correctly, especially when combining with other bottom-sheet components.
- Because the picker respects locale and time zone information, ensure you pass consistent values throughout your app when working with server-sourced dates.
- When pairing the picker with inputs like `FormField`, surface the chosen dates in the trigger control so people can review their selection after the sheet closes.

## Accessibility

The `DatePicker` is designed to be fully accessible for VoiceOver (iOS) and TalkBack (Android) users:

### Screen reader support

- **Automatic focus**: When the picker opens, screen readers automatically announce "Date picker opened" and focus on the calendar content.
- **Platform-optimized navigation**:
  - On iOS, VoiceOver can freely navigate through all calendar elements.
  - On Android, TalkBack announces "Date picker calendar" when opened, then allows navigation through child elements.
- **Descriptive labels**: Each interactive element has clear accessibility labels:
  - Day buttons announce the full date: "Monday, October 8" (with "selected" appended for chosen dates).
  - Month/year buttons announce the current month and year.
  - Navigation buttons specify direction: "Next month", "Prev month", etc.
  - View switcher announces: "Change to day view" or "Change to month view".

### Keyboard navigation

- All interactive controls (days, months, years, navigation) expose `accessibilityRole="button"` for proper identification.
- Buttons respond to standard tap/activate gestures with screen readers.
- The footer cancel button is fully accessible and announced properly.

### Best practices

- The picker works seamlessly within forms when triggered by accessible inputs like `DatePickerInput`.
- Disabled dates are marked as disabled in the accessibility tree, preventing selection attempts.
- The bottom sheet modal itself is marked as not accessible (`accessible={false}`) to prevent it from blocking navigation to child elements.
- All date announcements respect the English locale for consistency with the current implementation.
