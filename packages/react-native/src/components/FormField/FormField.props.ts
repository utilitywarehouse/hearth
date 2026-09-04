import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

export interface FormFieldBaseProps {
  /**
   * The validation status of the field.
   * @default 'initial'
   */
  validationStatus?: 'valid' | 'invalid' | 'initial';
  /** Whether the field is disabled. */
  disabled?: boolean;
  /** Whether the field is readonly. */
  readonly?: boolean;
  /** The label for the field. */
  label?: string;
  /**
   * The variant of the label text.
   * @default 'body'
   */
  labelVariant?: 'heading' | 'body';
  /** The helper text for the field. */
  helperText?: string;
  /** The icon for the helper text. */
  helperIcon?: ComponentType;
  /** The valid text for the field. */
  validText?: string;
  /** The invalid text for the field. */
  invalidText?: string;
  /**
   * Whether the field is required.
   * @default true
   */
  required?: boolean;
  /**
   * Whether accessibility is handled by child components, hiding accessibility for the
   * FormField itself.
   * @default false
   */
  accessibilityHandledByChildren?: boolean;
}

interface FormFieldProps extends FormFieldBaseProps, ViewProps {}

export default FormFieldProps;
