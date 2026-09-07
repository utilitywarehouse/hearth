---
'@utilitywarehouse/hearth-react-native': patch
---

🌟 [FEATURE]: `DatePickerInput` and `TimePickerInput` can block manual keyboard entry and open the picker on tap

New `disableManualEntry` prop. When set, the text field no longer accepts
keyboard input and tapping anywhere on the field opens the calendar/time
picker, instead of only the trailing icon button. This is independent of
`disabled`/`readonly`, which still disable the whole field regardless of this
prop.

**Components affected**:

- `DatePickerInput`
- `TimePickerInput`

**Developer changes**:

No action required — `disableManualEntry` defaults to `false`, so typing
remains available unless you opt in:

```tsx
<DatePickerInput disableManualEntry value={value} onChange={handleChange} />
```

```tsx
<TimePickerInput disableManualEntry value={value} onChange={handleChange} />
```
