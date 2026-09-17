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
  | 'disabled'
  | 'onMonthChange'
  | 'onYearChange'
  | 'onMonthMouseLeave'
> &
  Omit<FormFieldProps, 'hideLabel' | 'onChange'> &
  RefAttributes<HTMLButtonElement> &
  MarginProps & {
    /**
     * Not supported — DatePicker only supports selecting a single date.
     */
    selectsRange?: never;
    /**
     * Not supported — DatePicker only supports selecting a single date.
     */
    selectsMultiple?: never;
    /**
     * Callback fired when the selected date changes.
     */
    onChange?: (
      date: Date | null,
      event?: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
    ) => void;
    /**
     * Hides the indicator that highlights today's date in the calendar.
     *
     * @default false
     */
    disableTodayIndicator?: boolean;
    /**
     * Disables the DatePicker, preventing interaction.
     */
    disabled?: DatePickerPrimitiveProps['disabled'];
    /**
     * Callback fired when the displayed month changes.
     */
    onMonthChange?: DatePickerPrimitiveProps['onMonthChange'];
    /**
     * Callback fired when the displayed year changes.
     */
    onYearChange?: DatePickerPrimitiveProps['onYearChange'];
    /**
     * Callback fired when the mouse leaves a month in the calendar.
     */
    onMonthMouseLeave?: DatePickerPrimitiveProps['onMonthMouseLeave'];
  };

export type View = 'days' | 'months' | 'years';
