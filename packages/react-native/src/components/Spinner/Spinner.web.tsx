/* eslint-disable react-hooks/exhaustive-deps */
import { createSpinner } from '@gluestack-ui/spinner';
import React, { useCallback, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Circle, G, Svg } from 'react-native-svg';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { ColorValue } from '../../types';
import { getFlattenedColorValue } from '../../utils';
import type SpinnerProps from './Spinner.props';

// @ts-expect-error - Animated.View type issue
const AnimatedSvg = Animated.createAnimatedComponent(Svg as React.ComponentType<any>);
// @ts-expect-error - Animated.View type issue
const AnimatedCircle = Animated.createAnimatedComponent(Circle as React.ComponentType<any>);

const SpinnerRoot = ({ size = 'md', color, ...props }: SpinnerProps) => {
  const { components } = useTheme();
  const width = components.spinner[size].size;
  const CIRCUMFERENCE = (width - 4) * Math.PI;
  const R = CIRCUMFERENCE / (2 * Math.PI);
  const STROKE_WIDTH = components.spinner[size].strokeWidth;
  const HALF_CIRCLE = R + STROKE_WIDTH;
  const DIAMETER = 2 * HALF_CIRCLE;
  const isReducedMotion = useReducedMotion();

  const progress = useSharedValue(1);
  const rotation = useSharedValue(0);

  const startAnimation = useCallback(() => {
    if (isReducedMotion) {
      progress.value = withTiming(0.75, { duration: 0 });

      return;
    }

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
    } as any;
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
    padding: theme.components.spinner.padding,
    variants: {
      size: {
        xs: {
          width: theme.components.spinner.xs.size + theme.components.spinner.padding * 2,
          height: theme.components.spinner.xs.size + theme.components.spinner.padding * 2,
        },
        sm: {
          width: theme.components.spinner.sm.size + theme.components.spinner.padding * 2,
          height: theme.components.spinner.sm.size + theme.components.spinner.padding * 2,
        },
        md: {
          width: theme.components.spinner.md.size + theme.components.spinner.padding * 2,
          height: theme.components.spinner.md.size + theme.components.spinner.padding * 2,
        },
        lg: {
          width: theme.components.spinner.lg.size + theme.components.spinner.padding * 2,
          height: theme.components.spinner.lg.size + theme.components.spinner.padding * 2,
        },
      },
    },
  },
}));

const Spinner = createSpinner({ Root: SpinnerRoot });

export default Spinner;
