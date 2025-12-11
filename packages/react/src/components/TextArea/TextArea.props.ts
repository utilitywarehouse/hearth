import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { FormFieldProps } from '../FormField/FormField.props';

export interface TextAreaProps
  extends ComponentPropsWithout<'textarea', RemovedProps | 'value' | keyof FormFieldProps>,
    Omit<FormFieldProps, 'hideLabel'>,
    MarginProps {
  /**
   * The controlled value of the TextArea. Must be used with an `onChange` handler.
   */
  value?: string;
  /**
   * Controls the resize behavior of the TextArea.
   * @default "both"
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}
