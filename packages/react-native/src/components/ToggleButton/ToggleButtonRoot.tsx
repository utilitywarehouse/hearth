/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
import React, { forwardRef, PropsWithChildren } from 'react';
import type { ToggleButtonProps } from './ToggleButton.props';
import { Pressable, ViewStyle, GestureResponderEvent } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { PressableRef } from '../../types';
import { useCardActionContext } from '../Card';

const ButtonRoot = forwardRef<
  PressableRef,
  PropsWithChildren<ToggleButtonProps & { states?: { active?: boolean; disabled?: boolean } }>
>(({ children, onToggle, toggled, states, onPress, ...props }, ref) => {
  const { active } = states || {};
  const { pressed } = useCardActionContext();

  styles.useVariants({
    toggled,
    active: active || pressed,
  });

  const handlePress = (e: GestureResponderEvent) => {
    onPress?.(e);
    if (onToggle) {
      onToggle(!toggled);
    }
  };

  return (
    <Pressable
      ref={ref}
      {...props}
      style={[styles.container, props.style as ViewStyle]}
      onPress={handlePress}
    >
      {children}
    </Pressable>
  );
});

ButtonRoot.displayName = 'ButtonRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: theme.components.toggleButton.borderWidth,
    borderRadius: theme.components.toggleButton.borderRadius,
    gap: theme.components.toggleButton.gap,
    minWidth: theme.components.toggleButton.minWidth,
    paddingHorizontal: theme.components.toggleButton.paddingHorizontal,
    paddingVertical: theme.components.toggleButton.paddingVertical,
    borderColor: theme.components.toggleButton.borderColor,
    height: theme.components.toggleButton.height,
    _web: {
      '_focus-visible': theme.helpers.focusVisible,
      _hover: {
        backgroundColor: theme.components.toggleButton.backgroundColorHover,
      },
      _active: {
        backgroundColor: theme.components.toggleButton.backgroundColorActive,
      },
    },
    variants: {
      toggled: {
        true: {
          backgroundColor: theme.components.toggleButton.selected.backgroundColor,
          borderColor: theme.components.toggleButton.selected.borderColor,
          _web: {
            _hover: {
              backgroundColor: theme.components.toggleButton.selected.backgroundColorHover,
            },
            _active: {
              backgroundColor: theme.components.toggleButton.selected.backgroundColorActive,
            },
          },
        },
      },
      active: {
        true: {
          backgroundColor: theme.components.toggleButton.backgroundColorActive,
        },
      },
    },
    compoundVariants: [
      {
        toggled: true,
        active: true,
        styles: {
          backgroundColor: theme.components.toggleButton.selected.backgroundColorActive,
        },
      },
    ],
  },
}));

export default ButtonRoot;
