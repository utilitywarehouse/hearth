import React, { forwardRef, PropsWithChildren, useMemo } from 'react';
import type { UnstyledIconButtonProps } from './UnstyledIconButton.props';
import { Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { UnstyledIconButtonContext } from './UnstyledIconButton.context';
import { PressableRef } from '../../types';

const UnstyledIconButtonRoot = forwardRef<
  PressableRef,
  PropsWithChildren<UnstyledIconButtonProps & { states?: { active?: boolean; disabled?: boolean } }>
>(({ children, size, inverted, states, ...props }, ref) => {
  const { active, disabled } = states || {};
  styles.useVariants({ disabled, size });
  const value = useMemo(
    () => ({ disabled, active, inverted, size }),
    [disabled, active, inverted, size]
  );
  return (
    <UnstyledIconButtonContext.Provider value={value}>
      <Pressable ref={ref} {...props} style={[styles.container, props.style as ViewStyle]}>
        {children}
      </Pressable>
    </UnstyledIconButtonContext.Provider>
  );
});

UnstyledIconButtonRoot.displayName = 'UnstyledIconButtonRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
    _web: {
      '_focus-visible': theme.helpers.focusVisible,
    },
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
      size: {
        sm: {
          width: theme.components.iconButton.unstyled.sm.width,
          height: theme.components.iconButton.unstyled.sm.height,
        },
        md: {
          width: theme.components.iconButton.unstyled.md.width,
          height: theme.components.iconButton.unstyled.md.height,
        },
      },
    },
  },
}));

export default UnstyledIconButtonRoot;
