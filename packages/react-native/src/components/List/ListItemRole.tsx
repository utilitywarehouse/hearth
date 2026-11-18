import type { ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { useListContext } from './List.context';

/**
 * On web, a `role="list"` may only own `listitem` children (axe `aria-required-children`). List
 * items are usually pressables with their own `button`/`link` role, so they are wrapped in a
 * `listitem` instead. Native renders the item as-is so VoiceOver/TalkBack output is unchanged.
 */
const ListItemRole = ({ children }: { children: ReactNode }) => {
  const { isList } = useListContext();

  if (Platform.OS !== 'web' || !isList) {
    return <>{children}</>;
  }

  return <View role="listitem">{children}</View>;
};

ListItemRole.displayName = 'ListItemRole';

export default ListItemRole;
