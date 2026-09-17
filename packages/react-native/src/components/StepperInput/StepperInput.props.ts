import type { ComponentType, Ref } from 'react';
import type { TextInput, TextInputProps, ViewProps } from 'react-native';

export interface StepperBaseProps {
  ref?: Ref<TextInput>;
  /** Disables the input and both stepper buttons.
   * @default false
   */
  disabled?: boolean;
  /** Validation styling for the input.
   * @default 'initial'
   */
  validationStatus?: 'initial' | 'valid' | 'invalid';
  /** Prevents editing and disables both buttons.
   * @default false
   */
  readonly?: boolean;
  /** Forces the focused visual state on the input.
   * @default false
   */
  focused?: boolean;
  placeholder?: string;
  /** Renders using `BottomSheetTextInput` for use inside a bottom sheet.
   * @default false
   */
  inBottomSheet?: boolean;
  /** Indicates the input is required.
   * @default true
   */
  required?: boolean;
  /** Label shown above the stepper. */
  label?: string;
  /** Typography variant used for the label.
   * @default 'body'
   */
  labelVariant?: 'heading' | 'body';
  /** Helper text shown below the label. */
  helperText?: string;
  /** Icon shown next to the helper text. */
  helperIcon?: ComponentType;
  /** Validation text shown when `validationStatus` is `'valid'`. */
  validText?: string;
  /** Validation text shown when `validationStatus` is `'invalid'`. */
  invalidText?: string;
  /** Controlled value displayed in the input. */
  value?: number | string;
  /** Initial value for uncontrolled usage. */
  defaultValue?: number;
  /** Minimum allowed numeric value. */
  min?: number;
  /** Maximum allowed numeric value. */
  max?: number;
  /** Amount added or removed when a step button is pressed.
   * @default 1
   */
  step?: number;
  /** Called whenever the current text can be parsed as a number. */
  onChangeValue?: (value: number) => void;
  /** Moves focus to the text input after a step button updates the value.
   * @default false
   */
  focusInputOnStepPress?: boolean;
  /** Accessibility label for the decrement button.
   * @default 'Decrease value'
   */
  decrementAccessibilityLabel?: string;
  /** Accessibility label for the increment button.
   * @default 'Increase value'
   */
  incrementAccessibilityLabel?: string;
}

export type StepperInputProps = StepperBaseProps &
  Omit<
    TextInputProps,
    'children' | 'value' | 'defaultValue' | 'onChangeText' | 'editable' | 'keyboardType'
  > &
  ViewProps & {
    /** Called whenever the displayed string changes. */
    onChangeText?: (text: string) => void;
  };

export default StepperInputProps;
