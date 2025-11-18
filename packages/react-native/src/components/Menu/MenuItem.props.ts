import type { ComponentType } from 'react';
import type { PressableProps } from 'react-native';

export interface MenuItemProps extends Omit<PressableProps, 'children'> {
  /**
   * Icon component to display
   */
  icon?: ComponentType;
  /**
   * Position of the icon
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
  /**
   * Text to display in the menu item
   */
  text: string;
  /**
   * Color scheme for the menu item
   * @default 'functional'
   */
  colorScheme?: 'functional' | 'destructive';
  /**
   * Whether the menu item is disabled
   */
  disabled?: boolean;
}

export default MenuItemProps;
