import React, { forwardRef } from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../../BodyText';

const ListItemHelperText = forwardRef<RNText, TextProps>(({ children, ...props }, ref) => {
  return (
    <BodyText size="md" ref={ref} {...props} style={[styles.text, props.style]}>
      {children}
    </BodyText>
  );
});

ListItemHelperText.displayName = 'ListItemHelperText';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.components.text.colorSecondary,
  },
}));

export default ListItemHelperText;
