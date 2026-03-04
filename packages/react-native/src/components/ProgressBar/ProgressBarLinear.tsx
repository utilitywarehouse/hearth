import { useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, Platform, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import useTheme from '../../hooks/useTheme';
import { BodyText } from '../BodyText';
import type { ProgressBarInternalProps } from './ProgressBar.props';

const ProgressBarLinear = ({
  percent,
  label,
  valueText,
  hideLabel,
  colorScheme,
}: ProgressBarInternalProps) => {
  const { components } = useTheme();
  const isReducedMotion = useReducedMotion();
  const progress = useSharedValue(0);
  const hasMountedRef = useRef(false);
  const [trackWidth, setTrackWidth] = useState(0);

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

  const animatedStyle = useAnimatedStyle(() => ({
    width: trackWidth * progress.value,
  }));

  const indicatorColor =
    colorScheme === 'success'
      ? components.progressBar.progress.successColor
      : colorScheme === 'danger'
        ? components.progressBar.progress.dangerColor
        : components.progressBar.progress.defaultColor;

  const handleTrackLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={styles.container}>
      {!hideLabel && (
        <View style={styles.header}>
          <BodyText size="md" weight="semibold" style={styles.label}>
            {label}
          </BodyText>
          <BodyText size="md" style={styles.value}>
            {valueText}
          </BodyText>
        </View>
      )}
      <View style={styles.track} onLayout={handleTrackLayout}>
        {Platform.OS === 'web' ? (
          <View
            style={[
              styles.indicator,
              { width: `${Math.max(0, Math.min(100, percent))}%` },
              { backgroundColor: indicatorColor },
            ]}
          />
        ) : (
          <Animated.View
            style={[styles.indicator, animatedStyle, { backgroundColor: indicatorColor }]}
          />
        )}
      </View>
    </View>
  );
};

ProgressBarLinear.displayName = 'ProgressBarLinear';

const styles = StyleSheet.create(theme => ({
  container: {
    width: '100%',
    gap: theme.components.progressBar.linear.gap,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.components.progressBar.linear.label.gap,
  },
  label: {
    flex: 1,
  },
  value: {
    flexShrink: 0,
    textAlign: 'right',
  },
  track: {
    width: '100%',
    height: theme.components.progressBar.linear.bar.height,
    backgroundColor: theme.components.progressBar.barColor,
    borderRadius: theme.components.progressBar.linear.bar.borderRadius,
    overflow: 'hidden',
  },
  indicator: {
    height: '100%',
    borderRadius: theme.components.progressBar.linear.bar.borderRadius,
    _web: {
      height: '100%',
    },
  },
}));

export default ProgressBarLinear;
