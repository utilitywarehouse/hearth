import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native-unistyles';

import { GestureResponderEvent, Pressable, ViewStyle } from 'react-native';
import { RadioCardContext } from './RadioCard.context';
import type RadioCardProps from './RadioCard.props';
import { useRadioCardGroupContext } from './RadioCardGroup.context';

const RadioCardRoot = ({
  children,
  style,
  disabled,
  checked,
  onPressIn,
  onPressOut,
  ...props
}: RadioCardProps & { checked?: boolean }) => {
  const [touchPressed, setTouchPressed] = useState(false);
  const { flexDirection } = useRadioCardGroupContext();
  const isDisabled = disabled ?? undefined;
  const active = touchPressed;

  const value = useMemo(
    () => ({
      checked,
      active,
      disabled: !!isDisabled,
    }),
    [checked, active, isDisabled]
  );

  styles.useVariants({
    selected: checked,
    flexDirection,
    disabled: isDisabled,
  });

  const handlePressIn = (event: GestureResponderEvent) => {
    setTouchPressed(true);
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    setTouchPressed(false);
    onPressOut?.(event);
  };

  return (
    <RadioCardContext.Provider value={value}>
      <Pressable
        accessibilityRole="radio"
        disabled={isDisabled}
        {...props}
        accessibilityState={{
          ...props.accessibilityState,
          checked: !!checked,
          disabled: !!isDisabled,
        }}
        aria-checked={!!checked}
        style={[styles.container, style as ViewStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
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
      '_focus-visible': {
        ...theme.helpers.focusVisible,
      },
    },
  },
}));

export default RadioCardRoot;
