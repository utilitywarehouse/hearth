import React, { forwardRef } from 'react';

import { StyleSheet } from 'react-native-unistyles';
import TextProps from '../../BodyText/BodyText.props';
import { Text as RNText } from 'react-native';
import { BodyText } from '../../BodyText';

const ListHeadingSupportingText = forwardRef<RNText, TextProps>(({ children, ...props }, ref) => {
  return (
    <BodyText size="md" ref={ref} {...props} style={[styles.supportingText, props.style]}>
      {children}
    </BodyText>
  );
});

ListHeadingSupportingText.displayName = 'ListHeadingSupportingText';

const styles = StyleSheet.create(theme => ({
  supportingText: {
    color: theme.components.text.supportingTextColor,
  },
}));

export default ListHeadingSupportingText;
