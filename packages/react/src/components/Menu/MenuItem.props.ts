import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ReactNode } from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react';

export type MenuItemProps = Omit<
  ComponentPropsWithRef<typeof MenuPrimitive.Item>,
  'className' | 'render' | 'children' | 'nativeButton' | 'style'
> & {
  className?: string;
  colorScheme?: 'functional' | 'destructive';
  /**
   * Change the default rendered element for the one passed as a child, merging
   * their props and behaviour. Useful for rendering MenuItem as a link.
   */
  asChild?: boolean;
  children: ReactNode;
  /**
   * Deprecated click handler for the menu item.
   * @deprecated Use `onClick` instead.
   */
  onSelect?: ComponentPropsWithoutRef<typeof MenuPrimitive.Item>['onClick'];
  /**
   * Deprecated override of the text label to use when the item is matched during keyboard text navigation.
   * @deprecated Use `label` instead.
   */
  textValue?: string;
};
