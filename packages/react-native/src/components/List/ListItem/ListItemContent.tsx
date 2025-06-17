import { View, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const ListItemContent = ({ children, ...props }: ViewProps) => {
  return (
    <View {...props} style={[styles.container, props.style]}>
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
