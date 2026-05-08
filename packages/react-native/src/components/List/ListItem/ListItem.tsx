import { createPressable } from '@gluestack-ui/pressable';
import type React from 'react';
import ListItemRoot from './ListItemRoot';

const ListItem: React.ComponentType<React.ComponentProps<typeof ListItemRoot>> = createPressable({
  Root: ListItemRoot,
}) as unknown as React.ComponentType<React.ComponentProps<typeof ListItemRoot>>;

ListItem.displayName = 'ListItem';

export default ListItem;
