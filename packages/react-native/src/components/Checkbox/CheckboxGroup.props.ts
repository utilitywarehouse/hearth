import { ComponentType } from 'react';
import { space } from '../../tokens';
import { ViewProps } from 'react-native';

interface CheckboxGroupProps extends ViewProps {
  disabled?: boolean;
  value?: Array<string>;
  onChange?: (value: Array<string>) => void;
  readonly?: boolean;
  validationStatus?: 'valid' | 'invalid' | 'initial';
  label?: string;
  helperText?: string;
  showValidationIcon?: boolean;
  invalidText?: string;
  validText?: string;
  helperIcon?: ComponentType;
  type?: 'default' | 'card';
  direction?: 'row' | 'column';
  gap?: keyof typeof space;
}

export default CheckboxGroupProps;
