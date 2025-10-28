import { View, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const ListActionContent = ({ children, ...props }: ViewProps) => {
  return (
    <View {...props} style={[styles.container, props.style]}>
      {children}
    </View>
  );
};

ListActionContent.displayName = 'ListActionContent';

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.components.list.item.contentGap,
    flex: 1,
  },
}));

export default ListActionContent;
