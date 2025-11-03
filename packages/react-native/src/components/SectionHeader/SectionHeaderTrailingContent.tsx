import { View, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const SectionHeaderTrailingContent = ({ children, ...props }: ViewProps) => {
  return (
    <View {...props} style={[styles.container, props.style]}>
      {children}
    </View>
  );
};

SectionHeaderTrailingContent.displayName = 'SectionHeaderTrailingContent';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
});

export default SectionHeaderTrailingContent;
