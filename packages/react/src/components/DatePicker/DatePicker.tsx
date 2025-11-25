import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import clsx from 'clsx';
import { offset } from '@floating-ui/dom';
import { DatePickerProps } from './DatePicker.props';
import { DatePickerTrigger } from './DatePickerTrigger';

const COMPONENT_NAME = 'DatePicker';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type DatePickerElement = ElementRef<'div'>;

export const DatePicker = React.forwardRef<DatePickerElement, DatePickerProps>((props, ref) => {
  const {
    className,
    placeholderText = 'DD/MM/YYYY',
    label,
    helperText,
    validationText,
    validationStatus,
    triggerRef,
    ...datePickerProps
  } = extractProps(props, marginPropDefs);

  console.log({ label, helperText, validationStatus, validationText });

  return (
    <ReactDatePicker
      wrapperClassName={clsx(componentClassName, className)}
      customInput={<DatePickerTrigger ref={triggerRef} className="" />}
      placeholderText={placeholderText}
      dateFormat="dd/MM/yyyy"
      showPopperArrow={false}
      popperModifiers={[offset(-6)]}
      popperPlacement="bottom-start"
      calendarStartDay={1}
      calendarClassName="hearth-DatePickerCalendar"
      dayClassName={() => 'hearth-DatePickerDay'}
      weekClassName={() => 'hearth-DatePickerWeek'}
      monthClassName={() => 'hearth-DatePickerMonth'}
      formatWeekDay={day => day.charAt(0)}
      {...datePickerProps}
    />
  );
});

DatePicker.displayName = COMPONENT_NAME;
