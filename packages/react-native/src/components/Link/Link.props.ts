import { ComponentType } from 'react';
import { PressableProps, TextProps } from 'react-native';
import { IconProps } from '../Icon';

export interface LinkProps extends Omit<PressableProps, 'children'> {
  /** The text or content rendered inside the link. */
  children: TextProps['children'];
  /** The URL to navigate to. */
  href?: string;
  /** The target of the link.
   * @default '_self' */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** Defaults to `noopener noreferrer` when `target` is `_blank`. */
  rel?: string;
  /** Invert the link colours for purple backgrounds. */
  inverted?: boolean;
  /** Disable the link.
   * @default false */
  disabled?: boolean;
  /** Icon displayed next to the link text.
   * @default ChevronRightSmallIcon */
  icon?: ComponentType;
  /** Position of the icon relative to the link text.
   * @default 'right' */
  iconPosition?: 'left' | 'right';
  /** Shows the icon next to the link text.
   * @default true */
  showIcon?: boolean;
  /** Additional style applied to the link text. */
  textStyle?: TextProps['style'];
  /** Additional style applied to the icon. */
  iconStyle?: IconProps['style'];
}

export default LinkProps;
