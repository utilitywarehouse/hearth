# DatePicker

Calendar date picker input.

```tsx
import { DatePicker } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `selected` | `Date \| null` | Selected date |
| `onChange` | `(date: Date \| null) => void` | Required |
| `label` | string | |
| `helperText` | string | |
| `validationStatus` | `'valid'` \| `'invalid'` | |
| `validationText` | string | |
| `disabled` | boolean | |
| `readOnly` | boolean | |
| `disableTodayIndicator` | boolean | Hides today highlight in calendar |

```tsx
const [date, setDate] = useState<Date | null>(null);

<DatePicker
  label="Date of birth"
  selected={date}
  onChange={setDate}
/>

// With validation
<DatePicker
  label="Start date"
  selected={startDate}
  onChange={setStartDate}
  helperText="Cover begins on this date"
  validationStatus={errors.startDate ? 'invalid' : undefined}
  validationText={errors.startDate?.message}
/>
```

Use [`DateInput`](DateInput.md) when the user needs to type a date (e.g. date of birth). Use `DatePicker` when selecting from a calendar is more appropriate (e.g. booking a date).
