import type { RefAttributes, MouseEvent, KeyboardEvent } from 'react';
import { DatePickerProps as DatePickerPrimitiveProps } from 'react-datepicker';
import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';

export type DatePickerProps = Omit<
  DatePickerPrimitiveProps,
  | 'selectsMultiple'
  | 'selectsRange'
  | 'onChange'
  | 'dropdownMode'
  | 'onYearMouseEnter'
  | 'onYearMouseLeave'
  | 'onDayMouseEnter'
  | 'showYearPicker'
  | 'showTimeSelect'
  | 'showTimeInput'
  | 'showYearDropdown'
  | 'showMonthDropdown'
  | 'useWeekdaysShort'
  | 'forceShowMonthNavigation'
  | 'showDisabledMonthNavigation'
  | 'formatWeekDay'
  | 'weekDayClassName'
  | 'weekLabel'
  | 'outsideClickIgnoreClass'
  | 'previousMonthButtonLabel'
  | 'previousYearButtonLabel'
  | 'previousMonthAriaLabel'
  | 'previousYearAriaLabel'
  | 'nextMonthButtonLabel'
  | 'nextYearButtonLabel'
  | 'nextMonthAriaLabel'
  | 'nextYearAriaLabel'
  | 'showPreviousMonths'
  | 'monthsShown'
  | 'renderCustomHeader'
  | 'monthAriaLabelPrefix'
  | 'timeFormat'
  | 'timeIntervals'
  | 'showMonthYearDropdown'
  | 'dateFormatCalendar'
  | 'calendarClassName'
  | 'calendarContainer'
  | 'popperClassName'
  | 'showPopperArrow'
  | 'startOpen'
  | 'clearButtonTitle'
  | 'clearButtonClassName'
  | 'ariaLabelClose'
  | 'customInput'
  | 'showDateSelect'
  | 'strictParsing'
  | 'onInputError'
  | 'allowSameDay'
  | 'withPortal'
  | 'focusSelectedMonth'
  | 'showIcon'
  | 'calendarIconClassname'
  | 'calendarIconClassName'
  | 'toggleCalendarOnIconClick'
  | 'ariaDescribedBy'
  | 'ariaInvalid'
  | 'ariaLabelledBy'
  | 'ariaRequired'
  | 'rangeSeparator'
  | 'isClearable'
> &
  Omit<FormFieldProps, 'hideLabel' | 'onChange'> &
  RefAttributes<HTMLButtonElement> &
  MarginProps & {
    selectsRange?: never;
    selectsMultiple?: never;
    onChange?: (
      date: Date | null,
      event?: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
    ) => void;
    disableTodayIndicator?: boolean;
  };

export type View = 'days' | 'months' | 'years';
