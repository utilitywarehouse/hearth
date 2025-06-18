import { View, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const AccordionHeadingTextContent = ({ children, ...props }: ViewProps) => {
  return (
    <View {...props} style={[styles.container, props.style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.components.list.heading.textContentGap,
    flex: 1,
  },
}));

AccordionHeadingTextContent.displayName = 'AccordionHeadingTextContent';

export default AccordionHeadingTextContent;
