import React, { forwardRef } from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { BodyText } from '../../BodyText';

const ListItemText = forwardRef<RNText, TextProps>(({ children, ...props }, ref) => {
  return (
    <BodyText size="lg" ref={ref} {...props}>
      {children}
    </BodyText>
  );
});

ListItemText.displayName = 'ListItemText';

export default ListItemText;
