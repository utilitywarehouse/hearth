import * as React from 'react';
import clsx from 'clsx';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { DateInputElement, DateInputProps } from './DateInput.props';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { FormGroupBase } from '../FormGroupBase/FormGroupBase';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { useIds } from '../../hooks/use-ids';
import { mergeIds } from '../../helpers/merge-ids';

const COMPONENT_NAME = 'DateInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SegmentKey = 'day' | 'month' | 'year';

interface SegmentConfig {
  key: SegmentKey;
  label: string;
  maxLength: number;
  placeholder: string;
  width: string;
}

const SEGMENT_CONFIGS = {
  day: {
    label: 'Day',
    maxLength: 2,
    defaultPlaceholder: 'DD',
    width: '64px',
  },
  month: {
    label: 'Month',
    maxLength: 2,
    defaultPlaceholder: 'MM',
    width: '64px',
  },
  year: {
    label: 'Year',
    maxLength: 4,
    defaultPlaceholder: 'YYYY',
    width: '96px',
  },
};

const filterToNumeric = (value: string, maxLength: number): string => {
  return value.replace(/\D/g, '').slice(0, maxLength);
};

export const DateInput = React.forwardRef<DateInputElement, DateInputProps>(
  (props, forwardedRef) => {
    const {
      className,
      label,
      helperText,
      validationStatus,
      validationText,
      showDay = true,
      showMonth = true,
      showYear = true,
      placeholders = {},
      day: dayProp,
      month: monthProp,
      year: yearProp,
      defaultDay,
      defaultMonth,
      defaultYear,
      onDayChange,
      onMonthChange,
      onYearChange,
      disabled,
      required,
      id: providedId,
      'aria-describedby': ariaDescribedby,
      ...fieldsetProps
    } = extractProps(props, marginPropDefs);

    const [day, setDay] = useControllableState({
      prop: dayProp,
      defaultProp: defaultDay ?? '',
      onChange: onDayChange,
    });

    const [month, setMonth] = useControllableState({
      prop: monthProp,
      defaultProp: defaultMonth ?? '',
      onChange: onMonthChange,
    });

    const [year, setYear] = useControllableState({
      prop: yearProp,
      defaultProp: defaultYear ?? '',
      onChange: onYearChange,
    });

    const { id, helperTextId, validationTextId } = useIds({
      providedId,
      prefix: 'date-input',
    });

    // Generate segment configurations based on visibility
    const segments: Array<SegmentConfig> = React.useMemo(() => {
      const visibilityMap: Record<SegmentKey, boolean> = {
        day: showDay,
        month: showMonth,
        year: showYear,
      };

      const keys: Array<SegmentKey> = ['day', 'month', 'year'];
      return keys
        .filter(key => visibilityMap[key])
        .map(key => {
          const config = SEGMENT_CONFIGS[key];
          return {
            key,
            label: config.label,
            maxLength: config.maxLength,
            placeholder: placeholders[key] || config.defaultPlaceholder,
            width: config.width,
          };
        });
    }, [showDay, showMonth, showYear, placeholders]);

    const inputRefs = React.useRef<Record<string, HTMLInputElement | null>>({});

    const focusSegment = React.useCallback((key: string) => {
      const input = inputRefs.current[key];
      if (input) {
        input.focus();
      }
    }, []);

    const getValueForKey = React.useCallback(
      (key: SegmentKey): string => {
        switch (key) {
          case 'day':
            return day ?? '';
          case 'month':
            return month ?? '';
          case 'year':
            return year ?? '';
        }
      },
      [day, month, year]
    );

    const setValueForKey = React.useCallback(
      (key: SegmentKey, value: string) => {
        switch (key) {
          case 'day':
            setDay(value);
            break;
          case 'month':
            setMonth(value);
            break;
          case 'year':
            setYear(value);
            break;
        }
      },
      [setDay, setMonth, setYear]
    );

    const handleChange = React.useCallback(
      (key: SegmentKey, newVal: string) => {
        const config = SEGMENT_CONFIGS[key];
        const filtered = filterToNumeric(newVal, config.maxLength);

        setValueForKey(key, filtered);

        // Got to next segment if max length reached
        if (filtered.length === config.maxLength) {
          const currentIndex = segments.findIndex(s => s.key === key);
          if (currentIndex < segments.length - 1) {
            const nextSegment = segments[currentIndex + 1];
            if (nextSegment) {
              // queueMicrotask is used to ensure the focus is set after the current task is completed.
              // If we just call focusSegment directly, the focus will be set too fast providing a bad UX.
              queueMicrotask(() => focusSegment(nextSegment.key));
            }
          }
        }
      },
      [setValueForKey, segments, focusSegment]
    );

    const handleKeyDown = React.useCallback(
      (key: SegmentKey, e: React.KeyboardEvent<HTMLInputElement>) => {
        const currentIndex = segments.findIndex(s => s.key === key);
        const currentValue = getValueForKey(key);

        if (e.key === 'ArrowRight') {
          e.preventDefault();
          if (currentIndex < segments.length - 1) {
            const nextSegment = segments[currentIndex + 1];
            if (nextSegment) {
              focusSegment(nextSegment.key);
            }
          }
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (currentIndex > 0) {
            const prevSegment = segments[currentIndex - 1];
            if (prevSegment) {
              focusSegment(prevSegment.key);
            }
          }
        } else if (e.key === 'Backspace' && currentValue === '' && currentIndex > 0) {
          e.preventDefault();
          const prevSegment = segments[currentIndex - 1];
          if (prevSegment) {
            focusSegment(prevSegment.key);
          }
        }
      },
      [segments, getValueForKey, focusSegment]
    );

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
        {...fieldsetProps}
      >
        <Flex
          className="hearth-DateInputSegments"
          gap="100"
          data-validation-status={validationStatus ? validationStatus : undefined}
          data-disabled={disabled ? '' : undefined}
        >
          {segments.map(segment => (
            <Flex
              key={segment.key}
              direction="column"
              gap="50"
              className="hearth-DateInputSegment"
              style={{ width: segment.width }}
            >
              <Label
                htmlFor={`${id}-${segment.key}`}
                className="hearth-DateInputSegmentLabel"
                disableUserSelect
              >
                {segment.label}
              </Label>
              <div className="hearth-DateInputSegmentRoot">
                <input
                  ref={el => {
                    inputRefs.current[segment.key] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id={`${id}-${segment.key}`}
                  maxLength={segment.maxLength}
                  placeholder={!disabled ? segment.placeholder : undefined}
                  value={getValueForKey(segment.key)}
                  onChange={e => handleChange(segment.key, e.target.value)}
                  onKeyDown={e => handleKeyDown(segment.key, e)}
                  disabled={disabled}
                  required={required && segment.key === segments[0]?.key}
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
