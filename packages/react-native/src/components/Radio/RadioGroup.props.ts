import { ComponentType } from 'react';
import { ViewProps } from 'react-native';
import { space } from '../../tokens';

interface RadioGroupProps extends ViewProps {
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  validationStatus?: 'valid' | 'invalid' | 'initial';
  label?: string;
  helperText?: string;
  showValidationIcon?: boolean;
  invalidText?: string;
  validText?: string;
  helperIcon?: ComponentType;
  type?: 'radio' | 'card';
  direction?: 'row' | 'column';
  gap?: keyof typeof space;
}

export default RadioGroupProps;
