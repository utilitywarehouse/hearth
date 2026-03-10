import { Children, isValidElement, useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { useStyleProps } from '../../hooks';
import { SegmentedControlContext } from './SegmentedControl.context';
import type SegmentedControlProps from './SegmentedControl.props';

const Indicator = Animated.createAnimatedComponent(View);
const GROUP_BORDER_WIDTH = 1;

const SegmentedControl = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  size = 'sm',
  disabled = false,
  children,
  style,
  ...props
}: SegmentedControlProps) => {
  const { computedStyles, remainingProps } = useStyleProps(props);
  const isReducedMotion = useReducedMotion();
  const indicatorPositionOffset = GROUP_BORDER_WIDTH;

  const optionValues = useMemo(() => {
    const values: string[] = [];

    const walk = (node: any) => {
      Children.forEach(node, child => {
        if (!isValidElement(child)) return;

        const childType: any = child.type;
        const childProps: any = child.props;

        if (
          childType?.displayName === 'SegmentedControlOption' &&
          typeof childProps?.value === 'string'
        ) {
          values.push(childProps.value);
        }

        if (childProps?.children) {
          walk(childProps.children);
        }
      });
    };

    walk(children);
    return values;
  }, [children]);

  const getInitialValue = () => {
    if (controlledValue !== undefined) return controlledValue;
    if (defaultValue !== undefined) return defaultValue;
    return optionValues[0];
  };

  const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(getInitialValue);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setUncontrolledValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    setUncontrolledValue(prev => {
      if (!prev) return optionValues[0];
      if (!optionValues.includes(prev)) return optionValues[0];
      return prev;
    });
  }, [optionValues]);

  const currentValue = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const indicatorY = useSharedValue(0);
  const indicatorHeight = useSharedValue(0);
  const [hasIndicator, setHasIndicator] = useState(false);
  const [layouts, setLayouts] = useState<
    Map<string, { x: number; y: number; width: number; height: number }>
  >(new Map());

  const select = useCallback(
    (nextValue: string) => {
      if (disabled) return;
      if (controlledValue === undefined) {
        setUncontrolledValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [controlledValue, disabled, onValueChange]
  );

  const registerOptionLayout = useCallback(
    (value: string, layout: { x: number; y: number; width: number; height: number }) => {
      setLayouts(prev => {
        const next = new Map(prev);
        next.set(value, layout);
        return next;
      });
      if (currentValue !== value) return;

      const shouldAnimate = hasIndicator && !isReducedMotion;
      const config = { duration: 220, easing: Easing.out(Easing.cubic) } as const;

      if (shouldAnimate) {
        indicatorX.value = withTiming(Math.max(0, layout.x - indicatorPositionOffset), config);
        indicatorWidth.value = withTiming(layout.width, config);
        indicatorY.value = withTiming(Math.max(0, layout.y - indicatorPositionOffset), config);
        indicatorHeight.value = withTiming(layout.height, config);
      } else {
        indicatorX.value = Math.max(0, layout.x - indicatorPositionOffset);
        indicatorWidth.value = layout.width;
        indicatorY.value = Math.max(0, layout.y - indicatorPositionOffset);
        indicatorHeight.value = layout.height;
        setHasIndicator(true);
      }
    },
    [
      currentValue,
      hasIndicator,
      indicatorHeight,
      indicatorWidth,
      indicatorX,
      indicatorY,
      indicatorPositionOffset,
      isReducedMotion,
    ]
  );

  useEffect(() => {
    if (!currentValue) return;
    const layout = layouts.get(currentValue);
    if (!layout) return;
    const config = {
      duration: isReducedMotion ? 0 : 220,
      easing: Easing.out(Easing.cubic),
    } as const;

    indicatorX.value = withTiming(Math.max(0, layout.x - indicatorPositionOffset), config);
    indicatorWidth.value = withTiming(layout.width, config);
    indicatorY.value = withTiming(Math.max(0, layout.y - indicatorPositionOffset), config);
    indicatorHeight.value = withTiming(layout.height, config);

    if (!hasIndicator) setHasIndicator(true);
  }, [
    currentValue,
    hasIndicator,
    indicatorHeight,
    indicatorWidth,
    indicatorX,
    indicatorY,
    indicatorPositionOffset,
    isReducedMotion,
    layouts,
  ]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }, { translateY: indicatorY.value }],
    width: indicatorWidth.value,
    height: indicatorHeight.value,
  }));

  styles.useVariants({ disabled, size });

  const contextValue = useMemo(
    () => ({
      value: currentValue,
      select,
      disabled,
      size,
      registerOptionLayout,
    }),
    [currentValue, select, disabled, size, registerOptionLayout]
  );

  return (
    <SegmentedControlContext.Provider value={contextValue}>
      <View
        accessibilityRole="radiogroup"
        accessibilityState={{ disabled }}
        style={[styles.container, computedStyles, style]}
        {...remainingProps}
      >
        {hasIndicator ? (
          <Indicator pointerEvents="none" style={[styles.indicator, indicatorStyle]} />
        ) : null}
        {children}
      </View>
    </SegmentedControlContext.Provider>
  );
};

SegmentedControl.displayName = 'SegmentedControl';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: theme.components.segmentedControl.group.gap,
    height: theme.components.segmentedControl.group.height,
    borderRadius: theme.components.segmentedControl.group.borderRadius,
    borderWidth: theme.components.segmentedControl.group.borderWidth,
    backgroundColor: theme.color.surface.neutral.subtle,
    borderColor: theme.color.border.strong,
    variants: {
      size: {
        sm: {
          height: 32,
          padding: 2,
        },
        md: {
          height: theme.components.segmentedControl.group.height,
          padding: 2,
        },
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
  indicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: theme.components.segmentedControl.borderRadius,
    backgroundColor: theme.color.interactive.brand.surface.strong.default,
  },
}));

export default SegmentedControl;
