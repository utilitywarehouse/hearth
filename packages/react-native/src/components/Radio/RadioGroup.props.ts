import { ComponentType } from 'react';
import { ViewProps } from 'react-native';

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
}

export default RadioGroupProps;
