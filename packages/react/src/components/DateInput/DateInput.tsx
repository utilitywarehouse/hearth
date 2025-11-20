import * as React from 'react';
import clsx from 'clsx';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { DateInputProps } from './DateInput.props';
import { FormGroupBase } from '../FormGroupBase/FormGroupBase';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { useIds } from '../../hooks/use-ids';
import { mergeIds } from '../../helpers/merge-ids';
import { ElementRef } from 'react';
import { TextInput } from '../TextInput/TextInput';

const COMPONENT_NAME = 'DateInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type DateInputElement = ElementRef<'fieldset'>;

const filterToNumeric = (value: string, maxLength: number): string => {
  return value.replace(/\D/g, '').slice(0, maxLength);
};

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
      dayPlaceholder,
      monthPlaceholder,
      yearPlaceholder,
      dayValue: dayProp,
      monthValue: monthProp,
      yearValue: yearProp,
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

    const [day, setDay] = useControllableState({
      prop: dayProp,
      defaultProp: defaultDayValue ?? '',
      onChange: onDayChange,
    });
    const [month, setMonth] = useControllableState({
      prop: monthProp,
      defaultProp: defaultMonthValue ?? '',
      onChange: onMonthChange,
    });
    const [year, setYear] = useControllableState({
      prop: yearProp,
      defaultProp: defaultYearValue ?? '',
      onChange: onYearChange,
    });

    // Handler Functions
    const handleDayChange = React.useCallback(
      (value: string) => {
        setDay(filterToNumeric(value, 2));
      },
      [setDay]
    );
    const handleMonthChange = React.useCallback(
      (value: string) => {
        setMonth(filterToNumeric(value, 2));
      },
      [setMonth]
    );
    const handleYearChange = React.useCallback(
      (value: string) => {
        setYear(filterToNumeric(value, 4));
      },
      [setYear]
    );

    // Determine which segments to show and their order
    const segments = React.useMemo(() => {
      const allSegments = [];

      if (showDay) {
        allSegments.push({
          key: 'day' as const,
          value: day,
          onChange: handleDayChange,
          placeholder: dayPlaceholder || 'DD',
          label: 'Day',
          maxLength: 2,
          width: '64px',
        });
      }

      if (showMonth) {
        allSegments.push({
          key: 'month' as const,
          value: month,
          onChange: handleMonthChange,
          placeholder: monthPlaceholder || 'MM',
          label: 'Month',
          maxLength: 2,
          width: '64px',
        });
      }

      if (showYear) {
        allSegments.push({
          key: 'year' as const,
          value: year,
          onChange: handleYearChange,
          placeholder: yearPlaceholder || 'YYYY',
          label: 'Year',
          maxLength: 4,
          width: '96px',
        });
      }

      return allSegments;
    }, [
      showDay,
      showMonth,
      showYear,
      day,
      month,
      year,
      dayPlaceholder,
      monthPlaceholder,
      yearPlaceholder,
      handleDayChange,
      handleMonthChange,
      handleYearChange,
    ]);

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
        <Flex
          className={`${componentClassName}Segments`}
          data-validation-status={validationStatus ? validationStatus : undefined}
          data-disabled={disabled ? '' : undefined}
        >
          {segments.map((segment, index) => (
            <Flex
              key={segment.key}
              direction="column"
              gap="50"
              className={`${componentClassName}Segment`}
              style={{ width: segment.width }}
            >
              <Label
                htmlFor={`${id}-${segment.key}`}
                className={`${componentClassName}SegmentLabel`}
                disableUserSelect
              >
                {segment.label}
              </Label>
              <div className={`${componentClassName}SegmentRoot`}>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id={`${id}-${segment.key}`}
                  maxLength={segment.maxLength}
                  placeholder={!disabled ? segment.placeholder : undefined}
                  value={segment.value ?? ''}
                  onChange={e => segment.onChange(e.target.value)}
                  disabled={disabled}
                  required={required && index === 0}
                  aria-label={segment.label}
                  aria-invalid={validationStatus === 'invalid' ? true : undefined}
                  aria-describedby={ariaDescribedbyValue}
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
            </Flex>
          ))}
        </Flex>
      </FormGroupBase>
    );
  }
);

DateInput.displayName = COMPONENT_NAME;
