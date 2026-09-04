import type { TextInputProps, ViewProps } from 'react-native';
import type { DatePickerSingleProps } from '../DatePicker/DatePicker';
import type { DateType } from '../DatePicker/DatePicker.props';

export interface DatePickerInputBaseProps {
  /** Disables both typing and the calendar trigger button. */
  disabled?: boolean;
  /**
   * Renders the corresponding validation style.
   * @default 'initial'
   */
  validationStatus?: 'initial' | 'valid' | 'invalid';
  /** Prevents manual typing while keeping the calendar picker available. */
  readonly?: boolean;
  /** Forces the focused visual state. */
  focused?: boolean;
  /** The label for the input. */
  label?: string;
  /** The variant of the label text. */
  labelVariant?: 'heading' | 'body';
  /** Helper text to display below the input. */
  helperText?: string;
  /** Icon to display alongside the helper text. */
  helperIcon?: React.ComponentType;
  /** Text to display below the input when `validationStatus` is `'valid'`. */
  validText?: string;
  /** Text to display below the input when `validationStatus` is `'invalid'`. */
  invalidText?: string;
  placeholder?: string;
  /**
   * Renders using `BottomSheetTextInput` for use inside a bottom sheet.
   * @default false
   */
  inBottomSheet?: boolean;
  /**
   * Whether the input is required.
   * @default true
   */
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
