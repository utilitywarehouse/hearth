/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
import React, { forwardRef, PropsWithChildren, useMemo } from 'react';
import { Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { LinkContext } from './Link.context';
import { PressableRef } from '../../types';
import LinkProps from './Link.props';

const LinkRoot = forwardRef<
  PressableRef,
  PropsWithChildren<LinkProps & { states?: { active?: boolean; disabled?: boolean } }>
>(({ children, inverted = false, states, ...props }, ref) => {
  const { active, disabled = false } = states || {};
  styles.useVariants({ disabled, inverted, active });
  const value = useMemo(() => ({ inverted, disabled, active }), [inverted, disabled, active]);
  return (
    <LinkContext.Provider value={value}>
      <Pressable ref={ref} {...props} style={[styles.container, props.style as ViewStyle]}>
        {children}
      </Pressable>
    </LinkContext.Provider>
  );
});

LinkRoot.displayName = 'LinkRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: theme.components.link.gap,
    _web: {
      '_focus-visible': {
        borderRadius: theme.borderRadius.xs,
        outlineStyle: 'solid',
        outlineWidth: 2,
        outlineColor: theme.components.focus.border,
        outlineOffset: 1,
        boxShadow: 'none',
      },
    },
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
      inverted: {
        true: {
          _web: {
            '_focus-visible': {
              outlineColor: theme.components.focus.borderInverted,
            },
          },
        },
      },
      active: {
        true: {},
      },
    },
  },
}));

export default LinkRoot;
