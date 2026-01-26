import type { ComponentType } from 'react';
import { ViewProps } from 'react-native';

export interface VerificationInputProps extends ViewProps {
  /**
   * The value of the input.
   */
  value?: string;
  /**
   * Callback when the value changes.
   */
  onChangeText?: (text: string) => void;
  /**
   * The label for the input.
   */
  label?: string;
  /**
   * The label variant for the input.
   */
  labelVariant?: 'heading' | 'body';
  /**
   * Helper text to display below the input.
   */
  helperText?: string;
  /**
   * Icon to display alongside the helper text.
   */
  helperIcon?: ComponentType;
  /**
   * The validation status of the input.
   */
  validationStatus?: 'initial' | 'valid' | 'invalid';
  /**
   * Text to display when validation status is 'valid'.
   */
  validText?: string;
  /**
   * Text to display when validation status is 'invalid'.
   */
  invalidText?: string;
  /**
   * Whether the input is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the input is read-only.
   */
  readonly?: boolean;
  /**
   * Whether to obscure the text entry (e.g. for passwords/OTPs).
   */
  secureTextEntry?: boolean;
}

export default VerificationInputProps;
