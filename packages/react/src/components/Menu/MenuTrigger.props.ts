import { DropdownMenu as MenuPrimitive } from 'radix-ui';

export type MenuTriggerProps = Omit<
  React.ComponentPropsWithRef<typeof MenuPrimitive.DropdownMenuTrigger>,
  'asChild'
>;
