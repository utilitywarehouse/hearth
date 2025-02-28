/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
import React, { forwardRef } from 'react';
import { Text, type TextProps } from 'react-native';
import { useLinkContext } from './Link.context';
import { StyleSheet } from 'react-native-unistyles';
import { DetailText } from '../DetailText';
import { BodyText } from '../BodyText';

const LinkText = forwardRef<Text, TextProps>(({ children, ...props }, ref) => {
  const { inverted, disabled, active } = useLinkContext();
  styles.useVariants({ active, inverted, disabled });
  return (
    <DetailText size="md" ref={ref} {...props} style={[styles.text, props.style]}>
      {children}
    </DetailText>
  );
});

LinkText.displayName = 'LinkText';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.components.link.color,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: theme.components.link.color,
    _web: {
      _hover: {
        textDecorationLine: 'none',
      },
    },
    variants: {
      active: {
        true: {
          color: theme.components.link.colorActive,
        },
      },
      inverted: {
        true: {
          color: theme.components.link.inverted.color,
          textDecorationColor: theme.components.link.inverted.color,
        },
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
    compoundVariants: [
      {
        inverted: true,
        active: true,
        styles: {
          color: theme.components.link.inverted.colorActive,
        },
      },
    ],
  },
}));

export default LinkText;
