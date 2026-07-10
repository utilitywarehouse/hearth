import { ComponentType } from 'react';
import { ViewProps } from 'react-native';
import { space } from '../../tokens';

interface CheckboxGroupProps extends ViewProps {
  disabled?: boolean;
  value?: Array<string>;
  onValueChange?: (value: Array<string>) => void;
  /**
   * @deprecated Use `onValueChange` instead.
   */
  onChange?: (value: Array<string>) => void;
  readonly?: boolean;
  validationStatus?: 'valid' | 'invalid' | 'initial';
  label?: string;
  labelVariant?: 'heading' | 'body';
  helperText?: string;
  showValidationIcon?: boolean;
  invalidText?: string;
  validText?: string;
  helperIcon?: ComponentType;
  type?: 'default' | 'tile';
  direction?: 'row' | 'column';
  gap?: keyof typeof space;
}

export default CheckboxGroupProps;
