import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import { TabsContext } from './Tabs.context';
import type TabsProps from './Tabs.props';
import { collectTabValues, resolveActiveValue, resolveInitialValue, resolveValidValue } from './Tabs.utils';

const Tabs = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  size = 'md',
  disabled,
  children,
  ...props
}: TabsProps) => {
  // Collect child tab values
  const tabValues = useMemo(() => collectTabValues(children), [children]);

  const getInitial = () => resolveInitialValue({ controlledValue, defaultValue, tabValues });

  const [uncontrolled, setUncontrolled] = useState<string | undefined>(getInitial);

  useEffect(() => {
    if (controlledValue !== undefined) setUncontrolled(controlledValue);
  }, [controlledValue]);

  // Ensure value remains valid if tabs change
  useEffect(() => {
    setUncontrolled(prev => resolveValidValue({ prev, tabValues }));
  }, [tabValues.join('|')]);

  const currentValue = resolveActiveValue({ controlledValue, uncontrolledValue: uncontrolled });

  const select = useCallback(
    (val: string) => {
      if (disabled) return;
      if (controlledValue === undefined) setUncontrolled(val);
      onValueChange?.(val);
    },
    [controlledValue, disabled, onValueChange]
  );

  // Indicator shared values (declared early so registerTabLayout can reference)
  const indicatorX = useSharedValue(0);
  const indicatorSize = useSharedValue(0);

  // Layout registry for animated indicator
  const layoutsRef = useRef<Map<string, { x: number; y: number; width: number; height: number }>>(
    new Map()
  );
  const prevValueRef = useRef<string | undefined>(undefined);
  const initialisedRef = useRef(false);
  const registerTabLayout = useCallback(
    (value: string, layout: { x: number; y: number; width: number; height: number }) => {
      layoutsRef.current.set(value, layout);
      const active = controlledValue !== undefined ? controlledValue : uncontrolled;
      if (!active) return;
      // Initial active tab: seed indicator & prevValue so first change animates
      if (!initialisedRef.current && value === active) {
        indicatorX.value = layout.x;
        indicatorSize.value = layout.width;
        prevValueRef.current = active;
        initialisedRef.current = true;
      }
    },
    [controlledValue, uncontrolled, indicatorX, indicatorSize]
  );
  const getTabLayout = useCallback((v: string) => layoutsRef.current.get(v), []);

  const contextValue = useMemo(
    () => ({
      value: currentValue,
      size,
      select,
      disabled,
      registerTabLayout,
      getTabLayout,
      indicatorXSV: indicatorX,
      indicatorSizeSV: indicatorSize,
    }),
    [
      currentValue,
      size,
      select,
      disabled,
      registerTabLayout,
      getTabLayout,
      tabValues,
      indicatorX,
      indicatorSize,
    ]
  );

  // Animate indicator only on value changes after initialisation
  useEffect(() => {
    if (!currentValue || !initialisedRef.current) return;
    if (prevValueRef.current === undefined || prevValueRef.current === currentValue) return;
    const layout = getTabLayout(currentValue);
    if (!layout) return;
    const cfg = { duration: 250, easing: Easing.out(Easing.ease) } as const;
    indicatorX.value = withTiming(layout.x, cfg);
    indicatorSize.value = withTiming(layout.width, cfg);
    prevValueRef.current = currentValue;
  }, [currentValue, getTabLayout, indicatorX, indicatorSize, tabValues.join('|')]);

  return (
    <TabsContext.Provider value={contextValue}>
      <View {...props}>{children}</View>
    </TabsContext.Provider>
  );
};

Tabs.displayName = 'Tabs';

export default Tabs;
