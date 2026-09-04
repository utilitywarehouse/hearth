import { ComponentType } from 'react';
import { ViewProps } from 'react-native';
import { space } from '../../tokens';

interface RadioGroupProps extends ViewProps {
  /** Whether to manually disable the radio group. */
  disabled?: boolean;
  /** The value of the radio group. */
  value?: string;
  /** Called when any child Radio is checked or unchecked. */
  onValueChange?: (value: string) => void;
  /**
   * Called when any child Radio is checked or unchecked.
   * @deprecated Use `onValueChange` instead.
   */
  onChange?: (value: string) => void;
  /** Whether the radio group is read-only. */
  readonly?: boolean;
  /** The validation status of the radio group. */
  validationStatus?: 'valid' | 'invalid' | 'initial';
  /** The label to be displayed above the radio group. */
  label?: string;
  /**
   * The variant of the label text.
   * @default 'body'
   */
  labelVariant?: 'heading' | 'body';
  /** The helper text to be displayed below the radio group. */
  helperText?: string;
  /**
   * Whether to show the validation icon alongside the valid/invalid text.
   * @default true
   */
  showValidationIcon?: boolean;
  /** The invalid text to be displayed below the radio group when `validationStatus` is `'invalid'`. */
  invalidText?: string;
  /** The valid text to be displayed below the radio group when `validationStatus` is `'valid'`. */
  validText?: string;
  /** The icon to be displayed next to the helper text. */
  helperIcon?: ComponentType;
  /** The type of radio rendered by children of the group. */
  type?: 'default' | 'tile';
  /**
   * The layout direction of the radio group's children.
   * @default 'column'
   */
  direction?: 'row' | 'column';
  /** The gap between the radio group items. */
  gap?: keyof typeof space;
}

export default RadioGroupProps;
