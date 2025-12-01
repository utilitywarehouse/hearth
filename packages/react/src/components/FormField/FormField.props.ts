import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface FormFieldProps extends ComponentPropsWithout<'div', RemovedProps> {
  id?: string;
  labelId?: string;
  helperTextId?: string;
  validationTextId?: string;
  showValidationText?: boolean;
  required?: boolean;
  /**
   * The label for the form field, describing its purpose.
   */
  label: string;
  /**
   * Optional helper text to provide additional context or instructions.
   */
  helperText?: string;
  /**
   * Text to display when the `validationStatus` is set.
   */
  validationText?: string;
  /**
   * Indicates the validation status.
   */
  validationStatus?: 'valid' | 'invalid';
  /**
   * Visually hide the label.
   */
  hideLabel?: boolean;
}
