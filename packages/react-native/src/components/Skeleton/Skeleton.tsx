import React, { useMemo } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import type SkeletonProps from './Skeleton.props';
import { AnimatableNumericValue, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { ColorValue } from '../../types';
import getStyleValue from '../../utils/getStyleValue';
import { useTheme } from '../../hooks';
import { getFlattenedColorValue } from '../../utils';

const Skeleton = ({
  width,
  height,
  backgroundColor,
  borderRadius,
  style,
  ...props
}: SkeletonProps) => {
  const opacity = useSharedValue(1);

  const { color: themeColor, colorMode, borderRadius: themeBorderRadius } = useTheme();
  const backgroundColorValue: ColorValue = useMemo(
    () => getFlattenedColorValue(backgroundColor, themeColor),
    [backgroundColor, colorMode]
  );

  const borderRadiusValue: AnimatableNumericValue = useMemo(
    () => getStyleValue(borderRadius, themeBorderRadius),
    [borderRadius]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      width,
      height,
      ...(backgroundColorValue ? { backgroundColor: backgroundColorValue } : {}),
      ...(borderRadiusValue ? { borderRadius: borderRadiusValue } : {}),
    };
  }, [opacity]);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.5, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [opacity]);

  return <Animated.View {...props} style={[styles.skeleton, style, animatedStyle]} />;
};

Skeleton.displayName = 'Skeleton';

const styles = StyleSheet.create(theme => ({
  skeleton: {
    backgroundColor: theme.components.skeleton.loadingColor,
    borderRadius: theme.borderRadius.xs,
  },
}));

export default Skeleton;
