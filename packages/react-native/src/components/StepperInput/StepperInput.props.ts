import type { ComponentType, Ref } from 'react';
import type { TextInput, TextInputProps, ViewProps } from 'react-native';

export interface StepperBaseProps {
  ref?: Ref<TextInput>;
  disabled?: boolean;
  validationStatus?: 'initial' | 'valid' | 'invalid';
  readonly?: boolean;
  focused?: boolean;
  placeholder?: string;
  inBottomSheet?: boolean;
  required?: boolean;
  label?: string;
  labelVariant?: 'heading' | 'body';
  helperText?: string;
  helperIcon?: ComponentType;
  validText?: string;
  invalidText?: string;
  value?: number | string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChangeValue?: (value: number) => void;
  focusInputOnStepPress?: boolean;
  decrementAccessibilityLabel?: string;
  incrementAccessibilityLabel?: string;
}

export type StepperInputProps = StepperBaseProps &
  Omit<
    TextInputProps,
    'children' | 'value' | 'defaultValue' | 'onChangeText' | 'editable' | 'keyboardType'
  > &
  ViewProps & {
    onChangeText?: (text: string) => void;
  };

export default StepperInputProps;
