import { NotInputTextualAttributes } from '../../helpers/input-attributes';
import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout } from '../../types/component-props';

export interface TextInputProps
  extends ComponentPropsWithout<
      'input',
      NotInputTextualAttributes | 'color' | 'defaultValue' | 'size' | 'type' | 'value'
    >,
    MarginProps {
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
  /**
   * The initial value of the TextInput when rendered.
   */
  defaultValue?: string | number;
  /**
   * The controlled value of the TextInput. Must be used with an `onChange` handler.
   */
  value?: string | number;
  /**
   * The label for the TextInput, describing its purpose.
   */
  label: string;
  /**
   * Optional helper text to provide additional context or instructions.
   */
  helperText?: string;
  /**
   * Indicates the validation state of the TextInput.
   * @default undefined
   */
  validationStatus?: 'valid' | 'invalid';
  /**
   * Text to display when the `validationStatus` is set.
   */
  validationText?: string;
  hideLabel?: boolean;
}
