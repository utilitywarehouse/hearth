import type { ComponentPropsWithRef, CSSProperties, ReactElement } from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react';

export interface MenuTriggerProps extends Omit<
  ComponentPropsWithRef<typeof MenuPrimitive.Trigger>,
  'render' | 'nativeButton' | 'className' | 'children' | 'payload' | 'style' | 'prefix'
> {
  /* CSS class applied to the element */
  className?: string;
  /* The style applied to the element */
  style?: CSSProperties;
  /**
   * The content of the MenuTrigger. Should contain a single `Button` or `IconButton` that will be used as the trigger for the Menu.
   */
  children: ReactElement;
}
