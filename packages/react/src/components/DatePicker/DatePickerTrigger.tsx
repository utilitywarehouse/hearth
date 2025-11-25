import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import React from 'react';
import { DatePickerTriggerProps } from './DatePickerTrigger.props';
import clsx from 'clsx';
import { CalendarSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const COMPONENT_NAME = 'DatePickerTrigger';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type DatePickerTriggerElement = ElementRef<'button'>;

export const DatePickerTrigger = React.forwardRef<DatePickerTriggerElement, DatePickerTriggerProps>(
  ({ className, value, placeholder, ...props }, ref) => {
    return (
      <button className={clsx(componentClassName, className)} ref={ref} {...props}>
        {value ? (
          <div className={`${componentClassName}Value`}>{value}</div>
        ) : placeholder ? (
          <div className={`${componentClassName}Placeholder`}>{placeholder}</div>
        ) : null}
        <div className={`${componentClassName}Icon`}>
          <CalendarSmallIcon />
        </div>
      </button>
    );
  }
);

DatePickerTrigger.displayName = COMPONENT_NAME;
