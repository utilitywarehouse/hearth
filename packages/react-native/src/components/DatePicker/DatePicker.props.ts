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
  show?: boolean;
  mode?: CalendarMode;
  calendar?: CalendarType;
  locale?: string;
  numerals?: Numerals;
  timeZone?: string;
  date?: DateType;
  startDate?: DateType;
  endDate?: DateType;
  dates?: DateType[];
  min?: number;
  max?: number;
  onChange?: SingleChange | RangeChange | MultiChange;
  startYear?: number;
  endYear?: number;
  minDate?: DateType;
  maxDate?: DateType;
  enabledDates?: DateType[] | ((date: DateType) => boolean);
  disabledDates?: DateType[] | ((date: DateType) => boolean);
  firstDayOfWeek?: number;
  showOutsideDays?: boolean;
  timePicker?: boolean;
  use12Hours?: boolean;
  initialView?: CalendarViews;
  containerHeight?: number;
  weekdaysHeight?: number;
  style?: ViewStyle;
  navigationPosition?: NavigationPosition;
  weekdaysFormat?: WeekdayFormat;
  monthsFormat?: MonthFormat;
  monthCaptionFormat?: MonthFormat;
  multiRangeMode?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  hideWeekdays?: boolean;
  disableMonthPicker?: boolean;
  disableYearPicker?: boolean;
  /** use to handle month and year selectors */
  month?: number;
  year?: number;
  onMonthChange?: (month: number) => void;
  onYearChange?: (year: number) => void;
  ref?: Ref<BottomSheetModalMethods<any>>;
  onCancel?: () => void;
}

export type Numerals = 'latn';

export type PickerOption = {
  value: number | string;
  text: string;
};
