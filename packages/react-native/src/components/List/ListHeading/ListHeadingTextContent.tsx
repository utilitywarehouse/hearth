import { View, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const ListHeadingTextContent = ({ children, ...props }: ViewProps) => {
  return (
    <View {...props} style={[styles.container, props.style]}>
      {children}
    </View>
  );
};

ListHeadingTextContent.displayName = 'ListHeadingTextContent';

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.components.sectionHeader.verticalGap,
    flex: 1,
  },
}));

export default ListHeadingTextContent;
