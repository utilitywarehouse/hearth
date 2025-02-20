/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
import React, { forwardRef, PropsWithChildren, useMemo } from 'react';
import { GestureResponderEvent, Linking, Pressable, ViewStyle, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { InlineLinkContext } from './InlineLink.context';
import { PressableRef } from '../../types';
import InlineLinkProps from './InlineLink.props';
import InlineLink from './InlineLink';

const InlineLinkRoot = forwardRef<
  Text,
  PropsWithChildren<InlineLinkProps & { states?: { active?: boolean; disabled?: boolean } }>
>(({ children, inverted = false, onPress, states, ...props }, ref) => {
  const { active, disabled = false } = states || {};
  styles.useVariants({ disabled, inverted, active });
  const value = useMemo(() => ({ inverted, disabled, active }), [inverted, disabled, active]);
  return (
    <InlineLinkContext.Provider value={value}>
      <Text ref={ref} {...props} style={[styles.container, props.style]}>
        {children}
      </Text>
    </InlineLinkContext.Provider>
  );
});

InlineLinkRoot.displayName = 'InlineLinkRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    color: theme.components.link.color,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: theme.components.link.color,
    _web: {
      '_focus-visible': {
        borderRadius: theme.borderRadius.xs,
        outlineStyle: 'solid',
        outlineWidth: 2,
        outlineColor: theme.components.focus.border,
        outlineOffset: 1,
        boxShadow: 'none',
      },
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
          _web: {
            '_focus-visible': {
              outlineColor: theme.components.focus.borderInverted,
            },
          },
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
      inline: {
        true: {
          color: theme.color.blue[700],
          textDecorationColor: theme.color.blue[700],
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

export default InlineLinkRoot;
