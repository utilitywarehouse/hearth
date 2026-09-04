import type { TextInputProps, ViewProps } from 'react-native';
import type { DateType } from '../DatePicker/DatePicker.props';
import type { TimePickerProps } from '../TimePicker/TimePicker.props';

export interface TimePickerInputBaseProps {
  /** Disables both typing and the time picker trigger button. */
  disabled?: boolean;
  /**
   * Renders the corresponding validation style. Inherited from FormField when nested.
   * @default 'initial'
   */
  validationStatus?: 'initial' | 'valid' | 'invalid';
  /** Prevents manual typing while keeping the picker trigger available. */
  readonly?: boolean;
  /** Forces the focused state styling. */
  focused?: boolean;
  /** Label for the input. Inherited from FormField context when nested. */
  label?: string;
  /**
   * Visual variant of the label text.
   * @default 'body'
   */
  labelVariant?: 'heading' | 'body';
  /** Helper text shown below the input. Inherited from FormField context when nested. */
  helperText?: string;
  /** Icon shown alongside the helper text. */
  helperIcon?: React.ComponentType;
  /** Text shown when `validationStatus` is `'valid'`. Inherited from FormField context when nested. */
  validText?: string;
  /** Text shown when `validationStatus` is `'invalid'`. Inherited from FormField context when nested. */
  invalidText?: string;
  /**
   * Placeholder text shown when the input is empty.
   * @default '--:--'
   */
  placeholder?: string;
  /**
   * Uses BottomSheetTextInput when rendering inside a bottom sheet.
   * @default false
   */
  inBottomSheet?: boolean;
  /**
   * Whether the input is required.
   * @default true
   */
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
