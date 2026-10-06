import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Platform, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
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
  const reducedMotion = useReducedMotion();
  const animationDuration = reducedMotion ? 0 : duration;
  const height = useSharedValue(0);
  const open = useSharedValue(expanded);
  // Collapsed content stays mounted (at height 0) so it can be measured and animated, so it
  // must be explicitly hidden from assistive tech once the collapse animation has finished.
  const [hidden, setHidden] = useState(!expanded);
  const contentRef = useRef<View>(null);

  // Update open value when expanded prop changes and call callback
  useEffect(() => {
    if (open.value !== expanded) {
      open.value = expanded;
      onExpandedChange?.(expanded);
    }
  }, [expanded, onExpandedChange, open]);

  useEffect(() => {
    if (expanded) {
      setHidden(false);
      return;
    }
    const timeout = setTimeout(() => setHidden(true), animationDuration);
    return () => clearTimeout(timeout);
  }, [expanded, animationDuration]);

  // `aria-hidden` doesn't stop keyboard focus on web, so collapsed content is also made `inert`.
  // react-native-web doesn't forward `inert`, so it is set on the DOM node directly, in a layout
  // effect so it lands in the same commit as `aria-hidden`.
  useLayoutEffect(() => {
    if (Platform.OS !== 'web') return;
    const node = contentRef.current as unknown as { inert?: boolean } | null;
    if (node) node.inert = hidden;
  }, [hidden]);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(open.value), {
      duration: animationDuration,
    })
  );

  const derivedOpacity = useDerivedValue(() =>
    animateOpacity
      ? withTiming(Number(open.value), {
          duration: animationDuration,
        })
      : 1
  );

  const heightStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: derivedOpacity.value,
  }));

  return (
    <Animated.View
      style={[styles.container, heightStyle, style]}
      // Not `accessible`: grouping would make interactive children (links, buttons, inputs)
      // unreachable individually by VoiceOver/TalkBack. On native a label cannot name a
      // non-accessible container, so the labelled region is web-only.
      accessibilityLabel={accessibilityLabel}
      accessibilityElementsHidden={hidden}
      importantForAccessibility={hidden ? 'no-hide-descendants' : 'auto'}
      {...(Platform.OS === 'web'
        ? ({
            role: accessibilityLabel ? 'region' : undefined,
            'aria-hidden': hidden || undefined,
          } as any)
        : null)}
      testID={testID}
      {...props}
    >
      <Animated.View style={opacityStyle}>
        <View
          ref={contentRef}
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
