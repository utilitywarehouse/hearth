import { createContext, useContext } from 'react';
import type { DatePickerBaseProps, DateType } from './DatePicker.props';
import { CalendarViews } from './enums';

export interface DatePickerContextType extends DatePickerBaseProps {
  locale: string;
  showOutsideDays: boolean;
  firstDayOfWeek: number;
  calendarView: CalendarViews;
  currentDate: DateType; // used for latest state of calendar based on Month and Year
  currentYear: number;
  setCalendarView: (value: CalendarViews) => void;
  onSelectDate: (date: DateType) => void;
  onSelectMonth: (month: number) => void;
  onSelectYear: (year: number) => void;
  onChangeMonth: (value: number) => void;
  onChangeYear: (value: number) => void;
  closeDatePicker: () => void;
}

export const DatePickerContext = createContext({} as DatePickerContextType);

export const useDatePickerContext = () => useContext(DatePickerContext);
