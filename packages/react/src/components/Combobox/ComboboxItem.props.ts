import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox';

export interface ComboboxItemProps extends Omit<
  React.ComponentPropsWithRef<typeof ComboboxPrimitive.Item>,
  'className'
> {
  className?: string;
}
