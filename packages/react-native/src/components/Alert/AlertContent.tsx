import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { View, ViewProps } from 'react-native';

const AlertContent = forwardRef<View, ViewProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} {...props} style={[styles.content, style]}>
      {children}
    </View>
  );
});

AlertContent.displayName = 'AlertContent';

const styles = StyleSheet.create(theme => ({
  content: {
    alignItems: 'flex-start',
    flex: 1,
    gap: theme.components.alert.contentGap,
  },
}));

export default AlertContent;
