import { DropdownMenu as MenuPrimitive } from 'radix-ui';

export type MenuProps = Omit<
  React.ComponentPropsWithRef<typeof MenuPrimitive.DropdownMenu>,
  'dir' | 'modal'
>;
