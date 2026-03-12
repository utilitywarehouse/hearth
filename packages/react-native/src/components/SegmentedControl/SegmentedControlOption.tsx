import { createPressable } from '@gluestack-ui/pressable';
import { useEffect } from 'react';
import { Platform, Pressable, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Icon } from '../Icon';
import { useSegmentedControlContext } from './SegmentedControl.context';
import type SegmentedControlOptionProps from './SegmentedControlOption.props';

const AnimatedView = Animated.createAnimatedComponent(View);

const SegmentedControlOptionRoot = ({
  value,
  children,
  icon,
  accessibilityLabel,
  disabled = false,
  style,
  states = {},
  ...props
}: SegmentedControlOptionProps & { states?: { active?: boolean; disabled?: boolean } }) => {
  const {
    value: selectedValue,
    select,
    disabled: allDisabled,
    size,
    registerOptionLayout,
  } = useSegmentedControlContext();
  const { active = false } = states;
  const reducedMotion = useReducedMotion();

  const selected = selectedValue === value;
  const isDisabled = disabled || !!allDisabled;

  const selectedProgress = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    selectedProgress.value = withTiming(selected ? 1 : 0, {
      duration: reducedMotion ? 0 : 220,
      easing: Easing.out(Easing.cubic),
    });
  }, [reducedMotion, selected, selectedProgress]);

  const regularLabelStyle = useAnimatedStyle(() => ({
    opacity: 1 - selectedProgress.value,
  }));

  const selectedLabelStyle = useAnimatedStyle(() => ({
    opacity: selectedProgress.value,
  }));

  styles.useVariants({ selected, disabled: isDisabled, size, active });

  const onPress = () => {
    if (isDisabled) return;
    select(value);
  };

  const accessibleLabel =
    typeof children === 'string' || typeof children === 'number' ? String(children) : value;

  return (
    <Pressable
      {...props}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled: isDisabled }}
      accessibilityLabel={accessibilityLabel ?? accessibleLabel}
      onPress={onPress}
      onLayout={e => registerOptionLayout(value, e.nativeEvent.layout)}
      disabled={isDisabled}
      style={[styles.option, style]}
      {...(Platform.OS === 'web'
        ? ({ 'aria-label': accessibilityLabel ?? accessibleLabel } as any)
        : null)}
    >
      <View
        style={styles.contentWrap}
        accessible={false}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        {...(Platform.OS === 'web' ? ({ 'aria-hidden': true } as any) : null)}
      >
        {icon ? <Icon as={icon} size="sm" style={styles.icon} /> : null}
        <View style={styles.labelWrap}>
          <BodyText
            size="md"
            weight="semibold"
            style={styles.labelSizer}
            accessible={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            {...(Platform.OS === 'web' ? ({ 'aria-hidden': true } as any) : null)}
          >
            {children}
          </BodyText>
          <AnimatedView
            style={[styles.textLayer, styles.pointerEventsNone, regularLabelStyle]}
            accessible={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            {...(Platform.OS === 'web' ? ({ 'aria-hidden': true } as any) : null)}
          >
            <BodyText size="md" weight="regular" style={styles.textRegular}>
              {children}
            </BodyText>
          </AnimatedView>
          <AnimatedView
            style={[styles.textLayer, styles.pointerEventsNone, selectedLabelStyle]}
            accessible={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            {...(Platform.OS === 'web' ? ({ 'aria-hidden': true } as any) : null)}
          >
            <BodyText size="md" weight="semibold" style={styles.textSelected}>
              {children}
            </BodyText>
          </AnimatedView>
        </View>
      </View>
    </Pressable>
  );
};

const SegmentedControlOption = createPressable({ Root: SegmentedControlOptionRoot });

SegmentedControlOption.displayName = 'SegmentedControlOption';

const styles = StyleSheet.create(theme => ({
  option: {
    minWidth: theme.components.segmentedControl.minWidth,
    height: theme.components.segmentedControl.height,
    borderRadius: theme.components.segmentedControl.borderRadius,
    paddingHorizontal: theme.components.segmentedControl.paddingHorizontal,
    paddingVertical: theme.components.segmentedControl.paddingVertical,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 1,
    variants: {
      size: {
        sm: {
          height: 28,
          paddingHorizontal: theme.space[150],
          paddingVertical: 0,
        },
        md: {
          height: 44,
          paddingHorizontal: theme.components.segmentedControl.paddingHorizontal,
          paddingVertical: theme.components.segmentedControl.paddingVertical,
        },
      },
      selected: {
        true: {
          backgroundColor: 'transparent',
          _web: {
            _active: {
              backgroundColor: theme.color.interactive.brand.surface.strong.active,
            },
          },
        },
        false: {
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.neutral.surface.subtle.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
            },
          },
        },
      },
      active: {
        true: {
          backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
        },
      },
    },
  },
  contentWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.components.segmentedControl.gap,
  },
  labelWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelSizer: {
    opacity: 0,
  },
  textLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointerEventsNone: {
    pointerEvents: 'none',
  },
  icon: {
    variants: {
      selected: {
        true: {
          color: theme.color.icon.inverted,
        },
        false: {
          color: theme.color.icon.primary,
        },
      },
    },
  },
  textRegular: {
    color: theme.color.text.primary,
  },
  textSelected: {
    color: theme.color.text.inverted,
    variants: {
      disabled: {
        true: {
          opacity: 1,
        },
      },
    },
  },
}));

export default SegmentedControlOption;
