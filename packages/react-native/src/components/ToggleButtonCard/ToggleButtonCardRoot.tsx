import { useMemo } from 'react';
import { GestureResponderEvent, Pressable, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import ToggleButton from '../ToggleButton/ToggleButton';
import { ToggleButtonCardContext } from './ToggleButtonCard.context';
import type ToggleButtonCardProps from './ToggleButtonCard.props';

const ToggleButtonCardRoot = ({
  children,
  style,
  label,
  states,
  onPress,
  ...props
}: ToggleButtonCardProps & {
  states?: { disabled?: boolean; checked?: boolean; active?: boolean };
}) => {
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
    props.onChange?.(!checked);
  };

  return (
    <ToggleButtonCardContext.Provider value={value}>
      <Pressable {...props} onPress={onPress} style={[styles.container, style as ViewStyle]}>
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
