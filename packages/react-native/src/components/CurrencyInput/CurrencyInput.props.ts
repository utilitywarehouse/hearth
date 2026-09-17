import type { Ref } from 'react';
import type { TextInput, TextInputProps, ViewProps } from 'react-native';

export interface CurrencyInputBaseProps {
  /** Ref to the underlying text input. */
  ref?: Ref<TextInput>;
  /** Disables the input.
   * @default false
   */
  disabled?: boolean;
  /** Validation styling state.
   * @default 'initial'
   */
  validationStatus?: 'initial' | 'valid' | 'invalid';
  /** Makes the input read-only.
   * @default false
   */
  readonly?: boolean;
  /** Forces the focused visual state.
   * @default false
   */
  focused?: boolean;
  placeholder?: string;
  /** Renders using `BottomSheetTextInput` for use inside a bottom sheet.
   * @default false
   */
  inBottomSheet?: boolean;
  /** Whether the input is required. */
  required?: boolean;
  /** When not specifically disabled, the numeric value is automatically formatted with thousand separators (e.g. 1234 -> 1,234). */
  disableGroupSeparator?: boolean;
  /** The label for the input. */
  label?: string;
  /** The variant of the label text.
   * @default 'body'
   */
  labelVariant?: 'heading' | 'body';
  /** Helper text to display below the input. */
  helperText?: string;
  /** Icon to display alongside the helper text. */
  helperIcon?: React.ComponentType;
  /** Text to display below the input when `validationStatus` is `'valid'`. */
  validText?: string;
  /** Text to display below the input when `validationStatus` is `'invalid'`. */
  invalidText?: string;
}

export type CurrencyInputProps = CurrencyInputBaseProps &
  Omit<TextInputProps, 'children'> &
  ViewProps;

export default CurrencyInputProps;
