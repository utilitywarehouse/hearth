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
  const [showMonths, setShowMonths] = React.useState(false);
  const [shouldCloseOnSelect, setShouldCloseOnSelect] = React.useState(true);
  const [calendarOpen, setCalendarOpen] = React.useState(false);

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

  const handleCalendarOpen = () => {
    setCalendarOpen(true);
    if (onCalendarOpen) {
      onCalendarOpen();
    }
  };

  const handleCalendarClose = () => {
    setCalendarOpen(false);
    if (onCalendarClose) {
      onCalendarClose();
    }
  };
  return (
    <FormField className={clsx(componentClassName, className)} {...formFieldProps}>
      <ReactDatePicker
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        aria-labelledby={labelId}
        aria-describedby={ariaDescribedbyValue}
        aria-invalid={validationStatus === 'invalid' ? true : undefined}
        aria-errormessage={validationStatus === 'invalid' ? validationTextId : undefined}
        customInput={
          <DatePickerTrigger
            ref={ref}
            className=""
            data-calendar-state={calendarOpen ? 'open' : 'closed'}
            // data-validation-status={validationStatus ? validationStatus : undefined}
          />
        }
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
        showIcon={false}
        formatWeekDay={day => day.charAt(0)}
        showMonthYearPicker={showMonths}
        onMonthChange={date => console.log({ date })}
        shouldCloseOnSelect={shouldCloseOnSelect}
        onChange={handleChange}
        onCalendarClose={handleCalendarClose}
        onCalendarOpen={handleCalendarOpen}
        // @ts-expect-error having to be explicit about these types to ensure onChange type is correct
        selectsRange={false}
        // @ts-expect-error having to be explicit about these types to ensure onChange type is correct
        selectsMultiple={false}
        {...datePickerProps}
      />
    </FormField>
  );
});

DatePicker.displayName = COMPONENT_NAME;
