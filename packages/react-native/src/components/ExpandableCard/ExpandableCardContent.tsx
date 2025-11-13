import { View, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const ExpandableCardContent = ({ children, ...props }: ViewProps) => {
  return (
    <View {...props} style={[styles.container, props.style]}>
      {children}
    </View>
  );
};

ExpandableCardContent.displayName = 'ExpandableCardContent';

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.components.expandableCard.gapVertical,
    flex: 1,
  },
}));

export default ExpandableCardContent;
