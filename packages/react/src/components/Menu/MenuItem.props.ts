import { DropdownMenu as RadixMenu } from 'radix-ui';

export interface MenuItemProps extends Omit<RadixMenu.DropdownMenuItemProps, 'asChild'> {
  colorScheme?: 'functional' | 'destructive';
}
