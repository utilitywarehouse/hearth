import type { TextInputProps, ViewProps } from 'react-native';
import type { DateType } from '../DatePicker/DatePicker.props';
import type { TimePickerProps } from '../TimePicker/TimePicker.props';

export interface TimePickerInputBaseProps {
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
   * Controls how the selected time is formatted when displayed inside the input.
   * Accepts any Day.js format string.
   */
  format?: string;
  /**
   * Accessible label announced when activating the time picker trigger button.
   */
  openButtonLabel?: string;
  /**
   * When true (default), the picker sheet is dismissed as soon as a time is picked.
   */
  autoCloseOnSelect?: boolean;
  /**
   * Additional props forwarded to the underlying TimePicker instance.
   */
  timePickerProps?: Omit<TimePickerProps, 'date' | 'onChange' | 'ref'>;
  /**
   * Handles cleared input values.
   */
  onClear?: () => void;
}

export type TimePickerInputProps = TimePickerInputBaseProps &
  Omit<TextInputProps, 'value' | 'onChange' | 'children'> &
  ViewProps & {
    /**
     * Controlled time value. Accepts Date, string, number or Day.js instances.
     */
    value?: DateType;
    /**
     * Fired after a valid time is parsed either from typing or the picker selection.
     */
    onChange?: (params: { date: DateType }) => void;
  };

export default TimePickerInputProps;
