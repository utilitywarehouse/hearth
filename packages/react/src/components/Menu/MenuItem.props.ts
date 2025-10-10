import { DropdownMenu as RadixMenu } from 'radix-ui';

export type MenuItemProps = Omit<RadixMenu.DropdownMenuItemProps, 'asChild'> & {};
