import { ReactNode, useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { motion } from '../../tokens';

const duration = motion.duration['500'];
// `motion.ease.out` — cubic-bezier(0.19, 0.91, 0.38, 1)
const easing = Easing.bezier(0.19, 0.91, 0.38, 1);

/**
 * Animates its height to fit its content whenever the content changes size, so a step growing
 * into a form or shrinking to a summary slides rather than jumps. Content is clipped while the
 * height animates, so it's revealed as the card grows. Internal to `CardAccordion`.
 */
const CardAccordionAnimatedHeight = ({ children }: { children?: ReactNode }) => {
  const reducedMotion = useReducedMotion();
  const height = useSharedValue(0);
  // Until the first measurement the content sits in normal flow, so the initial render sizes
  // naturally without animating. After that it's absolutely positioned: on iOS/Android, Yoga caps
  // an in-flow child at its fixed-height parent's size, so content growing inside a 0-height
  // container would measure as 0 and never expand. An absolute child keeps its natural height.
  const [measured, setMeasured] = useState(false);

  const handleLayout = (event: LayoutChangeEvent) => {
    const next = event.nativeEvent.layout.height;
    if (!measured || reducedMotion) {
      height.value = next;
      if (!measured) setMeasured(true);
      return;
    }
    height.value = withTiming(next, { duration, easing });
  };

  const animatedStyle = useAnimatedStyle(() => ({ height: height.value }));

  // Unistyles styles aren't applied to Reanimated's `Animated.View` on web, so theme styles go on
  // plain `View`s and the animated views only get static or animated styles.
  return (
    <Animated.View style={[{ overflow: 'hidden' }, measured ? animatedStyle : undefined]}>
      <View onLayout={handleLayout} style={measured ? styles.measure : undefined}>
        {children != null && children !== false ? (
          <View style={styles.content}>{children}</View>
        ) : null}
      </View>
    </Animated.View>
  );
};

CardAccordionAnimatedHeight.displayName = 'CardAccordionAnimatedHeight';

const styles = StyleSheet.create(theme => ({
  measure: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  content: {
    paddingTop: theme.components.cardAccordion.item.gap,
    gap: theme.components.cardAccordion.item.gap,
  },
}));

export default CardAccordionAnimatedHeight;
