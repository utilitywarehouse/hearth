import { createContext, useContext } from 'react';
import { CalendarViews } from './enums';
import type { DatePickerBaseProps, DateType } from './types';

export interface CalendarContextType extends DatePickerBaseProps {
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
}

export const CalendarContext = createContext({} as CalendarContextType);

export const useCalendarContext = () => useContext(CalendarContext);
