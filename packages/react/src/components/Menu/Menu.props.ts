import type { ComponentPropsWithRef } from 'react';
import { DropdownMenu as MenuPrimitive } from 'radix-ui';

export type MenuProps = Omit<ComponentPropsWithRef<typeof MenuPrimitive.Root>, 'dir'>;
