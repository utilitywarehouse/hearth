import type { TextInputProps, ViewProps } from 'react-native';

export interface TextareaBaseProps {
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
}

export interface TextareaWithChildrenProps extends TextareaBaseProps, ViewProps {}

export interface TextareaWithoutChildrenProps
  extends TextareaBaseProps,
    Omit<TextInputProps, 'children'> {
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
