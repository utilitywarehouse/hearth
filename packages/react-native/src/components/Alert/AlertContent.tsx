import { StyleSheet } from 'react-native-unistyles';
import { View, ViewProps } from 'react-native';

const AlertContent = ({ children, style, ...props }: ViewProps) => {
  return (
    <View {...props} style={[styles.content, style]}>
      {children}
    </View>
  );
};

AlertContent.displayName = 'AlertContent';

const styles = StyleSheet.create(theme => ({
  content: {
    alignItems: 'flex-start',
    flex: 1,
    gap: theme.components.alert.contentGap,
  },
}));

export default AlertContent;
