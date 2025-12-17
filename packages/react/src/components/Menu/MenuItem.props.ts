import { DropdownMenu as MenuPrimitive } from 'radix-ui';

export interface MenuItemProps extends React.ComponentPropsWithRef<typeof MenuPrimitive.Item> {
  colorScheme?: 'functional' | 'destructive';
}
