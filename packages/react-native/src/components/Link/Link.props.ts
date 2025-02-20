import { ComponentType } from 'react';
import { PressableProps, TextProps } from 'react-native';

export interface LinkProps extends Omit<PressableProps, 'children'> {
  children: TextProps['children'];
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  inverted?: boolean;
  disabled?: boolean;
  icon?: ComponentType;
  iconPosition?: 'left' | 'right';
}

export default LinkProps;
