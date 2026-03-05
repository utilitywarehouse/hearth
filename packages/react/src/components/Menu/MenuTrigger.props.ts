import type { ComponentPropsWithRef } from 'react';
import { DropdownMenu as MenuPrimitive } from 'radix-ui';

export type MenuTriggerProps = Omit<
  ComponentPropsWithRef<typeof MenuPrimitive.DropdownMenuTrigger>,
  'asChild'
>;
