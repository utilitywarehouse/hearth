import type { TextInputProps, ViewProps } from 'react-native';

export interface TextareaBaseProps {
  /**
   * Sets the initial height of a resizable textarea in pixels.
   * Has no effect unless `resizable` is enabled.
   *
   * @type number
   * @example
   * ```tsx
   * <Textarea resizable defaultHeight={140} />
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
  /** Makes the textarea read-only. */
  readonly?: boolean;
  /** Sets focus on the textarea. */
  focused?: boolean;
  /** Placeholder text shown when the textarea is empty. */
  placeholder?: string;
  /** Label for the textarea. Only used when the textarea has no children. */
  label?: string;
  /**
   * Visual variant of the label text. Only used when the textarea has no children.
   * @default 'body'
   */
  labelVariant?: 'heading' | 'body';
  /** Helper text shown below the textarea. Only used when the textarea has no children. */
  helperText?: string;
  /** Icon shown alongside the helper text. Only used when the textarea has no children. */
  helperIcon?: React.ComponentType;
  /** Text shown when `validationStatus` is `'valid'`. Only used when the textarea has no children. */
  validText?: string;
  /** Text shown when `validationStatus` is `'invalid'`. */
  invalidText?: string;
  /** Whether the textarea is required. Only used when the textarea has no children. */
  required?: boolean;
  /** Adjusts styling when the textarea is rendered inside a bottom sheet. */
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
