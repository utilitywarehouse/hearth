import { FormGroupBaseProps } from '../FormGroupBase/FormGroupBase.props';
import { InputBaseProps } from '../InputBase/InputBase.props';

export interface DateInputProps
  extends FormGroupBaseProps, Omit<InputBaseProps, keyof FormGroupBaseProps> {
  /**
   * Whether the day segment is visible.
   * @default false
   */
  hideDay?: boolean;
  /**
   * Whether the month segment is visible.
   * @default false
   */
  hideMonth?: boolean;
  /**
   * Whether the year segment is visible.
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
  onDayChange?: InputBaseProps['onChange'];
  /**
   * Callback fired when the month value changes.
   */
  onMonthChange?: InputBaseProps['onChange'];
  /**
   * Callback fired when the year value changes.
   */
  onYearChange?: InputBaseProps['onChange'];
  onDayFocus?: InputBaseProps['onFocus'];
  onMonthFocus?: InputBaseProps['onFocus'];
  onYearFocus?: InputBaseProps['onFocus'];
  onDayBlur?: InputBaseProps['onBlur'];
  onMonthBlur?: InputBaseProps['onBlur'];
  onYearBlur?: InputBaseProps['onBlur'];
}
