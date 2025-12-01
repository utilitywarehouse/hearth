import type { ComponentType, ReactNode } from 'react';
import type { PressableProps, ViewProps } from 'react-native';

type CheckboxBaseProps = {
  onChange?: (isSelected: boolean) => void;
  disabled?: boolean;
  validationStatus?: 'valid' | 'invalid' | 'initial';
  type?: 'default' | 'tile';
} & (
  | {
      value?: string | number | boolean;
      checked: boolean;
    }
  | {
      value: string | number | boolean;
      checked?: boolean;
    }
) &
  Omit<PressableProps, 'children'>;

type CheckboxWithChildrenProps = {
  children: ViewProps['children'];
  label?: never;
  helperText?: never;
  helperIcon?: never;
  invalidText?: never;
  validText?: never;
  showValidationIcon?: never;
  image?: never;
} & CheckboxBaseProps;

type CheckboxWithoutChildrenProps = {
  children?: never;
  label?: string;
  helperText?: string;
  helperIcon?: ComponentType;
  invalidText?: string;
  validText?: string;
  showValidationIcon?: boolean;
  image?: ReactNode;
} & CheckboxBaseProps;

type CheckboxProps = CheckboxWithChildrenProps | CheckboxWithoutChildrenProps;

export default CheckboxProps;
