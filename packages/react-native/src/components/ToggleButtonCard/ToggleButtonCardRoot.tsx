import React, { forwardRef, useMemo } from 'react';
import { StyleSheet } from 'react-native-unistyles';

import { GestureResponderEvent, Pressable, ViewStyle } from 'react-native';
import type ToggleButtonCardProps from './ToggleButtonCard.props';
import { ToggleButtonCardContext } from './ToggleButtonCard.context';
import { PressableRef } from '../../types';
import { View } from 'react-native';
import ToggleButton from '../ToggleButton/ToggleButton';

const ToggleButtonCardRoot = forwardRef<
  PressableRef,
  ToggleButtonCardProps & { states?: { disabled?: boolean; checked?: boolean; active?: boolean } }
>(({ children, style, label, states, onPress, onChange, ...props }, ref) => {
  const { checked, active } = states ?? {};

  const value = useMemo(
    () => ({
      checked,
      active,
    }),
    [checked, active]
  );

  styles.useVariants({
    selected: checked,
  });

  const handlePress = (e: GestureResponderEvent) => {
    onPress?.(e);
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <ToggleButtonCardContext.Provider value={value}>
      <Pressable
        ref={ref}
        {...props}
        onPress={onPress}
        style={[styles.container, style as ViewStyle]}
      >
        {children}
        <View style={styles.buttonContainer}>
          <ToggleButton
            text={label}
            toggled={checked}
            onPress={handlePress}
            style={styles.button}
          />
        </View>
      </Pressable>
    </ToggleButtonCardContext.Provider>
  );
});

ToggleButtonCardRoot.displayName = 'ToggleButtonCardRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'column',
    gap: theme.components.card.selectable.gap,
    borderRadius: theme.components.card.borderRadius,
    backgroundColor: theme.components.card.whiteBackgroundColor,
    borderWidth: theme.components.card.selectable.borderWidth,
    borderColor: theme.components.card.selectable.borderColor,
    alignSelf: 'stretch',
    padding: {
      base: theme.components.card.mobile.padding,
      md: theme.components.card.tablet.padding,
      lg: theme.components.card.desktop.padding,
    },
    variants: {
      selected: {
        true: {
          borderWidth: theme.components.card.selectable.borderWidthSelected,
          borderColor: theme.components.card.selectable.borderColorSelected,
          margin: -theme.components.card.selectable.borderWidthSelected / 2,
        },
      },
    },
    _web: {
      '_focus-visible': {
        ...theme.helpers.focusVisible,
      },
    },
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: theme.components.radio.gap,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flex: 1,
  },
  button: {
    flex: 1,
  },
}));

export default ToggleButtonCardRoot;
