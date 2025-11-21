import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { DateInputProps } from './DateInput.props';
import { FormGroupBase } from '../FormGroupBase/FormGroupBase';
import { useIds } from '../../hooks/use-ids';
import { mergeIds } from '../../helpers/merge-ids';
import { ElementRef } from 'react';
import { DateInputSegment } from './DateInputSegment';

const COMPONENT_NAME = 'DateInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type DateInputElement = ElementRef<'fieldset'>;

export const DateInput = React.forwardRef<DateInputElement, DateInputProps>(
  (
    {
      className,
      label,
      helperText,
      validationStatus,
      validationText,
      showDay = true,
      showMonth = true,
      showYear = true,
      dayPlaceholder = 'DD',
      monthPlaceholder = 'MM',
      yearPlaceholder = 'YYYY',
      dayValue,
      monthValue,
      yearValue,
      defaultDayValue,
      defaultMonthValue,
      defaultYearValue,
      onDayChange,
      onMonthChange,
      onYearChange,
      disabled,
      required,
      id: providedId,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    forwardedRef
  ) => {
    const { id, helperTextId, validationTextId } = useIds({
      providedId,
      prefix: 'date-input',
    });

    const showValidationText = Boolean(
      !disabled && validationStatus !== undefined && validationText !== undefined
    );

    const ariaDescribedbyValue = mergeIds(
      ariaDescribedby,
      helperText ? helperTextId : undefined,
      showValidationText ? validationTextId : undefined
    );

    return (
      <FormGroupBase
        ref={forwardedRef}
        className={clsx(componentClassName, className)}
        label={label}
        helperText={helperText}
        validationStatus={validationStatus}
        validationText={validationText}
        disabled={disabled}
        id={id}
        aria-describedby={ariaDescribedbyValue}
        {...props}
      >
        <div className={`${componentClassName}Segments`}>
          {showDay ? (
            <DateInputSegment
              maxLength={2}
              placeholder={dayPlaceholder}
              value={dayValue}
              defaultValue={defaultDayValue}
              onChange={onDayChange}
              disabled={disabled}
              required={required}
              label="Day"
              validationStatus={validationStatus}
            />
          ) : null}
          {showMonth ? (
            <DateInputSegment
              maxLength={2}
              placeholder={monthPlaceholder}
              value={monthValue}
              defaultValue={defaultMonthValue}
              onChange={onMonthChange}
              disabled={disabled}
              required={required}
              label="Month"
              validationStatus={validationStatus}
            />
          ) : null}
          {showYear ? (
            <DateInputSegment
              maxLength={4}
              placeholder={yearPlaceholder}
              value={yearValue}
              defaultValue={defaultYearValue}
              onChange={onYearChange}
              disabled={disabled}
              required={required}
              label="Year"
              validationStatus={validationStatus}
            />
          ) : null}
        </div>
      </FormGroupBase>
    );
  }
);

DateInput.displayName = COMPONENT_NAME;
