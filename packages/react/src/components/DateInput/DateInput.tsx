'use client';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { DateInputProps } from './DateInput.props';
import { FormGroupBase } from '../FormGroupBase/FormGroupBase';
import { useIds } from '../../hooks/use-ids';
import { DateInputSegment } from './DateInputSegment';

const COMPONENT_NAME = 'DateInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const DateInput = ({
  className,
  label,
  helperText,
  validationStatus,
  validationText,
  hideDay,
  hideMonth,
  hideYear,
  dayPlaceholder,
  monthPlaceholder,
  yearPlaceholder,
  dayValue,
  monthValue,
  yearValue,
  defaultDayValue,
  defaultMonthValue,
  defaultYearValue,
  onDayChange,
  onMonthChange,
  onYearChange,
  onDayFocus,
  onMonthFocus,
  onYearFocus,
  onDayBlur,
  onMonthBlur,
  onYearBlur,
  disabled,
  required,
  id: providedId,
  ...props
}: DateInputProps) => {
  const { id } = useIds({ providedId, prefix: 'date-input' });
  return (
    <FormGroupBase
      className={clsx(componentClassName, className)}
      label={label}
      helperText={helperText}
      validationStatus={validationStatus}
      validationText={validationText}
      validationPlacement="bottom"
      disabled={disabled}
      id={id}
      {...props}
    >
      <div className={`${componentClassName}Group`}>
        {hideDay ? null : (
          <DateInputSegment
            maxLength={2}
            placeholder={dayPlaceholder}
            value={dayValue}
            defaultValue={defaultDayValue}
            onChange={onDayChange}
            onFocus={onDayFocus}
            onBlur={onDayBlur}
            disabled={disabled}
            required={required}
            aria-invalid={validationStatus === 'invalid' ? true : undefined}
            label="Day"
            name={`${id}-day`}
            id={`${id}-day`}
          />
        )}
        {hideMonth ? null : (
          <DateInputSegment
            placeholder={monthPlaceholder}
            value={monthValue}
            defaultValue={defaultMonthValue}
            onChange={onMonthChange}
            onFocus={onMonthFocus}
            onBlur={onMonthBlur}
            disabled={disabled}
            required={required}
            aria-invalid={validationStatus === 'invalid' ? true : undefined}
            label="Month"
            name={`${id}-month`}
            id={`${id}-month`}
          />
        )}
        {hideYear ? null : (
          <DateInputSegment
            maxLength={4}
            minLength={4}
            placeholder={yearPlaceholder}
            value={yearValue}
            defaultValue={defaultYearValue}
            onChange={onYearChange}
            onFocus={onYearFocus}
            onBlur={onYearBlur}
            disabled={disabled}
            required={required}
            aria-invalid={validationStatus === 'invalid' ? true : undefined}
            label="Year"
            name={`${id}-year`}
            id={`${id}-year`}
          />
        )}
      </div>
    </FormGroupBase>
  );
};

DateInput.displayName = COMPONENT_NAME;
