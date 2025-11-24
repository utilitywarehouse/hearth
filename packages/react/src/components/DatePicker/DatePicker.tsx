import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { DatePickerProps } from './DatePicker.props';
import clsx from 'clsx';
import { Button } from '../Button/Button';
import { offset } from '@floating-ui/dom';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'DatePicker';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type DatePickerElement = ElementRef<'button'>;

type ExampleCustomInputProps = {
  className?: string;
  value?: string;
  onClick?: () => void;
};

export const DatePicker = React.forwardRef<DatePickerElement, DatePickerProps>((props, ref) => {
  const { className, ...datePickerProps } = extractProps(props, marginPropDefs);

  const ExampleCustomInput = React.forwardRef<HTMLButtonElement, ExampleCustomInputProps>(
    ({ value, onClick, className }, ref) => (
      <Button className={className} onClick={onClick} ref={ref}>
        {value}
      </Button>
    )
  );
  ExampleCustomInput.displayName = 'ass';

  return (
    <ReactDatePicker
      className={clsx(componentClassName, className)}
      customInput={<ExampleCustomInput className="example-custom-input" />}
      showPopperArrow={false}
      popperModifiers={[offset(-6)]}
      // wrapperClassName="hearth-DatePicker"
      calendarClassName="hearth-DatePickerCalendar"
      dayClassName={() => 'hearth-DatePickerDay'}
      weekClassName={() => 'hearth-DatePickerWeek'}
      monthClassName={() => 'hearth-DatePickerMonth'}
      // renderDayContents={(day: number) => (
      //   <BodyText as="span" size="md">
      //     {day}
      //   </BodyText>
      // )}
      {...datePickerProps}
    />
  );
});

DatePicker.displayName = COMPONENT_NAME;
