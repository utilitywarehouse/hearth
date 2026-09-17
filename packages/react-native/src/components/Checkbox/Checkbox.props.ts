import type { ComponentType, ReactNode } from 'react';
import type { PressableProps, ViewProps } from 'react-native';

type CheckboxBaseProps = {
  /** Called with the new checked state when the checkbox is toggled. */
  onChange?: (isSelected: boolean) => void;
  disabled?: boolean;
  /** The validation status of the checkbox. */
  validationStatus?: 'valid' | 'invalid' | 'initial';
  /** The visual style of the checkbox.
   * @default 'default'
   */
  type?: 'default' | 'tile';
} & (
  | {
      /** The value returned on form submission when the checkbox is checked. */
      value?: string | number | boolean;
      /** Whether the checkbox is checked. */
      checked: boolean;
    }
  | {
      /** The value returned on form submission when the checkbox is checked. */
      value: string | number | boolean;
      /** Whether the checkbox is checked. */
      checked?: boolean;
    }
) &
  Omit<PressableProps, 'children'>;

type CheckboxWithChildrenProps = {
  /** Custom content to render in place of the default label, helper text, and validation content. */
  children: ViewProps['children'];
  label?: never;
  helperText?: never;
  helperIcon?: never;
  badge?: never;
  invalidText?: never;
  validText?: never;
  showValidationIcon?: never;
  image?: never;
} & CheckboxBaseProps;

type CheckboxWithoutChildrenProps = {
  children?: never;
  /** The label to display next to the checkbox. */
  label?: string;
  /** The helper text to display below the checkbox. */
  helperText?: string;
  /** The icon to display next to the helper text. */
  helperIcon?: ComponentType;
  /** The badge to display below the helper text. */
  badge?: ReactNode;
  /** The text to display below the checkbox when `validationStatus` is `'invalid'`. */
  invalidText?: string;
  /** The text to display below the checkbox when `validationStatus` is `'valid'`. */
  validText?: string;
  /** Whether to show the validation icon.
   * @default true
   */
  showValidationIcon?: boolean;
  /** The image to display next to the label. */
  image?: ReactNode;
} & CheckboxBaseProps;

type CheckboxProps = CheckboxWithChildrenProps | CheckboxWithoutChildrenProps;

export default CheckboxProps;
