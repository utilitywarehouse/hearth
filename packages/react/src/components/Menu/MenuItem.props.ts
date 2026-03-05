import type { ComponentPropsWithRef } from 'react';
import { DropdownMenu as MenuPrimitive } from 'radix-ui';

export interface MenuItemProps extends ComponentPropsWithRef<typeof MenuPrimitive.Item> {
  colorScheme?: 'functional' | 'destructive';
}
