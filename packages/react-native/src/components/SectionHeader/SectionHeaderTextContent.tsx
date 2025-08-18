import { View, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const SectionHeaderTextContent = ({ children, ...props }: ViewProps) => {
  return (
    <View {...props} style={[styles.container, props.style]}>
      {children}
    </View>
  );
};

SectionHeaderTextContent.displayName = 'SectionHeaderTextContent';

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.components.sectionHeader.verticalGap,
    flex: 1,
  },
}));

export default SectionHeaderTextContent;
