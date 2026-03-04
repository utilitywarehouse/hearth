import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Circle, G, Svg } from 'react-native-svg';
import { StyleSheet } from 'react-native-unistyles';
import useTheme from '../../hooks/useTheme';
import { BodyText } from '../BodyText';
import type { ProgressBarInternalProps } from './ProgressBar.props';

const AnimatedCircle = Animated.createAnimatedComponent(Circle as React.ComponentType<any>);

const ProgressBarCircular = ({
  percent,
  label,
  valueText,
  hideLabel,
  colorScheme,
  size,
}: ProgressBarInternalProps) => {
  const { components } = useTheme();
  const isReducedMotion = useReducedMotion();
  const progress = useSharedValue(0);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    const target = Math.max(0, Math.min(100, percent)) / 100;
    if (isReducedMotion) {
      progress.value = target;
      hasMountedRef.current = true;
      return;
    }

    if (!hasMountedRef.current) {
      progress.value = target;
      hasMountedRef.current = true;
      return;
    }

    progress.value = withTiming(target, { duration: 300, easing: Easing.out(Easing.ease) });
  }, [percent, isReducedMotion, progress]);

  const circularTokens = components.progressBar.circular[size];
  const barWidth = 'bar' in circularTokens ? circularTokens.bar.width : circularTokens.barWidth;
  const diameter = circularTokens.height;
  const radius = (diameter - barWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  const indicatorColor =
    colorScheme === 'success'
      ? components.progressBar.progress.successColor
      : colorScheme === 'danger'
        ? components.progressBar.progress.dangerColor
        : components.progressBar.progress.defaultColor;

  styles.useVariants({ size });

  return (
    <View style={styles.container}>
      <Svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
        style={styles.svg}
      >
        <G origin={`${diameter / 2}, ${diameter / 2}`} rotation={-90}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={components.progressBar.barColor}
            strokeWidth={barWidth}
            fill="transparent"
          />
          <AnimatedCircle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={indicatorColor}
            strokeWidth={barWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animatedProps={animatedCircleProps}
          />
        </G>
      </Svg>
      <View style={styles.content}>
        <Text style={styles.valueText}>{valueText}</Text>
        {!hideLabel && size === 'md' ? (
          <BodyText style={styles.label} size="md" weight="semibold">
            {label}
          </BodyText>
        ) : null}
      </View>
    </View>
  );
};

ProgressBarCircular.displayName = 'ProgressBarCircular';

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    variants: {
      size: {
        md: {
          width: theme.components.progressBar.circular.md.height,
          height: theme.components.progressBar.circular.md.height,
        },
        sm: {
          width: theme.components.progressBar.circular.sm.height,
          height: theme.components.progressBar.circular.sm.height,
        },
      },
    },
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    _web: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    variants: {
      size: {
        md: {
          gap: theme.components.progressBar.circular.md.gap,
        },
        sm: {
          gap: 0,
        },
      },
    },
  },
  valueText: {
    color: theme.color.text.primary,
    textAlign: 'center',
    variants: {
      size: {
        md: {
          fontFamily: theme.components.progressBar.circular.md.label.fontFamily,
          fontSize: theme.components.progressBar.circular.md.label.fontSize,
          lineHeight: theme.components.progressBar.circular.md.label.lineHeight,
          fontWeight: theme.components.progressBar.circular.md.label.fontWeight,
        },
        sm: {
          fontFamily: theme.typography.mobile.bodyText.fontFamily,
          fontSize: theme.typography.mobile.bodyText.md.fontSize,
          lineHeight: theme.typography.mobile.bodyText.md.lineHeight,
          fontWeight: theme.fontWeight.semibold,
        },
      },
    },
  },
  label: {
    textAlign: 'center',
    maxWidth: 90,
  },
}));

export default ProgressBarCircular;
