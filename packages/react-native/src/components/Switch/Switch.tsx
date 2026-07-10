import { CloseSmallIcon, TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { useAnimatedTheme } from 'react-native-unistyles/reanimated';
import { useTheme } from '../../hooks';
import { Icon } from '../Icon';
import SwitchProps from './Switch.props';

const CustomSwitch = ({
  value = false,
  onValueChange,
  disabled = false,
  size = 'md',
  ...accessibilityProps
}: SwitchProps) => {
  const { components } = useTheme();
  const theme = useAnimatedTheme();
  // 'small' | 'medium' are deprecated aliases for 'sm' | 'md'
  const resolvedSize = size === 'small' ? 'sm' : size === 'medium' ? 'md' : size;
  const SWITCH_WIDTH =
    resolvedSize === 'md' ? components.switch.md.width : components.switch.sm.width;
  const THUMB_SIZE =
    resolvedSize === 'md' ? components.switch.md.circle.size : components.switch.sm.circle.size;
  const PADDING = components.switch.padding;
  const isReducedMotion = useReducedMotion();

  styles.useVariants({ size: resolvedSize, disabled, value });

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
      [
        theme.value.color.interactive.functional.surface.strong.default,
        theme.value.color.interactive.brand.surface.strong.default,
      ]
    );
    return { backgroundColor };
  });

  // Icon animations
  const tickScale = useSharedValue(value ? 1 : 0);
  const crossScale = useSharedValue(value ? 0 : 1);

  const animatedTickStyle = useAnimatedStyle(() => ({
    transform: [{ scale: tickScale.value }],
  }));

  const animatedCrossStyle = useAnimatedStyle(() => ({
    transform: [{ scale: crossScale.value }],
  }));

  // Press feedback animation
  const scale = useSharedValue(1);

  const animatedSwitchStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    const userConfig = {
      duration: isReducedMotion ? 0 : 300,
      easing: Easing.inOut(Easing.ease),
    };
    // Animate the thumb position
    offset.value = withTiming(value ? SWITCH_WIDTH - THUMB_SIZE - PADDING * 2 : 0, userConfig);

    // Animate the icons
    tickScale.value = withTiming(value ? 1 : 0, userConfig);
    crossScale.value = withTiming(value ? 0 : 1, userConfig);

    // Animate the background color with ease-in-out easing
    progress.value = withTiming(value ? 1 : 0, userConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Animated.View style={[styles.switch, animatedSwitchBackgroundStyle, animatedSwitchStyle]}>
        <Animated.View style={[styles.thumb, animatedThumbStyle]}>
          <Animated.View style={[styles.iconWrap, animatedTickStyle]}>
            {(() => {
              const IconAny = Icon as any;
              return <IconAny as={TickSmallIcon} style={styles.icon as any} />;
            })()}
          </Animated.View>
          <Animated.View style={[styles.iconWrap, animatedCrossStyle]}>
            {(() => {
              const IconAny = Icon as any;
              return <IconAny as={CloseSmallIcon} style={styles.icon as any} />;
            })()}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  switch: {
    justifyContent: 'center',
    variants: {
      size: {
        md: {
          width: theme.components.switch.md.width,
          height: theme.components.switch.md.height,
          borderRadius: theme.components.switch.radius,
          padding: theme.components.switch.padding,
        },
        sm: {
          width: theme.components.switch.sm.width,
          height: theme.components.switch.sm.height,
          borderRadius: theme.components.switch.radius,
          padding: theme.components.switch.padding,
        },
      },
      value: {
        true: {
          backgroundColor: theme.color.interactive.brand.surface.strong.default,
        },
        false: {
          backgroundColor: theme.color.interactive.functional.surface.strong.default,
        },
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
  thumb: {
    backgroundColor: theme.color.surface.neutral.strong,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      size: {
        md: {
          width: theme.components.switch.md.circle.size,
          height: theme.components.switch.md.circle.size,
          borderRadius: theme.components.switch.radius,
        },
        sm: {
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
          color: theme.color.icon.primary,
        },
        false: {
          color: theme.color.icon.primary,
        },
      },
    },
  },
}));

export default CustomSwitch;
