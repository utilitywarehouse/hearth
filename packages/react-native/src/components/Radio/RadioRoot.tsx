import React, { forwardRef, useMemo } from 'react';
import { StyleSheet } from 'react-native-unistyles';

import { Pressable, ViewStyle } from 'react-native';
import type RadioProps from './Radio.props';
import { RadioContext } from './Radio.context';
import { useRadioGroupContext } from './RadioGroup.context';
import { PressableRef } from '../../types';

const RadioRoot = forwardRef<
  PressableRef,
  RadioProps & { states?: { disabled?: boolean; checked?: boolean; active?: boolean } }
>(({ children, style, states, ...props }, ref) => {
  const { disabled, checked, active } = states ?? {};

  const isDisabled = useRadioGroupContext()?.disabled ?? disabled;

  styles.useVariants({ disabled: isDisabled });

  const value = useMemo(
    () => ({
      disabled: isDisabled,
      checked,
      active,
    }),
    [isDisabled, checked, active]
  );

  return (
    <RadioContext.Provider value={value}>
      <Pressable ref={ref} {...props} style={[styles.container, style as ViewStyle]}>
        {children}
      </Pressable>
    </RadioContext.Provider>
  );
});

RadioRoot.displayName = 'RadioRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: theme.components.radio.gap,
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
}));

export default RadioRoot;
