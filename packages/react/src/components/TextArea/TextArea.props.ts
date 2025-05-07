import { NotInputTextualAttributes } from '../../helpers/input-attributes';
import { ComponentPropsWithout } from '../../types/component-props';
import { Responsive } from '../../types/responsive';

export interface TextAreaProps
  extends ComponentPropsWithout<
    'textarea',
    NotInputTextualAttributes | 'color' | 'defaultValue' | 'size' | 'value'
  > {
  /**
   * The initial value of the textarea when rendered.
   */
  defaultValue?: string;

  /**
   * The controlled value of the textarea. Must be used with an `onChange` handler.
   */
  value?: string;

  /**
   * The label for the textarea, describing its purpose.
   */
  label: string;

  /**
   * Optional helper text to provide additional context or instructions.
   */
  helperText?: string;

  /**
   * Indicates the validation state of the textarea.
   * @default undefined
   */
  validationStatus?: 'valid' | 'invalid';

  /**
   * Text to display when the `validationStatus` is set.
   */
  validationText?: string;

  /**
   * Controls the resize behavior of the textarea.
   * @default "both"
   */
  resize?: Responsive<'none' | 'vertical' | 'horizontal' | 'both'>;

  /**
   * The number of visible text lines for the textarea.
   * @default 3
   */
  rows?: number;

  /**
   * The maximum number of characters allowed in the textarea.
   */
  maxLength?: number;

  /**
   * The minimum number of characters required in the textarea.
   */
  minLength?: number;

  /**
   * If true, the textarea will be disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * If true, the textarea will be read-only.
   * @default false
   */
  readOnly?: boolean;

  /**
   * Placeholder text to display when the textarea is empty.
   */
  placeholder?: string;

  /**
   * If true, the textarea will be required for form submission.
   * @default false
   */
  required?: boolean;
}
