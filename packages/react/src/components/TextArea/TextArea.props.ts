import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface TextAreaProps
  extends ComponentPropsWithout<'textarea', RemovedProps | 'value'>,
    MarginProps {
  /**
   * The controlled value of the TextArea. Must be used with an `onChange` handler.
   */
  value?: string;

  /**
   * The label for the TextArea, describing its purpose.
   */
  label: string;

  /**
   * Optional helper text to provide additional context or instructions.
   */
  helperText?: string;

  /**
   * Indicates the validation state of the TextArea.
   * @default undefined
   */
  validationStatus?: 'valid' | 'invalid';

  /**
   * Text to display when the `validationStatus` is set.
   */
  validationText?: string;

  /**
   * Controls the resize behavior of the TextArea.
   * @default "both"
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}
