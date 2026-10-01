import { ComponentType } from 'react';
import { ViewProps } from 'react-native';
import { space } from '../../tokens';

interface CheckboxGroupProps extends ViewProps {
  /** Disables every checkbox in the group. */
  disabled?: boolean;
  /** The selected values in the group. */
  value?: Array<string>;
  /** Called with the full array of selected values when any checkbox in the group is checked or unchecked. */
  onValueChange?: (value: Array<string>) => void;
  /**
   * Called with the full array of selected values when any checkbox in the group is checked or unchecked.
   * @deprecated Use `onValueChange` instead.
   */
  onChange?: (value: Array<string>) => void;
  /** Marks every checkbox in the group as read-only. */
  readonly?: boolean;
  /** The validation status of the checkbox group. */
  validationStatus?: 'valid' | 'invalid' | 'initial';
  /** The label to display above the checkbox group. */
  label?: string;
  /** The variant of the label text.
   * @default 'body'
   */
  labelVariant?: 'heading' | 'body';
  /** The helper text to display below the checkbox group. */
  helperText?: string;
  /** Whether to show the validation icon.
   * @default true
   */
  showValidationIcon?: boolean;
  /** The text to display below the checkbox group when `validationStatus` is `'invalid'`. */
  invalidText?: string;
  /** The text to display below the checkbox group when `validationStatus` is `'valid'`. */
  validText?: string;
  /** The icon to display next to the helper text. */
  helperIcon?: ComponentType;
  /** The type of checkbox rendered by the group's children.
   * @default 'default'
   */
  type?: 'default' | 'tile';
  /** The layout direction of the checkboxes in the group.
   * @default 'column'
   */
  direction?: 'row' | 'column';
  /** The gap between the checkbox group items. */
  gap?: keyof typeof space;
}

export default CheckboxGroupProps;
