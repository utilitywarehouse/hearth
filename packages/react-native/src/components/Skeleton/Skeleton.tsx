import React, { useMemo } from 'react';
import { AnimatableNumericValue } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import type { ColorValue } from '../../types';
import { getFlattenedColorValue } from '../../utils';
import getStyleValue from '../../utils/getStyleValue';
import type SkeletonProps from './Skeleton.props';

const Skeleton = ({
  width,
  height,
  backgroundColor: bg,
  borderRadius,
  style,
  ...props
}: SkeletonProps) => {
  const opacity = useSharedValue(1);

  const { components } = useTheme();

  const backgroundColor = bg ?? components.skeleton.loadingColor;

  const { color: themeColor, colorMode, borderRadius: themeBorderRadius } = useTheme();
  const backgroundColorValue: ColorValue = useMemo(
    () => getFlattenedColorValue(backgroundColor, themeColor),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [backgroundColor, colorMode]
  );

  const borderRadiusValue: AnimatableNumericValue = useMemo(
    () => getStyleValue(borderRadius, themeBorderRadius),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
