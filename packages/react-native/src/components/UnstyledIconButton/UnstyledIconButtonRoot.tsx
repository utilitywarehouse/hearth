/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
import React, { forwardRef, PropsWithChildren, useMemo } from 'react';
import type { UnstyledIconButtonProps } from './UnstyledIconButton.props';
import { Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { UnstyledIconButtonContext } from './UnstyledIconButton.context';
import { PressableRef } from '../../types';

const UnstyledIconButtonRoot = forwardRef<
  PressableRef,
  PropsWithChildren<UnstyledIconButtonProps & { states?: { active?: boolean; disabled?: boolean } }>
>(({ children, states, ...props }, ref) => {
  const { active, disabled } = states || {};
  styles.useVariants({ disabled });
  const value = useMemo(() => ({ disabled, active }), [disabled, active]);
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
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.sm,
    _web: {
      '_focus-visible': theme.helpers.focuseVisible,
    },
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
}));

export default UnstyledIconButtonRoot;
