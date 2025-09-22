import { ComponentType } from 'react';
import { PressableProps, TextProps } from 'react-native';
import { IconProps } from '../Icon';

export interface LinkProps extends Omit<PressableProps, 'children'> {
  children: TextProps['children'];
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  inverted?: boolean;
  disabled?: boolean;
  icon?: ComponentType;
  iconPosition?: 'left' | 'right';
  showIcon?: boolean;
  textStyle?: TextProps['style'];
  iconStyle?: IconProps['style'];
}

export default LinkProps;
