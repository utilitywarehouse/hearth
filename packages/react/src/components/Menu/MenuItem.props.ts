import type { ComponentPropsWithRef } from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react';

export interface MenuItemProps extends Omit<
  ComponentPropsWithRef<typeof MenuPrimitive.Item>,
  'className'
> {
  className?: string;
  colorScheme?: 'functional' | 'destructive';
}
