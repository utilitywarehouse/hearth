import { View, type ViewProps, type ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useListItemContext } from './ListItem.context';

export interface ListItemContentProps extends ViewProps {
  /** Vertical alignment within the list item. Overrides `contentAlignment` on `ListItem`.
   * @default 'center' */
  alignment?: ViewStyle['alignSelf'];
}

const ListItemContent = ({ children, alignment, ...props }: ListItemContentProps) => {
  const { contentAlignment } = useListItemContext();

  return (
    <View
      {...props}
      style={[
        styles.container,
        { alignSelf: alignment ?? contentAlignment ?? 'center' },
        props.style,
      ]}
    >
      {children}
    </View>
  );
};

ListItemContent.displayName = 'ListItemContent';

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.components.list.item.contentGap,
    flex: 1,
  },
}));

export default ListItemContent;
