import type { ComponentPropsWithRef } from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';

export interface ComboboxEmptyProps extends Omit<
  ComponentPropsWithRef<typeof ComboboxPrimitive.Empty>,
  'className'
> {
  className?: string;
}
