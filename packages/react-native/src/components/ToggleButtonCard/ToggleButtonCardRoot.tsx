import { useMemo, useRef } from 'react';
import { GestureResponderEvent, Platform, Pressable, View, ViewStyle } from 'react-native';
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
  const containerRef = useRef<View>(null);

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
    // gluestack's Radio selection state on web is driven by the hidden native
    // <input type="radio"> receiving a real click (label-forwarding). The
    // ToggleButton nested inside is itself an interactive element, so browsers
    // don't forward the click to that hidden input. Click it directly instead.
    if (Platform.OS === 'web') {
      const node = containerRef.current as unknown as HTMLElement | null;
      const input = node?.querySelector?.('input[type="radio"]') as HTMLInputElement | null;
      if (input && !input.checked) {
        input.click();
        return;
      }
    }
    onPress?.(e);
    props.onChange?.(!checked);
  };

  return (
    <ToggleButtonCardContext.Provider value={value}>
      <Pressable
        {...props}
        ref={containerRef}
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
      // '_focus-visible': {
      //   ...theme.helpers.focusVisible,
      // },
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
