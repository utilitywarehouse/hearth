import type { TextInputProps, ViewProps } from 'react-native';
import type { DatePickerSingleProps } from '../DatePicker/DatePicker';
import type { DateType } from '../DatePicker/DatePicker.props';

export interface DatePickerInputBaseProps {
  disabled?: boolean;
  validationStatus?: 'initial' | 'valid' | 'invalid';
  readonly?: boolean;
  focused?: boolean;
  label?: string;
  labelVariant?: 'heading' | 'body';
  helperText?: string;
  helperIcon?: React.ComponentType;
  validText?: string;
  invalidText?: string;
  placeholder?: string;
  inBottomSheet?: boolean;
  required?: boolean;
  /**
   * Controls how the selected date is formatted when displayed inside the input.
   * Accepts any Day.js format string. When left as the default `DD/MM/YYYY`,
   * the input automatically inserts separators as people type.
   */
  format?: string;
  /**
   * Accessible label announced when activating the calendar trigger button.
   */
  openButtonLabel?: string;
  /**
   * When true (default), the calendar sheet is dismissed as soon as a date is picked.
   */
  autoCloseOnSelect?: boolean;
  /**
   * Additional props forwarded to the underlying DatePicker instance.
   */
  datePickerProps?: Omit<DatePickerSingleProps, 'mode' | 'date' | 'onChange' | 'ref'>;
  /**
   * Handles cleared input values.
   */
  onClear?: () => void;
}

export type DatePickerInputProps = DatePickerInputBaseProps &
  Omit<TextInputProps, 'value' | 'onChange' | 'children'> &
  ViewProps & {
    /**
     * Controlled date value. Accepts Date, string, number or Day.js instances.
     */
    value?: DateType;
    /**
     * Fired after a valid date is parsed either from typing or the picker selection.
     */
    onChange?: (params: { date: DateType }) => void;
  };

export default DatePickerInputProps;
