import { View, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const ListItemLeadingContent = ({ children, ...props }: ViewProps) => (
  <View {...props} style={[styles.container, props.style]}>
    {children}
  </View>
);

ListItemLeadingContent.displayName = 'ListItemLeadingContent';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
});

export default ListItemLeadingContent;
