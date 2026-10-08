import { View, type ViewProps, type ViewStyle } from 'react-native';
import { useListItemContext } from './ListItem.context';

export interface ListItemLeadingContentProps extends ViewProps {
  /** Vertical alignment within the list item. Overrides `leadingContentAlignment` on `ListItem`.
   * @default 'flex-start' */
  alignment?: ViewStyle['alignSelf'];
}

const ListItemLeadingContent = ({ children, alignment, ...props }: ListItemLeadingContentProps) => {
  const { leadingContentAlignment } = useListItemContext();

  return (
    <View
      {...props}
      style={[{ alignSelf: alignment ?? leadingContentAlignment ?? 'flex-start' }, props.style]}
    >
      {children}
    </View>
  );
};

ListItemLeadingContent.displayName = 'ListItemLeadingContent';

export default ListItemLeadingContent;
