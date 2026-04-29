'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { DatePickerTriggerProps } from './DatePickerTrigger.props';
import { cn } from '../../helpers/cn';
import { CalendarSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const COMPONENT_NAME = 'DatePickerTrigger';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const DatePickerTrigger = forwardRef<ComponentRef<'button'>, DatePickerTriggerProps>(
  ({ className, value, placeholder = 'DD/MM/YYYY', disabled, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(componentClassName, className)}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onClick}
        type="button"
        {...props}
      >
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
