---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add segment refs to `DateInput` for programmatic focus control

The `DateInput` component now supports direct refs for each segment input via `dayRef`, `monthRef`, and `yearRef`.
This makes it easier to move focus between segments from custom flows (for example, advancing focus after validation or from custom buttons).

Documentation and Storybook examples are also updated to show how to use segment refs in real usage.

**Components affected**:
- `DateInput`

**Developer changes**:

You can now pass refs to each segment and call `.focus()` when needed:

```tsx
import { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { Button, DateInput } from '@utilitywarehouse/hearth-react-native';

const DateWithSegmentFocus = () => {
	const [day, setDay] = useState('');
	const [month, setMonth] = useState('');
	const [year, setYear] = useState('');

	const dayRef = useRef<TextInput>(null);
	const monthRef = useRef<TextInput>(null);
	const yearRef = useRef<TextInput>(null);

	return (
		<>
			<DateInput
				label="Date of birth"
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

This is a non-breaking enhancement, so existing `DateInput` usage continues to work without any changes.
