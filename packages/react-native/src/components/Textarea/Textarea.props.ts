import type { TextInputProps, ViewProps } from 'react-native';

export interface TextareaBaseProps {
  /**
   * Sets the initial height of the textarea in pixels.
   *
   * @type number
   * @example
   * ```tsx
   * <Textarea defaultHeight={140} />
   * ```
   */
  defaultHeight?: number;
  /**
   * If true, the textarea can be resized vertically using a drag handle.
   *
   * @type boolean
   * @example
   * ```tsx
   * <Textarea resizable />
   * ```
   */
  resizable?: boolean;
  /**
   * If true, the textarea will be disabled.
   *
   * @type boolean
   * @example
   * ```tsx
   * <Textarea disabled={true} />
   * ```
   */
  disabled?: boolean;
  /**
   * The validation status of the Textarea component.
   *
   * @type 'initial' | 'valid' | 'invalid'
   * @example
   * ```tsx
   * <Textarea validationStatus="valid" />
   * ```
   */
  validationStatus?: 'initial' | 'valid' | 'invalid';
  readonly?: boolean;
  focused?: boolean;
  placeholder?: string;
  label?: string;
  labelVariant?: 'heading' | 'body';
  helperText?: string;
  helperIcon?: React.ComponentType;
  validText?: string;
  invalidText?: string;
  required?: boolean;
  isInBottomSheet?: boolean;
}

export interface TextareaWithChildrenProps extends TextareaBaseProps, ViewProps {}

export interface TextareaWithoutChildrenProps
  extends TextareaBaseProps, Omit<TextInputProps, 'children'> {
  children?: never;
}

type TextareaProps = TextareaWithChildrenProps | TextareaWithoutChildrenProps;

export type TextareaContextValue = {
  disabled?: TextareaProps['disabled'];
  focused?: TextareaProps['focused'];
  readonly?: TextareaProps['readonly'];
  validationStatus?: TextareaProps['validationStatus'];
};

export default TextareaProps;
