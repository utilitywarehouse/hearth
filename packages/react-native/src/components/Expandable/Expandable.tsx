import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { ExpandableProps } from './Expandable.props';

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
  const height = useSharedValue(0);
  const open = useSharedValue(expanded);

  // Update open value when expanded prop changes and call callback
  useEffect(() => {
    if (open.value !== expanded) {
      open.value = expanded;
      onExpandedChange?.(expanded);
    }
  }, [expanded, onExpandedChange, open]);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(open.value), {
      duration,
    })
  );

  const derivedOpacity = useDerivedValue(() =>
    animateOpacity
      ? withTiming(Number(open.value), {
          duration,
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
