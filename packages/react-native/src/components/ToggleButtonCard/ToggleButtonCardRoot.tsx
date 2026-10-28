import { useMemo, useState } from 'react';
import { GestureResponderEvent, Pressable, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import ToggleButton from '../ToggleButton/ToggleButton';
import { ToggleButtonCardContext } from './ToggleButtonCard.context';
import type ToggleButtonCardProps from './ToggleButtonCard.props';

const ToggleButtonCardRoot = ({
  children,
  style,
  label,
  checked,
  disabled,
  groupItemValue,
  onPress,
  onToggle,
  onPressIn,
  onPressOut,
  ...props
}: Omit<ToggleButtonCardProps, 'value'> & {
  checked?: boolean;
  onToggle?: () => void;
  /** The card's `value` when it is inside a `ToggleGroup`, which makes its button the group item. */
  groupItemValue?: string;
}) => {
  const [touchPressed, setTouchPressed] = useState(false);
  const active = touchPressed;
  const isDisabled = !!disabled;

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

  const handlePressIn = (event: GestureResponderEvent) => {
    setTouchPressed(true);
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    setTouchPressed(false);
    onPressOut?.(event);
  };

  const handleTogglePress = (event: GestureResponderEvent) => {
    onPress?.(event);
    onToggle?.();
  };

  return (
    <ToggleButtonCardContext.Provider value={value}>
      <Pressable
        {...props}
        disabled={isDisabled}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={state => [
          styles.container,
          (typeof style === 'function' ? style(state) : style) as ViewStyle,
        ]}
      >
        {children}
        <View style={styles.buttonContainer}>
          <ToggleButton
            text={label}
            value={groupItemValue}
            toggled={checked}
            disabled={isDisabled}
            onPress={handleTogglePress}
            style={styles.button}
          />
        </View>
      </Pressable>
    </ToggleButtonCardContext.Provider>
  );
};

ToggleButtonCardRoot.displayName = 'ToggleButtonCardRoot';

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
    },
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: theme.components.radio.gap,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  // `ToggleButton` dims itself when disabled.
  button: {
    flexGrow: 1,
  },
}));

export default ToggleButtonCardRoot;
