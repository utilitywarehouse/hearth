import { ComponentPropsWithout } from '../../types/component-props';
import { MarginProps } from '../../props/margin.props';
import { ElementRef } from 'react';

export interface DateInputProps
  extends ComponentPropsWithout<'fieldset', 'onChange' | 'defaultValue'>,
    MarginProps {
  /**
   * The label for the DateInput, describing its purpose.
   */
  label: string;
  /**
   * Optional helper text to provide additional context or instructions.
   */
  helperText?: string;
  /**
   * Indicates the validation state of the DateInput.
   */
  validationStatus?: 'valid' | 'invalid';
  /**
   * Text to display when the `validationStatus` is set.
   */
  validationText?: string;
  /**
   * Whether the field is required.
   */
  required?: boolean;
  /**
   * Whether the day segment is visible.
   * @default true
   */
  showDay?: boolean;
  /**
   * Whether the month segment is visible.
   * @default true
   */
  showMonth?: boolean;
  /**
   * Whether the year segment is visible.
   * @default true
   */
  showYear?: boolean;
  /**
   * Placeholder text for the day segment.
   */
  dayPlaceholder?: string;
  /**
   * Placeholder text for the month segment.
   */
  monthPlaceholder?: string;
  /**
   * Placeholder text for the year segment.
   */
  yearPlaceholder?: string;
  /**
   * The controlled value for the day segment. Must be used with an `onDayChange` handler.
   */
  dayValue?: string;
  /**
   * The controlled value for the month segment. Must be used with an `onMonthChange` handler.
   */
  monthValue?: string;
  /**
   * The controlled value for the year segment. Must be used with an `onYearChange` handler.
   */
  yearValue?: string;
  /**
   * The initial value for the day segment when rendered (uncontrolled).
   */
  defaultDayValue?: string;
  /**
   * The initial value for the month segment when rendered (uncontrolled).
   */
  defaultMonthValue?: string;
  /**
   * The initial value for the year segment when rendered (uncontrolled).
   */
  defaultYearValue?: string;
  /**
   * Callback fired when the day value changes.
   */
  onDayChange?: (day: string) => void;
  /**
   * Callback fired when the month value changes.
   */
  onMonthChange?: (month: string) => void;
  /**
   * Callback fired when the year value changes.
   */
  onYearChange?: (year: string) => void;
}

export type DateInputElement = ElementRef<'fieldset'>;
