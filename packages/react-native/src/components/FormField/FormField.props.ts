import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

export interface FormFieldBaseProps {
  validationStatus?: 'valid' | 'invalid' | 'initial';
  disabled?: boolean;
  readonly?: boolean;
  label?: string;
  labelVariant?: 'heading' | 'body';
  helperText?: string;
  helperIcon?: ComponentType;
  validText?: string;
  invalidText?: string;
  required?: boolean;
}

interface FormFieldProps extends FormFieldBaseProps, ViewProps {}

export default FormFieldProps;
