import type { ComponentPropsWithRef } from 'react';
import { InputBaseProps } from '../InputBase/InputBase.props';
import { LabelProps } from '../Label/Label.props';

export interface FormFieldProps extends Omit<ComponentPropsWithRef<'div'>, 'defaultValue'> {
  id?: string;
  /**
   * The `id` of the element rendering the field's label, for `aria-labelledby` association.
   */
  labelId?: string;
  /**
   * The `id` of the element rendering the field's helper text, for `aria-describedby` association.
   */
  helperTextId?: string;
  /**
   * The `id` of the element rendering the field's validation text, for `aria-describedby` association.
   */
  validationTextId?: string;
  /**
   * Marks the field as required.
   */
  required?: InputBaseProps['required'];
  /**
   * The label for the form field, describing its purpose.
   */
  label: string;
  /**
   * Visually hide the label.
   */
  hideLabel?: boolean;
  /**
   * Change the label variant
   */
  labelVariant?: LabelProps['variant'];
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
}
