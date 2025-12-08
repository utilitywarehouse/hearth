import { DropdownMenu as RadixMenu } from 'radix-ui';

export interface MenuItemProps extends React.ComponentProps<typeof RadixMenu.Item> {
  colorScheme?: 'functional' | 'destructive';
}
