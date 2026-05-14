'use client';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import DatePickerPrimitive from 'react-datepicker';
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { cn } from '../../helpers/cn';
import { offset } from '@floating-ui/dom';
import type { DatePickerProps, View } from './DatePicker.props';
import { DatePickerTrigger } from './DatePickerTrigger';
import { DatePickerHeader } from './DatePickerHeader';
import { FormField } from '../FormField/FormField';
import { useIds } from '../../hooks/use-ids';
import { mergeIds } from '../../helpers/merge-ids';
import { Portal } from 'radix-ui';
import { forwardRef, useState } from 'react';
import type { ComponentRef, MouseEvent, KeyboardEvent } from 'react';

const COMPONENT_NAME = 'DatePicker';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type DatePickerElement = ComponentRef<'button'>;

export const DatePicker = forwardRef<DatePickerElement, DatePickerProps>((props, ref) => {
  const {
    className,
    onChange,
    onCalendarOpen,
    onCalendarClose,
    validationStatus,
    validationText,
    label,
    labelVariant,
    helperText,
    id: providedId,
    disabled,
    readOnly,
    required,
    disableTodayIndicator,
    ...datePickerProps
  } = extractProps(props, marginPropDefs);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [view, setView] = useState<View>('days');

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
    labelVariant,
    helperText,
    validationText: showValidation ? validationText : undefined,
    validationStatus: showValidation ? validationStatus : undefined,
    required,
  };

  const ariaDescribedbyValue = mergeIds(
    !!helperText ? helperTextId : undefined,
    showValidation && validationText !== undefined ? validationTextId : undefined
  );

  const prevView: { [key in View]: View } = {
    days: 'days',
    months: 'days',
    years: 'months',
  };

  const nextView: { [key in View]: View } = {
    days: 'months',
    months: 'years',
    years: 'days',
  };

  const handleChange = (
    date: Date | null,
    event?: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
  ) => {
    if (view !== 'days') {
      setView(prevView[view]);
    }
    if (onChange !== undefined) {
      onChange(date, event);
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
        }}
        disableTodayIndicator={disableTodayIndicator}
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
    calendarClassName: `${componentClassName}Calendar`,
    dayClassName: () => `${componentClassName}Day`,
    weekClassName: () => `${componentClassName}Week`,
    monthClassName: () => `${componentClassName}Month`,
    yearClassName: () => `${componentClassName}Year`,
    popperClassName: `${componentClassName}Popper`,
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
    popperProps: { strategy: 'fixed' },
    popperContainer: Portal.Root,
  };

  const eventHandlingProps = {
    onChange: handleChange,
    onCalendarClose: handleCalendarClose,
    onCalendarOpen: handleCalendarOpen,
  };

  const stateProps = {
    showMonthYearPicker: view === 'months',
    showYearPicker: view === 'years',
    shouldCloseOnSelect: view === 'days',
    closeOnScroll: true,
  };

  const reactDatePickerProps = {
    ...eventHandlingProps,
    ...defaultProps,
    ...ariaProps,
    ...popperProps,
    ...classNameProps,
    ...stateProps,
    ...customComponents,
    ...datePickerProps,
  };

  return (
    <FormField className={cn(componentClassName, className)} data-testid={componentClassName} {...formFieldProps}>
      <DatePickerPrimitive
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
