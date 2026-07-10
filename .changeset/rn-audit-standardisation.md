---
'@utilitywarehouse/hearth-react-native': patch
---

🧹 [HOUSEKEEPING]: Standardise internal file conventions and expand unit test coverage

Internal improvements from a package audit — no API or behaviour changes:

- Pure logic in `StepperInput`, `DatePickerInput`, `TimePickerInput`, `Combobox`
  and `Select` is extracted into co-located `.utils.ts` files with unit tests,
  matching the existing `Pagination`/`Rating` convention.
- Unit tests added for previously untested shared utilities
  (`formatThousands`, `getInitials`, `isEqual`, `hexWithOpacity`,
  `themeValueHelpers`, `getFlattenedColorValue`) and the `DatePicker` calendar
  utilities.
- `SegmentedControl` uses the `segmentedControl.group.padding` design token
  instead of a hardcoded value.
- Barrel files named `index.tsx` without JSX are renamed to `index.ts`, and
  `ToggleButton.props.tsx` to `ToggleButton.props.ts`, matching the component
  folder convention.

**Developer changes**:

No changes required.
