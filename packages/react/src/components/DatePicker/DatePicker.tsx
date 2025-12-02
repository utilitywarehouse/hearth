import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import clsx from 'clsx';
import { offset } from '@floating-ui/dom';
import type { DatePickerProps, View } from './DatePicker.props';
import { DatePickerTrigger } from './DatePickerTrigger';
import { DatePickerHeader } from './DatePickerHeader';
import { FormField } from '../FormField/FormField';
import { useIds } from '../../hooks/use-ids';
import { mergeIds } from '../../helpers/merge-ids';

const COMPONENT_NAME = 'DatePicker';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type DatePickerElement = ElementRef<'button'>;

export const DatePicker = React.forwardRef<DatePickerElement, DatePickerProps>((props, ref) => {
  const {
    className,
    onChange,
    onCalendarOpen,
    onCalendarClose,
    validationStatus,
    validationText,
    label,
    helperText,
    id: providedId,
    disabled,
    readOnly,
    required,
    ...datePickerProps
  } = extractProps(props, marginPropDefs);
  const [shouldCloseOnSelect, setShouldCloseOnSelect] = React.useState(true);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [view, setView] = React.useState<View>('days');

  const { id, labelId, helperTextId, validationTextId } = useIds({
    providedId,
    prefix: 'date-picker',
  });

  const showValidation = Boolean(!readOnly && !disabled);

  const formFieldProps = {
    id,
    labelId,
    helperTextId,
    validationTextId,
    label,
    helperText,
    validationText: showValidation ? validationText : undefined,
    validationStatus: showValidation ? validationStatus : undefined,
    required,
  };

  const ariaDescribedbyValue = mergeIds(
    !!helperText ? helperTextId : undefined,
    showValidation && validationText !== undefined ? validationTextId : undefined
  );

  const nextView: { [key in View]: View } = {
    days: 'months',
    months: 'years',
    years: 'days',
  };

  const handleChange = (
    date: Date | null,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    if (view === 'months') {
      setView('days');
      setShouldCloseOnSelect(true);
    } else {
      if (onChange !== undefined) {
        onChange(date, event);
      }
    }
  };

  const handleCalendarOpen = () => {
    setCalendarOpen(true);
    if (onCalendarOpen) {
      onCalendarOpen();
    }
  };

  const handleCalendarClose = () => {
    setCalendarOpen(false);
    setView('days');
    if (onCalendarClose) {
      onCalendarClose();
    }
  };

  const customComponents = {
    customInput: (
      <DatePickerTrigger
        ref={ref}
        className=""
        data-calendar-state={calendarOpen ? 'open' : 'closed'}
      />
    ),
    renderCustomHeader: (props: ReactDatePickerCustomHeaderProps) => (
      <DatePickerHeader
        {...props}
        view={view}
        onClick={() => {
          setView(nextView[view]);
          setShouldCloseOnSelect(false);
        }}
      />
    ),
  };

  const ariaProps = {
    'aria-labelledby': labelId,
    'aria-describedby': ariaDescribedbyValue,
    'aria-invalid': validationStatus === 'invalid' ? true : undefined,
    'aria-errormessage': validationStatus === 'invalid' ? validationTextId : undefined,
  };

  const classNameProps = {
    calendarClassName: 'hearth-DatePickerCalendar',
    dayClassName: () => 'hearth-DatePickerDay',
    weekClassName: () => 'hearth-DatePickerWeek',
    monthClassName: () => 'hearth-DatePickerMonth',
    yearClassName: () => 'hearth-DatePickerYear',
  };

  const defaultProps = {
    required,
    disabled,
    readOnly,
    calendarStartDay: 1,
    showIcon: false,
    dateFormat: 'dd/MM/yyyy',
    formatWeekDay: (day: Date) => day.toString().charAt(0),
  };

  const popperProps = {
    showPopperArrow: false,
    popperModifiers: [offset(-6)],
    popperPlacement: 'bottom-start',
  };

  const eventHandlingProps = {
    onChange: handleChange,
    onCalendarClose: handleCalendarClose,
    onCalendarOpen: handleCalendarOpen,
  };

  const stateProps = {
    showMonthYearPicker: view === 'months',
    showYearPicker: view === 'years',
    shouldCloseOnSelect: shouldCloseOnSelect,
  };

  const reactDatePickerProps = {
    ...stateProps,
    ...eventHandlingProps,
    ...defaultProps,
    ...ariaProps,
    ...classNameProps,
    ...popperProps,
    ...customComponents,
    ...datePickerProps,
  };

  return (
    <FormField className={clsx(componentClassName, className)} {...formFieldProps}>
      <ReactDatePicker
        {...reactDatePickerProps}
        // @ts-expect-error having to be explicit about these types to ensure onChange type is correct
        selectsRange={false}
        // @ts-expect-error having to be explicit about these types to ensure onChange type is correct
        selectsMultiple={false}
      />
    </FormField>
  );
});

DatePicker.displayName = COMPONENT_NAME;
