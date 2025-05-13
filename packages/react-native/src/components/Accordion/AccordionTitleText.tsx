import React, { forwardRef } from 'react';
import { Text, TextProps } from 'react-native';
import { BodyText } from '../../components';
import { StyleSheet } from 'react-native-unistyles';

export const AccordionTitleText = forwardRef<Text, TextProps>(
  ({ children, style, ...props }, ref) => (
    <BodyText ref={ref} weight="semibold" style={[styles.title, style]} {...props}>
      {children}
    </BodyText>
  )
);

const styles = StyleSheet.create({
  title: {
    flex: 1,
  },
});

AccordionTitleText.displayName = 'AccordionTitleText';

export default AccordionTitleText;
