import { createPressable } from '@gluestack-ui/pressable';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { View } from 'react-native';
import type ListItemProps from './ListItem.props';
import ListItemRoot from './ListItemRoot';

// `createPressable` types its props via `react-native/types`, which does not resolve with
// React Native's `exports` map and collapses the props to `any` (no intellisense, no checking).
// Declare the props explicitly so they come from `ListItemProps`.
const ListItem = createPressable({
  Root: ListItemRoot,
}) as ForwardRefExoticComponent<ListItemProps & { tabIndex?: 0 | -1 } & RefAttributes<View>>;

ListItem.displayName = 'ListItem';

export default ListItem;
