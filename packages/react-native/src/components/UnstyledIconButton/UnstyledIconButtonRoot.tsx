import React, { useMemo } from 'react';
import type { UnstyledIconButtonProps } from './UnstyledIconButton.props';
import { Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { UnstyledIconButtonContext } from './UnstyledIconButton.context';

const UnstyledIconButtonRoot = ({
  size,
  inverted,
  states,
  ...props
}: UnstyledIconButtonProps & { states?: { active?: boolean; disabled?: boolean } }) => {
  const { active, disabled } = states || {};
  styles.useVariants({ disabled, size });
  const value = useMemo(
    () => ({ disabled, active, inverted, size }),
    [disabled, active, inverted, size]
  );
  return (
    <UnstyledIconButtonContext.Provider value={value}>
      <Pressable {...props} style={[styles.container, props.style as ViewStyle]} />
    </UnstyledIconButtonContext.Provider>
  );
};

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
