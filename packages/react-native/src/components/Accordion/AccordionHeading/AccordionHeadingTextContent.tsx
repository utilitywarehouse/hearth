import React, { forwardRef } from 'react';
import { View, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const AccordionHeadingTextContent = forwardRef<View, ViewProps>(({ children, ...props }, ref) => {
  return (
    <View ref={ref} {...props} style={[styles.container, props.style]}>
      {children}
    </View>
  );
});

AccordionHeadingTextContent.displayName = 'AccordionHeadingTextContent';

const styles = StyleSheet.create(theme => ({
  container: {
    gap: theme.components.list.heading.textContentGap,
    flex: 1,
  },
}));

export default AccordionHeadingTextContent;
