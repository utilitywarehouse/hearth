import { ComponentType } from 'react';
import { ViewProps } from 'react-native';
import { space } from '../../tokens';

interface RadioGroupProps extends ViewProps {
  disabled?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  /**
   * @deprecated Use `onValueChange` instead.
   */
  onChange?: (value: string) => void;
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

export default RadioGroupProps;
