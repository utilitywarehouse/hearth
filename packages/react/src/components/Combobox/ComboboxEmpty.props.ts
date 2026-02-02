import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';

export interface ComboboxEmptyProps extends Omit<
  React.ComponentPropsWithRef<typeof ComboboxPrimitive.Empty>,
  'className'
> {
  className?: string;
}
