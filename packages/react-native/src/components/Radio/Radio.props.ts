import type { ComponentType, ReactNode } from 'react';
import type { PressableProps, ViewProps } from 'react-native';

interface RadioBaseProps extends Omit<PressableProps, 'children'> {
  /** The value to be used in the radio input, returned on form submission. */
  value: string;
  /** Called when the state of the radio changes. */
  onChange?: (isSelected: boolean) => void;
  /** Whether the radio is disabled. */
  disabled?: boolean;
  /** The validation status of the radio. */
  validationStatus?: 'valid' | 'invalid' | 'initial';
  /**
   * The type of the radio.
   * @default 'default'
   */
  type?: 'default' | 'tile';
}

interface RadioWithChildrenProps extends RadioBaseProps {
  /** Custom content rendered in place of the default label, helper text and validation content. */
  children: ViewProps['children'];
  label?: never;
  helperText?: never;
  helperIcon?: never;
  badge?: never;
  invalidText?: never;
  validText?: never;
  showValidationIcon?: never;
  image?: never;
}

interface RadioWithoutChildrenProps extends RadioBaseProps {
  children?: never;
  /** The label to be displayed next to the radio. */
  label?: string;
  /** The helper text to be displayed below the radio. */
  helperText?: string;
  /** The icon to be displayed next to the helper text. */
  helperIcon?: ComponentType;
  /** The badge to be displayed below the helper text. */
  badge?: ReactNode;
  /** The invalid text to be displayed below the radio when `validationStatus` is `'invalid'`. */
  invalidText?: string;
  /** The valid text to be displayed below the radio when `validationStatus` is `'valid'`. */
  validText?: string;
  /** Whether to show the validation icon alongside the valid/invalid text. */
  showValidationIcon?: boolean;
  /** The image to be displayed next to the label. */
  image?: ReactNode;
}

type RadioProps = RadioWithChildrenProps | RadioWithoutChildrenProps;

export default RadioProps;
