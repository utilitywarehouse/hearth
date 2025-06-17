import { useMemo } from 'react';
import { StyleSheet } from 'react-native-unistyles';

import { Pressable, ViewStyle } from 'react-native';
import type RadioProps from './Radio.props';
import { RadioContext } from './Radio.context';
import { useRadioGroupContext } from './RadioGroup.context';

const RadioRoot = ({
  children,
  style,
  states,
  ...props
}: RadioProps & { states?: { disabled?: boolean; checked?: boolean; active?: boolean } }) => {
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
      {/* @ts-expect-error - Pressable children */}
      <Pressable {...props} style={[styles.container, style as ViewStyle]}>
        {children}
      </Pressable>
    </RadioContext.Provider>
  );
};

RadioRoot.displayName = 'RadioRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: theme.components.radio.gap,
    alignSelf: 'stretch',
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
    _web: {
      '_focus-visible': {
        outline: 'none',
      },
      '_focus-visible > div:nth-child(2)': {
        ...theme.helpers.focusVisible,
      },
    },
  },
}));

export default RadioRoot;
