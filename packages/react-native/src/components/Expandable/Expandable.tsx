import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { useReducedMotionEnabled } from '../../hooks/useReducedMotionEnabled';
import { ExpandableProps } from './Expandable.props';

/**
 * Use Expandable to show or hide content with a smooth height and opacity animation. It's a
 * primitive building block for accordions, collapsible sections, and other expand/collapse
 * interactions.
 */
const Expandable = ({
  expanded = false,
  onExpandedChange,
  children,
  duration = 200,
  style,
  accessibilityLabel,
  testID,
  animateOpacity = true,
  ...props
}: ExpandableProps) => {
  const isReducedMotion = useReducedMotionEnabled();
  const height = useSharedValue(0);
  const open = useSharedValue(expanded);

  // Update open value when expanded prop changes and call callback
  useEffect(() => {
    if (open.value !== expanded) {
      open.value = expanded;
      onExpandedChange?.(expanded);
    }
  }, [expanded, onExpandedChange, open]);

  // Under reduced motion, jump straight to the end state with no height or opacity tween.
  const derivedHeight = useDerivedValue(() => {
    const target = height.value * Number(open.value);
    return isReducedMotion ? target : withTiming(target, { duration });
  });

  const derivedOpacity = useDerivedValue(() => {
    if (!animateOpacity) return 1;
    const target = Number(open.value);
    return isReducedMotion ? target : withTiming(target, { duration });
  });

  const heightStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: derivedOpacity.value,
  }));

  return (
    <Animated.View
      style={[styles.container, heightStyle, style]}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="none"
      accessibilityState={{ expanded }}
      testID={testID}
      {...props}
    >
      <Animated.View style={opacityStyle}>
        <View
          onLayout={e => {
            height.value = e.nativeEvent.layout.height;
          }}
          style={styles.content}
        >
          {children}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

Expandable.displayName = 'Expandable';

const styles = StyleSheet.create(() => ({
  container: {
    overflow: 'hidden',
  },
  content: {
    position: 'absolute',
    width: '100%',
  },
}));

export default Expandable;
