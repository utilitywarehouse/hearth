import type { ComponentType } from 'react';
import React from 'react';
import type { TextInputProps, ViewProps } from 'react-native';

// Base props common to all input types
export interface InputBaseProps {
  /**
   * If true, the input will be disabled.
   *
   * @type boolean
   * @example
   * ```tsx
   * <Input disabled={true} />
   * ```
   */
  disabled?: boolean;
  /**
   * The validation status of the Input component.
   *
   * @type 'initial' | 'valid' | 'invalid'
   * @example
   * ```tsx
   * <Input validationStatus="valid" />
   * ```
   */
  validationStatus?: 'initial' | 'valid' | 'invalid';
  /** Makes the input read-only. */
  readonly?: boolean;
  /** Sets focus on the input. */
  focused?: boolean;
  /** The placeholder text for the input. */
  placeholder?: string;
  /** Indicates the input is rendered inside a bottom sheet.
   * @default false */
  inBottomSheet?: boolean;
  /** The label for the input; only used when the input has no children. */
  label?: string;
  /** The text variant used for the label; only used when the input has no children. */
  labelVariant?: 'heading' | 'body';
  /** Helper text displayed below the input; only used when the input has no children. */
  helperText?: string;
  /** Icon displayed alongside the helper text; only used when the input has no children. */
  helperIcon?: ComponentType;
  /** Text shown when the validation status is `valid`. */
  validText?: string;
  /** Text shown when the validation status is `invalid`. */
  invalidText?: string;
  /** Indicates the input is required.
   * @default true */
  required?: boolean;
}

// For inputs that have children
export interface InputWithChildrenProps extends InputBaseProps, ViewProps {
  /** Custom content rendered inside the input, in place of the built-in field and icon slots. */
  children: ViewProps['children'];
  /** Not applicable when the input has children. */
  type?: undefined;
  /** Not applicable when the input has children. */
  showPasswordToggle?: never;
  /** Reserved for future use; not currently used by any input type. */
  format?: never;
  /** Not applicable when the input has children. */
  loading?: never;
  /** Not applicable when the input has children. */
  clearable?: never;
  /** Not applicable when the input has children. */
  onClear?: never;
  /** Not applicable when the input has children. */
  leadingIcon?: never;
  /** Not applicable when the input has children. */
  trailingIcon?: never;
  /** Not applicable when the input has children. */
  prefix?: never;
  /** Not applicable when the input has children. */
  suffix?: never;
}

// Base for inputs without children
interface InputWithoutChildrenBaseProps extends InputBaseProps, Omit<TextInputProps, 'children'> {
  children?: never;
  /** Icon displayed at the start of the input. */
  leadingIcon?: ComponentType;
  /** Icon displayed at the end of the input. */
  trailingIcon?: ComponentType;
  /** Indicates the input is required.
   * @default true */
  required?: boolean;
  /** Content displayed before the input field. */
  prefix?: string | number | React.ReactNode;
  /** Content displayed after the input field. */
  suffix?: string | number | React.ReactNode;
}

// Specific input types with their unique props
interface TextInputSpecificProps extends InputWithoutChildrenBaseProps {
  /** The input type; renders as plain text. */
  type?: 'text';
  /** Not applicable to the text input type. */
  showPasswordToggle?: never;
  /** Reserved for future use; not currently used by any input type. */
  format?: never;
  /** Not applicable to the text input type. */
  loading?: never;
  /** Not applicable to the text input type. */
  clearable?: never;
  /** Not applicable to the text input type. */
  onClear?: never;
}

interface PasswordInputSpecificProps extends InputWithoutChildrenBaseProps {
  /** The input type; renders as a password field with masked text. */
  type: 'password';
  /** Shows a toggle to reveal or hide the password text.
   * @default true */
  showPasswordToggle?: boolean;
  /** Reserved for future use; not currently used by any input type. */
  format?: never;
  /** Not applicable to the password input type. */
  loading?: never;
  /** Not applicable to the password input type. */
  clearable?: never;
  /** Not applicable to the password input type. */
  onClear?: never;
  /** Not applicable to the password input type. */
  prefix?: never;
  /** Not applicable to the password input type. */
  suffix?: never;
}

interface SearchInputSpecificProps extends InputWithoutChildrenBaseProps {
  /** The input type; renders as a search field with a search icon. */
  type: 'search';
  /** Shows a loading spinner in the search input. */
  loading?: boolean;
  /** Shows a clear button that empties the search input.
   * @default false */
  clearable?: boolean;
  /** Called when the clear button is pressed. */
  onClear?: () => void;
  /** Not applicable to the search input type. */
  showPasswordToggle?: never;
  /** Reserved for future use; not currently used by any input type. */
  format?: never;
  /** Not applicable to the search input type. */
  prefix?: never;
  /** Not applicable to the search input type. */
  suffix?: never;
}

// Union of all input types
export type InputWithoutChildrenProps =
  | TextInputSpecificProps
  | PasswordInputSpecificProps
  | SearchInputSpecificProps;

/**
 * Props for the Input component.
 * This is a discriminated union type where the 'type' property
 * determines which specific props are available.
 */
type InputProps = InputWithChildrenProps | InputWithoutChildrenProps;

export type InputContextValue = {
  disabled?: InputProps['disabled'];
  focused?: InputProps['focused'];
  readonly?: InputProps['readonly'];
  validationStatus?: InputProps['validationStatus'];
  type?: InputProps['type'];
};

export default InputProps;
