import type { ComponentPropsWithRef, MouseEventHandler } from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react';

export type MenuItemProps = Omit<
  ComponentPropsWithRef<typeof MenuPrimitive.Item>,
  'className' | 'render'
> & {
  className?: string;
  colorScheme?: 'functional' | 'destructive';
  /**
   * Change the default rendered element for the one passed as a child, merging
   * their props and behaviour. Useful for rendering MenuItem as a link.
   */
  asChild?: boolean;
  /** @deprecated Use `onClick` instead. */
  onSelect?: MouseEventHandler<HTMLElement>;
};
