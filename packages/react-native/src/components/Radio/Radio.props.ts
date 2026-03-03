import type { ComponentType, ReactNode } from 'react';
import type { PressableProps, ViewProps } from 'react-native';

interface RadioBaseProps extends Omit<PressableProps, 'children'> {
  value: string;
  onChange?: (isSelected: boolean) => void;
  disabled?: boolean;
  validationStatus?: 'valid' | 'invalid' | 'initial';
  type?: 'default' | 'tile';
}

interface RadioWithChildrenProps extends RadioBaseProps {
  children: ViewProps['children'];
  label?: never;
  helperText?: never;
  helperIcon?: never;
  badge?: never;
  invalidText?: never;
  validText?: never;
  showValidationIcon?: never;
  image?: never;
}

interface RadioWithoutChildrenProps extends RadioBaseProps {
  children?: never;
  label?: string;
  helperText?: string;
  helperIcon?: ComponentType;
  badge?: ReactNode;
  invalidText?: string;
  validText?: string;
  showValidationIcon?: boolean;
  image?: ReactNode;
}

type RadioProps = RadioWithChildrenProps | RadioWithoutChildrenProps;

export default RadioProps;
