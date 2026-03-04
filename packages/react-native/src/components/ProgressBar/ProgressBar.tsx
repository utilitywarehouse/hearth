import { View } from 'react-native';
import type ProgressBarProps from './ProgressBar.props';
import ProgressBarCircular from './ProgressBarCircular';
import ProgressBarLinear from './ProgressBarLinear';

const clampValue = (value: number, min: number, max: number) => {
  if (max <= min) return min;
  return Math.min(Math.max(value, min), max);
};

const valueToPercent = (value: number, min: number, max: number) => {
  const range = max - min;
  if (range <= 0) return 0;
  return ((value - min) / range) * 100;
};

const ProgressBar = ({
  variant = 'linear',
  colorScheme = 'default',
  size = 'md',
  value,
  min = 0,
  max = 100,
  label,
  hideLabel,
  formatValueText,
  'aria-valuetext': ariaValueText,
  accessibilityLabel,
  ...rest
}: ProgressBarProps) => {
  const effectiveValue =
    colorScheme === 'success' && !formatValueText ? max : clampValue(value, min, max);
  const percentValue = valueToPercent(effectiveValue, min, max);
  const clampedPercent = Math.max(0, Math.min(100, percentValue));
  const valueText = formatValueText
    ? formatValueText(effectiveValue, { min, max, percent: clampedPercent })
    : `${Math.round(clampedPercent)}%`;
  const valueTextForAria = ariaValueText ?? valueText;

  const internalProps = {
    percent: clampedPercent,
    label,
    valueText,
    hideLabel,
    colorScheme,
    size,
  };

  return (
    <View
      {...rest}
      accessible
      role="progressbar"
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityValue={{ min, max, now: effectiveValue, text: valueTextForAria }}
      aria-valuenow={effectiveValue}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuetext={valueTextForAria}
      data-colorscheme={colorScheme}
    >
      {variant === 'circular' ? (
        <ProgressBarCircular {...internalProps} />
      ) : (
        <ProgressBarLinear {...internalProps} />
      )}
    </View>
  );
};

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
