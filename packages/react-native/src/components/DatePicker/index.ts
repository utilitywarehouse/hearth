import 'dayjs/locale/en';
import './polyfill';

export type { BottomSheetMethods as DatePickerMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

export type {
  CalendarDay,
  CalendarMode,
  CalendarMonth,
  CalendarWeek,
  CalendarYear,
  DateType,
} from './DatePicker.props';

export { default as DatePicker } from './DatePicker';
