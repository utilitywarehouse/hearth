import { createPressable } from '@gluestack-ui/core/pressable/creator';
import ListItemRoot from './ListItemRoot';

const ListItem = createPressable({
  Root: ListItemRoot,
});

ListItem.displayName = 'ListItem';

export default ListItem;
