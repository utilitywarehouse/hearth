import type { TextInputProps } from 'react-native';
import type { FormFieldBaseProps } from '../FormField/FormField.props';

export interface DateInputProps extends FormFieldBaseProps {
  /**
   * Whether the day segment is hidden.
   * @default false
   */
  hideDay?: boolean;
  /**
   * Whether the month segment is hidden.
   * @default false
   */
  hideMonth?: boolean;
  /**
   * Whether the year segment is hidden.
   * @default false
   */
  hideYear?: boolean;
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
   * Callback fired when the day value changes.
   */
  onDayChange?: (text: string) => void;
  /**
   * Callback fired when the month value changes.
   */
  onMonthChange?: (text: string) => void;
  /**
   * Callback fired when the year value changes.
   */
  onYearChange?: (text: string) => void;
  /**
   * Callback fired when the day segment receives focus.
   */
  onDayFocus?: TextInputProps['onFocus'];
  /**
   * Callback fired when the month segment receives focus.
   */
  onMonthFocus?: TextInputProps['onFocus'];
  /**
   * Callback fired when the year segment receives focus.
   */
  onYearFocus?: TextInputProps['onFocus'];
  /**
   * Callback fired when the day segment loses focus.
   */
  onDayBlur?: TextInputProps['onBlur'];
  /**
   * Callback fired when the month segment loses focus.
   */
  onMonthBlur?: TextInputProps['onBlur'];
  /**
   * Callback fired when the year segment loses focus.
   */
  onYearBlur?: TextInputProps['onBlur'];
}
