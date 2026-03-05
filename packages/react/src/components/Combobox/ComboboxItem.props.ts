import type { ComponentPropsWithRef } from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';

export interface ComboboxItemProps extends Omit<
  ComponentPropsWithRef<typeof ComboboxPrimitive.Item>,
  'className'
> {
  className?: string;
}
