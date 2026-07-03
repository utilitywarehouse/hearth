import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react';

export interface MenuContentProps {
  /* CSS class applied to the element */
  className?: string;
  /* The style applied to the element */
  style?: CSSProperties;
  /**
   * The content of the MenuContent. Should contain `MenuItem` components.
   */
  children: ReactNode;
  /**
   * The placement of the menu relative to the trigger element. Defaults to 'bottomLeft'.
   * @default 'bottomLeft'
   */
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  /**
   * Whether the menu should be kept mounted in the DOM when closed. Defaults to false.
   * @default false
   */
  keepMounted?: ComponentPropsWithoutRef<typeof MenuPrimitive.Portal>['keepMounted'];
  /** @deprecated Use `keepMounted` instead. Will be removed in next major. */
  forceMount?: true;
}
