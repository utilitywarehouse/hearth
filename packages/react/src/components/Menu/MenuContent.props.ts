import type { ComponentPropsWithRef } from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react';

export type MenuContentProps = Omit<
  ComponentPropsWithRef<typeof MenuPrimitive.Popup>,
  'render' | 'className'
> & {
  className?: string;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  keepMounted?: boolean;
  /** @deprecated Use `keepMounted` instead. Will be removed in next major. */
  forceMount?: true;
};
