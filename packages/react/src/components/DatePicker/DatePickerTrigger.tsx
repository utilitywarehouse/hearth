'use client';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { DatePickerTriggerProps } from './DatePickerTrigger.props';
import clsx from 'clsx';
import { CalendarSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const COMPONENT_NAME = 'DatePickerTrigger';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const DatePickerTrigger = ({
  className,
  value,
  placeholder = 'DD/MM/YYYY',
  disabled,
  onClick,
  ...props
}: DatePickerTriggerProps) => {
  return (
    <button
      className={clsx(componentClassName, className)}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
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
};

DatePickerTrigger.displayName = COMPONENT_NAME;
