import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

import { CarouselItemProps } from './Carousel.props';

export const CarouselItem = ({
  active,
  children,
  inactiveOpacity = 1,
  style,
  width,
  ...props
}: CarouselItemProps) => {
  const isWeb = Platform.OS === 'web';
  const isReducedMotion = useReducedMotion();
  const opacity = useSharedValue<number>(inactiveOpacity);

  const animatedStyles = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
      width,
    }),
    [opacity, width]
  );

  useEffect(() => {
    const target = active ? 1 : inactiveOpacity;
    opacity.value = isReducedMotion ? target : withTiming(target, { duration: 200 });
  }, [active, inactiveOpacity, opacity, isReducedMotion]);

  // For web, use a regular View with CSS transitions
  if (isWeb) {
    return (
      <View
        style={[
          styles.container,
          style,
          {
            opacity: active ? 1 : inactiveOpacity,
            width,
          },
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }

  // For native, use Animated.View with reanimated
  return (
    <Animated.View style={[styles.container, style as false, animatedStyles]} {...props}>
      {children}
    </Animated.View>
  );
};

CarouselItem.displayName = 'CarouselItem';

const styles = StyleSheet.create(() => ({
  container: {
    _web: {
      transition: 'opacity 200ms ease-in-out',
    },
  },
}));

export default CarouselItem;
