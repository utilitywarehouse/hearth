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
  /**
   * Sets the minimum height of the TextArea.
   * Accepts any valid CSS height value, such as "200px", "10rem", or "50%".
   */
  minHeight?: string;
}
