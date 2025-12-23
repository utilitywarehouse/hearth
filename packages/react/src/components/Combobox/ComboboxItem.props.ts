import { Combobox as ComboboxPrimitive } from '@base-ui-components/react/combobox';

export interface ComboboxItemProps
  extends Omit<React.ComponentPropsWithRef<typeof ComboboxPrimitive.Item>, 'className'> {
  className?: string;
}
