import { useMemo } from 'react';
import { StyleSheet } from 'react-native-unistyles';

import { Pressable, ViewStyle } from 'react-native';
import { RadioCardContext } from './RadioCard.context';
import type RadioCardProps from './RadioCard.props';
import { useRadioCardGroupContext } from './RadioCardGroup.context';

const RadioCardRoot = ({
  children,
  style,
  states,
  disabled,
  ...props
}: RadioCardProps & { states?: { disabled?: boolean; checked?: boolean; active?: boolean } }) => {
  const { checked, active } = states ?? {};

  const { flexDirection, disabled: groupDisabled } = useRadioCardGroupContext() ?? {};
  const isDisabled = groupDisabled ?? disabled ?? undefined;

  const value = useMemo(
    () => ({
      checked,
      active,
    }),
    [checked, active]
  );

  styles.useVariants({
    selected: checked,
    flexDirection,
    disabled: isDisabled,
  });

  return (
    <RadioCardContext.Provider value={value}>
      <Pressable {...props} disabled={isDisabled} style={[styles.container, style as ViewStyle]}>
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
    backgroundColor: theme.color.surface.neutral.strong,
    borderWidth: theme.components.card.selectable.borderWidth,
    borderColor: theme.color.border.subtle,
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
          borderColor: theme.color.border.strong,
          margin: -theme.components.card.selectable.borderWidthSelected / 2,
        },
      },
      flexDirection: {
        row: {},
        column: {
          width: '100%',
        },
        'row-reverse': {},
        'column-reverse': {
          width: '100%',
        },
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
    _web: {
      // '_focus-visible': {
      //   ...theme.helpers.focusVisible,
      // },
    },
  },
}));

export default RadioCardRoot;
