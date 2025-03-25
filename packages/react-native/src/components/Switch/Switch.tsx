/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import SwitchProps from './Switch.props';
import { useTheme } from '../../hooks';
import { CloseSmallIcon, TickSmallIcon } from '../../../docs/components/icons';

const AnimatedView = Animated.createAnimatedComponent(View);

const CustomSwitch: React.FC<SwitchProps> = ({
  value = false,
  onValueChange,
  disabled = false,
  size = 'medium',
  ...accessibilityProps
}) => {
  const SWITCH_WIDTH = size === 'medium' ? 60 : 44;
  const THUMB_SIZE = size === 'medium' ? 28 : 20;
  const PADDING = 2;

  const { components, colorMode } = useTheme();
  styles.useVariants({ size, disabled, value });

  const offset = useSharedValue(value ? SWITCH_WIDTH - THUMB_SIZE - PADDING * 2 : 0);
  const progress = useSharedValue(value ? 1 : 0);

  const animatedThumbStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: offset.value }],
    }),
    [offset]
  );

  const animatedSwitchBackgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [components.switch.unchecked.backgroundColor, components.switch.checked.backgroundColor]
    );
    return { backgroundColor };
  }, [progress, disabled, colorMode]);

  // Icon animations
  const tickScale = useSharedValue(value ? 1 : 0);
  const crossScale = useSharedValue(value ? 0 : 1);

  const animatedTickStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: tickScale.value }],
    }),
    [tickScale]
  );

  const animatedCrossStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: crossScale.value }],
    }),
    [crossScale]
  );

  // Press feedback animation
  const scale = useSharedValue(1);

  const animatedSwitchStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }],
    }),
    [scale]
  );

  React.useEffect(() => {
    // Animate the thumb position
    offset.value = withTiming(value ? SWITCH_WIDTH - THUMB_SIZE - PADDING * 2 : 0);

    // Animate the icons
    tickScale.value = withTiming(value ? 1 : 0);
    crossScale.value = withTiming(value ? 0 : 1);

    // Animate the background color with ease-in-out easing
    progress.value = withTiming(value ? 1 : 0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  }, [value, disabled]);

  const toggleSwitch = () => {
    if (disabled) return;
    onValueChange?.(!value);
  };

  const onPressIn = () => {
    scale.value = withSpring(0.95);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Pressable
      onPress={toggleSwitch}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
      aria-checked={value}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={accessibilityProps.accessibilityLabel}
      accessibilityHint={accessibilityProps.accessibilityHint}
      {...accessibilityProps}
    >
      {({ pressed }) => (
        <AnimatedView
          style={[
            styles.switch,
            disabled && styles.disabledSwitch,
            animatedSwitchStyle,
            animatedSwitchBackgroundStyle,
            pressed && value && styles.pressedChecked,
            pressed && !value && styles.pressedUnChecked,
          ]}
        >
          <AnimatedView style={[styles.thumb, animatedThumbStyle]}>
            <AnimatedView style={[styles.iconWrap, animatedTickStyle]}>
              <Icon as={TickSmallIcon} style={styles.icon} />
            </AnimatedView>
            <AnimatedView style={[styles.iconWrap, animatedCrossStyle]}>
              <Icon as={CloseSmallIcon} style={styles.icon} />
            </AnimatedView>
          </AnimatedView>
        </AnimatedView>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  switch: {
    justifyContent: 'center',
    variants: {
      size: {
        medium: {
          width: theme.components.switch.md.width,
          height: theme.components.switch.md.height,
          borderRadius: theme.components.switch.radius,
          padding: theme.components.switch.padding,
        },
        small: {
          width: theme.components.switch.sm.width,
          height: theme.components.switch.sm.height,
          borderRadius: theme.components.switch.radius,
          padding: theme.components.switch.padding,
        },
      },
      value: {
        true: {
          backgroundColor: theme.components.switch.checked.backgroundColor,
        },
        false: {
          backgroundColor: theme.components.switch.unchecked.backgroundColor,
        },
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
  pressedChecked: {
    backgroundColor: theme.components.switch.checked.backgroundColorActive,
  },
  pressedUnChecked: {
    backgroundColor: theme.components.switch.unchecked.backgroundColorActive,
  },
  thumb: {
    backgroundColor: theme.components.switch.circle.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      size: {
        medium: {
          width: theme.components.switch.md.circle.size,
          height: theme.components.switch.md.circle.size,
          borderRadius: theme.components.switch.radius,
        },
        small: {
          width: theme.components.switch.sm.circle.size,
          height: theme.components.switch.sm.circle.size,
          borderRadius: theme.components.switch.radius,
        },
      },
    },
  },
  iconWrap: {
    position: 'absolute',
  },
  icon: {
    variants: {
      value: {
        true: {
          color: theme.components.switch.checked.iconColor,
        },
        false: {
          color: theme.components.switch.unchecked.iconColor,
        },
      },
    },
  },
  disabledSwitch: {
    opacity: 0.5,
  },
}));

export default CustomSwitch;
