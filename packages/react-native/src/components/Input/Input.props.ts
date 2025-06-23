import type { ComponentType } from 'react';
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
  readonly?: boolean;
  focused?: boolean;
  placeholder?: string;
}

// For inputs that have children
export interface InputWithChildrenProps extends InputBaseProps, ViewProps {
  children: ViewProps['children'];
  type?: undefined;
  showPasswordToggle?: never;
  format?: never;
  loading?: never;
  clearable?: never;
  onClear?: never;
  leadingIcon?: never;
  trailingIcon?: never;
  required?: never;
}

// Base for inputs without children
interface InputWithoutChildrenBaseProps extends InputBaseProps, Omit<TextInputProps, 'children'> {
  children?: never;
  leadingIcon?: ComponentType;
  trailingIcon?: ComponentType;
  required?: boolean;
}

// Specific input types with their unique props
interface TextInputSpecificProps extends InputWithoutChildrenBaseProps {
  type?: 'text';
  showPasswordToggle?: never;
  format?: never;
  loading?: never;
  clearable?: never;
  onClear?: never;
}

interface PasswordInputSpecificProps extends InputWithoutChildrenBaseProps {
  type: 'password';
  showPasswordToggle?: boolean;
  format?: never;
  loading?: never;
  clearable?: never;
  onClear?: never;
}

interface DateInputSpecificProps extends InputWithoutChildrenBaseProps {
  type: 'date';
  format?: string;
  showPasswordToggle?: never;
  loading?: never;
  clearable?: never;
  onClear?: never;
}

interface CurrencyInputSpecificProps extends InputWithoutChildrenBaseProps {
  type: 'currency';
  format?: string;
  showPasswordToggle?: never;
  loading?: never;
  clearable?: never;
  onClear?: never;
}

interface SearchInputSpecificProps extends InputWithoutChildrenBaseProps {
  type: 'search';
  loading?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  showPasswordToggle?: never;
  format?: never;
}

// Union of all input types
export type InputWithoutChildrenProps =
  | TextInputSpecificProps
  | PasswordInputSpecificProps
  | DateInputSpecificProps
  | CurrencyInputSpecificProps
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
