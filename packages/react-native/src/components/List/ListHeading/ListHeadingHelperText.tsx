import React, { forwardRef } from 'react';

import { StyleSheet } from 'react-native-unistyles';
import TextProps from '../../BodyText/BodyText.props';
import { Text as RNText } from 'react-native';
import { BodyText } from '../../BodyText';

const ListHeadingHelperText = forwardRef<RNText, TextProps>(({ children, ...props }, ref) => {
  return (
    <BodyText size="md" ref={ref} {...props} style={[styles.helperText, props.style]}>
      {children}
    </BodyText>
  );
});

ListHeadingHelperText.displayName = 'ListHeadingHelperText';

const styles = StyleSheet.create(theme => ({
  helperText: {
    color: theme.components.text.colorSecondary,
  },
}));

export default ListHeadingHelperText;
