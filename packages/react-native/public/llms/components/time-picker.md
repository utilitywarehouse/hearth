# Time Picker

`TimePicker` presents a wheel-based time selector inside a bottom sheet, letting people pick hours and minutes without leaving the current context. It supports 12-hour and 24-hour clocks and returns a JavaScript `Date` whenever the selection changes.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Accessibility](#accessibility)

## Playground

```tsx
<View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
  <ViewWrap>
    <Button onPress={() => modalRef.current?.present()}>Show Time Picker</Button>
    <TimePicker
      ref={modalRef}
      date={selected}
      use12Hours={args.use12Hours}
      minuteInterval={args.minuteInterval}
      onChange={({ date }) => setSelected(date)}
      onCancel={() => setSelected(undefined)}
    />
  </ViewWrap>
</View>
```

## Usage

Use the `TimePicker` with a ref to present the bottom sheet when people tap a trigger button.

```tsx
import { useRef, useState } from 'react';
import {
  BottomSheetModalProvider,
  Button,
  TimePicker,
  type DateType,
} from '@utilitywarehouse/hearth-react-native';

const BookingTime = () => {
  const pickerRef = useRef(null);
  const [time, setTime] = useState<DateType>();

  return (
    <BottomSheetModalProvider>
      <Button onPress={() => pickerRef.current?.present()}>Choose time</Button>

      <TimePicker
        ref={pickerRef}
        date={time}
        onChange={({ date }) => setTime(date)}
        onCancel={() => setTime(undefined)}
        use12Hours={false}
      />
    </BottomSheetModalProvider>
  );
};
```

## Props

`TimePicker` extends the `BottomSheetModal` component. The table below highlights the main props.

| Prop             | Type                                    | Default    | Description                                                     |
| ---------------- | --------------------------------------- | ---------- | --------------------------------------------------------------- |
| `date`           | `DateType`                              | `-`        | Selected time value.                                            |
| `timeZone`       | `string`                                | `-`        | IANA time zone identifier applied to the selected time.         |
| `use12Hours`     | `boolean`                               | `false`    | Displays an AM/PM selector and formats hours from 1 to 12.      |
| `minuteInterval` | `number`                                | `1`        | Step interval for minutes shown in the picker.                  |
| `hideFooter`     | `boolean`                               | `false`    | Hides the Cancel/Ok actions.                                    |
| `onChange`       | `(payload: { date: DateType }) => void` | `-`        | Fired whenever the selected time changes.                       |
| `onCancel`       | `() => void`                            | `() => {}` | Fired when the cancel action is triggered.                      |
| `ref`            | `Ref<BottomSheetModalMethods>`          | `-`        | Gives imperative access to present or dismiss the bottom sheet. |

## Accessibility

- Screen readers announce the picker when the sheet opens and focus the wheel area on Android.
- Action buttons are exposed as standard buttons with clear labels.
