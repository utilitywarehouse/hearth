/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo } from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  Easing,
  withSequence,
  withRepeat,
} from 'react-native-reanimated';
import { Circle, G, Svg } from 'react-native-svg';
import type SpinnerProps from './Spinner.props';
import { createSpinner } from '@gluestack-ui/spinner';
import { StyleSheet } from 'react-native-unistyles';
import { View } from 'react-native';
import { useTheme } from '../../hooks';
import { getFlattenedColorValue } from '../../utils';
import { ColorValue } from '../../types';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SpinnerRoot: React.FC<SpinnerProps> = ({ size = 'md', color, ...props }) => {
  const { components } = useTheme();
  const width = components.spinner[size].size;
  const CIRCUMFERENCE = (width - 4) * Math.PI;
  const R = CIRCUMFERENCE / (2 * Math.PI);
  const STROKE_WIDTH = components.spinner[size].strokeWidth;
  const HALF_CIRCLE = R + STROKE_WIDTH;
  const DIAMETER = 2 * HALF_CIRCLE;

  const progress = useSharedValue(1);
  const rotation = useSharedValue(0);

  const startAnimation = useCallback(() => {
    progress.value = withRepeat(withTiming(0.6, { duration: 1000 }), -1, true);

    progress.value = withRepeat(
      withSequence(withTiming(0.7, { duration: 800 }), withTiming(0.1, { duration: 2000 })),
      -1,
      true
    );

    rotation.value = withRepeat(
      withTiming(360, { duration: 900, easing: Easing.linear }),
      -1,
      false
    );
  }, [progress, rotation]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
    };
  }, [progress]);

  const animatedSvgProps = useAnimatedProps(() => {
    return {
      rotation: rotation.value,
    };
  }, [progress]);

  const { color: themeColor, colorMode } = useTheme();
  const colorValue: ColorValue = useMemo(
    () => getFlattenedColorValue(color, themeColor),
    [color, colorMode, themeColor]
  );

  const defaultColor = colorValue || components.spinner.defaultFill;

  styles.useVariants({ size });

  return (
    <View
      {...props}
      style={[styles.container, props.style]}
      aria-busy
      aria-live="polite"
      role="status"
    >
      <AnimatedSvg
        width={width}
        height={width}
        viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}
        animatedProps={animatedSvgProps}
        color={defaultColor}
      >
        <G origin={`${HALF_CIRCLE}, ${HALF_CIRCLE}`} rotation={-90}>
          <AnimatedCircle
            fill="transparent"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            cx="50%"
            cy="50%"
            r={R}
            strokeLinecap="round"
            animatedProps={animatedCircleProps}
            strokeDasharray={CIRCUMFERENCE}
          />
        </G>
      </AnimatedSvg>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    variants: {
      size: {
        xs: {
          width: theme.components.spinner.xs.size,
          height: theme.components.spinner.xs.size,
        },
        sm: {
          width: theme.components.spinner.sm.size,
          height: theme.components.spinner.sm.size,
        },
        md: {
          width: theme.components.spinner.md.size,
          height: theme.components.spinner.md.size,
        },
        lg: {
          width: theme.components.spinner.lg.size,
          height: theme.components.spinner.lg.size,
        },
      },
    },
  },
}));

const Spinner = createSpinner({ Root: SpinnerRoot });

export default Spinner;
