import { DropdownMenu as RadixMenu } from 'radix-ui';

export type MenuProps = Omit<RadixMenu.DropdownMenuProps, 'dir' | 'modal'> & {};
