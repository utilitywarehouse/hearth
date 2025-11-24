import { MarginProps } from '../../props/margin.props';
import { InputBaseProps } from '../InputBase/InputBase.props';

export interface TextInputProps extends InputBaseProps, MarginProps {
  /**
   * The label for the TextInput, describing its purpose.
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
   * Visually hide the label.
   */
  hideLabel?: boolean;
}
