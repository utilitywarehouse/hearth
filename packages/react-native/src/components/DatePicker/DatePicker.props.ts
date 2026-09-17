import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import type { Dayjs } from 'dayjs';
import { Ref } from 'react';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { CalendarActionKind, CalendarViews } from './enums';

export type DateType = string | number | Dayjs | Date | null | undefined;

export type CalendarType = 'gregory';

export type CalendarMode = 'single' | 'range' | 'multiple';

export type NavigationPosition = 'around' | 'right' | 'left';

export type WeekdayFormat = 'min' | 'short' | 'full';

export type MonthFormat = 'short' | 'full';

export type LocalState = {
  date: DateType;
  startDate: DateType;
  endDate: DateType;
  dates?: DateType[];
  calendarView: CalendarViews;
  currentDate: DateType; // used for latest state of calendar based on Month and Year
  currentYear: number;
};

export type CalendarAction = {
  type: CalendarActionKind;
  payload: any;
};

export type CalendarDay = {
  number: number;
  text: string;
  date: string;
  isDisabled: boolean;
  isCurrentMonth: boolean;
  dayOfMonth?: number;
  isToday: boolean;
  isSelected: boolean;
  inRange: boolean;
  leftCrop: boolean;
  rightCrop: boolean;
  isStartOfWeek: boolean;
  isEndOfWeek: boolean;
  isCrop: boolean;
  inMiddle: boolean;
  rangeStart: boolean;
  rangeEnd: boolean;
};

export type CalendarWeek = {
  index: number;
  name: {
    full: string;
    short: string;
    min: string;
  };
};

export type CalendarMonth = {
  index: number;
  name: {
    full: string;
    short: string;
  };
  isSelected: boolean;
};

export type CalendarYear = {
  number: number;
  text: string;
  isSelected: boolean;
  isActivated: boolean;
};

export type SingleChange = (params: { date: DateType }) => void;

export type RangeChange = (params: { startDate: DateType; endDate: DateType }) => void;

export type MultiChange = (params: {
  dates: DateType[];
  datePressed?: DateType;
  change: 'added' | 'removed' | 'updated';
}) => void;

export type Styles = Partial<ViewStyle | TextStyle | ImageStyle>;

export interface DatePickerBaseProps {
  /**
   * Controls whether the picker returns a single date, a date range, or multiple dates.
   * @default 'single'
   */
  mode?: CalendarMode;
  /** IANA time zone identifier used to normalise and compare dates. */
  timeZone?: string;
  /** The selected date, used in single mode. */
  date?: DateType;
  /** Start of the selected range, used in range mode. */
  startDate?: DateType;
  /** End of the selected range, used in range mode. */
  endDate?: DateType;
  /** The selected dates, used in multiple mode. */
  dates?: DateType[];
  /** Minimum length of a selected range, in days, when using range mode. */
  min?: number;
  /** Maximum range length, in days, or the maximum number of selected dates in multiple mode. */
  max?: number;
  /** Called after a selection changes. */
  onChange?: SingleChange | RangeChange | MultiChange;
  /** Earliest year available in the year picker. */
  startYear?: number;
  /** Latest year available in the year picker. */
  endYear?: number;
  /** Earliest selectable date; dates before this are disabled. */
  minDate?: DateType;
  /** Latest selectable date; dates after this are disabled. */
  maxDate?: DateType;
  /** List or predicate marking which dates can be selected. */
  enabledDates?: DateType[] | ((date: DateType) => boolean);
  /** List or predicate marking which dates cannot be selected. */
  disabledDates?: DateType[] | ((date: DateType) => boolean);
  /**
   * Index of the first weekday, where 0 is Sunday and 6 is Saturday.
   * @default 1
   */
  firstDayOfWeek?: number;
  /**
   * Whether to show the leading and trailing days from adjacent months.
   * @default true
   */
  showOutsideDays?: boolean;
  /**
   * Whether to show a time picker alongside the calendar, in single mode.
   * @default false
   */
  timePicker?: boolean;
  /** Whether the time picker uses a 12-hour format with AM/PM instead of 24-hour. */
  use12Hours?: boolean;
  /**
   * The calendar view shown when the picker first opens.
   * @default 'day'
   */
  initialView?: CalendarViews;
  /**
   * Height of the calendar container.
   * @default CONTAINER_HEIGHT
   */
  containerHeight?: number;
  /**
   * Height of the weekday header row.
   * @default WEEKDAYS_HEIGHT
   */
  weekdaysHeight?: number;
  style?: ViewStyle;
  /**
   * Placement of the month navigation controls.
   * @default 'right'
   */
  navigationPosition?: NavigationPosition;
  /**
   * Format used for the weekday labels.
   * @default 'min'
   */
  weekdaysFormat?: WeekdayFormat;
  /**
   * Format used for month names.
   * @default 'short'
   */
  monthsFormat?: MonthFormat;
  /**
   * Format used for the heading above the calendar grid.
   * @default 'full'
   */
  monthCaptionFormat?: MonthFormat;
  /** Whether to allow selecting multiple separate ranges before confirming. */
  multiRangeMode?: boolean;
  /** Whether to hide the calendar header controls. */
  hideHeader?: boolean;
  /** Whether to hide the footer actions. */
  hideFooter?: boolean;
  /** Whether to hide the weekday labels row. */
  hideWeekdays?: boolean;
  /** Whether to prevent switching to the month selection view. */
  disableMonthPicker?: boolean;
  /** Whether to prevent switching to the year selection view. */
  disableYearPicker?: boolean;
  /** use to handle month and year selectors */
  month?: number;
  /** Forces the calendar to display a specific year. */
  year?: number;
  /**
   * Called when the displayed month changes.
   * @default () => {}
   */
  onMonthChange?: (month: number) => void;
  /**
   * Called when the displayed year changes.
   * @default () => {}
   */
  onYearChange?: (year: number) => void;
  ref?: Ref<BottomSheetModalMethods<any>>;
  /**
   * Called when the cancel action is triggered from the footer.
   * @default () => {}
   */
  onCancel?: () => void;
}

export type Numerals = 'latn';

export type PickerOption = {
  value: number | string;
  text: string;
};
