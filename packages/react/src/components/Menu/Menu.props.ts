import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react';

export interface MenuProps extends Pick<
  ComponentPropsWithRef<typeof MenuPrimitive.Root>,
  | 'open'
  | 'defaultOpen'
  | 'onOpenChange'
  | 'actionsRef'
  | 'triggerId'
  | 'defaultTriggerId'
  | 'handle'
  | 'modal'
  | 'disabled'
> {
  /**
   * The content of the Menu. Should contain `MenuTrigger` and `MenuContent`.
   */
  children: ReactNode;
}
