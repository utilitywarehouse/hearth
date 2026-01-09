import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';

type ElementProps = Omit<React.ComponentPropsWithRef<'textarea'>, 'value'>;

export interface TextAreaProps
  extends ElementProps,
    Omit<FormFieldProps, 'hideLabel' | keyof ElementProps>,
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
  minHeight?: string;
}
