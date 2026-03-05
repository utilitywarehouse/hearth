---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add `TimePicker` and `TimePickerInput` components with 12/24-hour support and minute intervals.

Includes a shared time picker view, updated wheel behavior for native platforms, and polished visuals like gradient fades.

**Components affected**:
- `TimePicker`
- `TimePickerInput`

```tsx
import { TimePicker, TimePickerInput } from '@utilitywarehouse/hearth-react-native';
import { useRef, useState } from 'react';
import type { DateType } from '@utilitywarehouse/hearth-react-native';

const Example = () => {
	const [value, setValue] = useState<DateType>();
	const pickerRef = useRef(null);

	return (
		<>
			<TimePickerInput
				value={value}
				onChange={({ date }) => setValue(date ?? undefined)}
				onClear={() => setValue(undefined)}
				timePickerProps={{ use12Hours: true, minuteInterval: 5 }}
			/>
			<TimePicker
				ref={pickerRef}
				date={value}
				onChange={({ date }) => setValue(date)}
				use12Hours
				minuteInterval={5}
			/>
		</>
	);
};
```
