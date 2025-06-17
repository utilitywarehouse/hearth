import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native-unistyles';

import { Pressable, ViewStyle } from 'react-native';
import type RadioCardProps from './RadioCard.props';
import { RadioCardContext } from './RadioCard.context';

const RadioCardRoot = ({
  children,
  style,
  states,
  ...props
}: RadioCardProps & { states?: { disabled?: boolean; checked?: boolean; active?: boolean } }) => {
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

  return (
    <RadioCardContext.Provider value={value}>
      {/* @ts-expect-error -  */}
      <Pressable {...props} style={[styles.container, style as ViewStyle]}>
        {children}
      </Pressable>
    </RadioCardContext.Provider>
  );
};

RadioCardRoot.displayName = 'RadioCardRoot';

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
}));

export default RadioCardRoot;
