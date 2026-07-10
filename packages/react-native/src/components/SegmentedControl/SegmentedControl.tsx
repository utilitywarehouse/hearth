import { Children, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  const optionValuesKey = useMemo(() => optionValues.join('|'), [optionValues]);
  const optionValuesRef = useRef<string[]>(optionValues);

  useEffect(() => {
    optionValuesRef.current = optionValues;
  }, [optionValues]);

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
    const currentOptionValues = optionValuesRef.current;
    setUncontrolledValue(prev => {
      if (!prev) return currentOptionValues[0];
      if (!currentOptionValues.includes(prev)) return currentOptionValues[0];
      return prev;
    });
  }, [optionValuesKey]);

  const currentValue = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const indicatorY = useSharedValue(0);
  const indicatorHeight = useSharedValue(0);
  const [hasIndicator, setHasIndicator] = useState(false);
  const layoutsRef = useRef<Map<string, { x: number; y: number; width: number; height: number }>>(
    new Map()
  );
  const prevValueRef = useRef<string | undefined>(undefined);
  const initialisedRef = useRef(false);

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
      layoutsRef.current.set(value, layout);
      const activeValue = controlledValue !== undefined ? controlledValue : uncontrolledValue;
      if (!activeValue || activeValue !== value) return;

      if (!initialisedRef.current) {
        indicatorX.value = Math.max(0, layout.x - indicatorPositionOffset);
        indicatorWidth.value = layout.width;
        indicatorY.value = Math.max(0, layout.y - indicatorPositionOffset);
        indicatorHeight.value = layout.height;
        prevValueRef.current = activeValue;
        initialisedRef.current = true;
        setHasIndicator(true);
        return;
      }

      if (prevValueRef.current === activeValue) return;

      const config = {
        delay: 200,
        duration: isReducedMotion ? 0 : 220,
        easing: Easing.out(Easing.cubic),
      } as const;

      indicatorX.value = withTiming(Math.max(0, layout.x - indicatorPositionOffset), config);
      indicatorWidth.value = withTiming(layout.width, config);
      indicatorY.value = withTiming(Math.max(0, layout.y - indicatorPositionOffset), config);
      indicatorHeight.value = withTiming(layout.height, config);
      prevValueRef.current = activeValue;
    },
    [
      controlledValue,
      indicatorHeight,
      indicatorWidth,
      indicatorX,
      indicatorY,
      indicatorPositionOffset,
      isReducedMotion,
      uncontrolledValue,
    ]
  );

  useEffect(() => {
    if (!currentValue || !initialisedRef.current) return;
    if (prevValueRef.current === undefined || prevValueRef.current === currentValue) return;
    const layout = layoutsRef.current.get(currentValue);
    if (!layout) return;
    const config = {
      duration: isReducedMotion ? 0 : 220,
      easing: Easing.out(Easing.cubic),
    } as const;

    indicatorX.value = withTiming(Math.max(0, layout.x - indicatorPositionOffset), config);
    indicatorWidth.value = withTiming(layout.width, config);
    indicatorY.value = withTiming(Math.max(0, layout.y - indicatorPositionOffset), config);
    indicatorHeight.value = withTiming(layout.height, config);
    prevValueRef.current = currentValue;
  }, [
    currentValue,
    indicatorHeight,
    indicatorWidth,
    indicatorX,
    indicatorY,
    indicatorPositionOffset,
    isReducedMotion,
    optionValuesKey,
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
          <Indicator style={[styles.indicator, styles.pointerEventsNone, indicatorStyle]} />
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
          padding: theme.components.segmentedControl.group.padding,
        },
        md: {
          height: theme.components.segmentedControl.group.height,
          padding: theme.components.segmentedControl.group.padding,
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
  pointerEventsNone: {
    pointerEvents: 'none',
  },
}));

export default SegmentedControl;
