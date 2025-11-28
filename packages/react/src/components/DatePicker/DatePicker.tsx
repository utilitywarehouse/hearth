import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import clsx from 'clsx';
import { offset } from '@floating-ui/dom';
import type { DatePickerProps } from './DatePicker.props';
import { DatePickerTrigger } from './DatePickerTrigger';
import { DatePickerHeader } from './DatePickerHeader';

const COMPONENT_NAME = 'DatePicker';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type DatePickerElement = ElementRef<'button'>;

export const DatePicker = React.forwardRef<DatePickerElement, DatePickerProps>((props, ref) => {
  const { className, onChange, ...datePickerProps } = extractProps(props, marginPropDefs);
  const [showMonths, setShowMonths] = React.useState(false);
  const [shouldCloseOnSelect, setShouldCloseOnSelect] = React.useState(true);

  const handleChange = (
    date: Date | null,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    if (showMonths) {
      setShowMonths(false);
      setShouldCloseOnSelect(true);
    } else {
      if (onChange !== undefined) {
        onChange(date, event);
      }
    }
  };

  return (
    <ReactDatePicker
      wrapperClassName={clsx(componentClassName, className)}
      customInput={<DatePickerTrigger ref={ref} className="" />}
      renderCustomHeader={props => (
        <DatePickerHeader
          {...props}
          showMonths={showMonths}
          setShowMonths={setShowMonths}
          setShouldCloseOnSelect={setShouldCloseOnSelect}
        />
      )}
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
      showMonthYearPicker={showMonths}
      onMonthChange={date => console.log({ date })}
      shouldCloseOnSelect={shouldCloseOnSelect}
      onChange={handleChange}
      // @ts-expect-error having to be explicit about these types to ensure onChange type is correct
      selectsRange={false}
      // @ts-expect-error having to be explicit about these types to ensure onChange type is correct
      selectsMultiple={false}
      {...datePickerProps}
    />
  );
});

DatePicker.displayName = COMPONENT_NAME;
