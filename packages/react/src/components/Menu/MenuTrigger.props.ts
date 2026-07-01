import type { ComponentPropsWithRef } from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react';

export type MenuTriggerProps = Omit<
  ComponentPropsWithRef<typeof MenuPrimitive.Trigger>,
  'render' | 'className'
> & {
  className?: string;
};
