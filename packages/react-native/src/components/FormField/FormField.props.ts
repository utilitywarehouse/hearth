import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

export interface FormFieldBaseProps {
  validationStatus?: 'valid' | 'invalid' | 'initial';
  disabled?: boolean;
  readonly?: boolean;
  label?: string;
  helperText?: string;
  helperIcon?: ComponentType;
  validText?: string;
  invalidText?: string;
}

interface FormFieldProps extends FormFieldBaseProps, ViewProps {}

export default FormFieldProps;
