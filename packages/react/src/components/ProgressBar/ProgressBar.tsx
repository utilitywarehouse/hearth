'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { progressBarPropDefs } from './ProgressBar.props';
import type { ProgressBarProps } from './ProgressBar.props';
import { ProgressBarLinear } from './ProgressBarLinear';
import { valueToPercent } from '../../helpers/value-to-percent';
import { useIds } from '../../hooks/use-ids';
import { ProgressBarCircular } from './ProgressBarCircular';

const COMPONENT_NAME = 'ProgressBar';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressBar = (props: ProgressBarProps) => {
  const {
    className,
    variant = 'linear',
    colorScheme = 'default',
    value,
    min = 0,
    max = 100,
    label,
    formatValueText,
    'aria-valuetext': ariaValueText,
    hideLabel,
    ...progressBarProps
  } = extractProps(props, progressBarPropDefs, marginPropDefs);

  const { labelId } = useIds({ prefix: 'progress' });

  // Clamp value between min and max; success should only ever reflect a complete state
  const clampedValue = colorScheme === 'success' ? max : Math.min(Math.max(value, min), max);

  const percentValue = valueToPercent(clampedValue, min, max);
  const defaultValueText = `${percentValue}%`;
  const valueText = formatValueText ? formatValueText(clampedValue) : defaultValueText;

  const internalProgressBarProps = {
    value: percentValue,
    label,
    valueText,
    labelId,
    hideLabel,
  };

  return (
    <div
      className={cn(componentClassName, className)}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuetext={ariaValueText || valueText}
      aria-labelledby={labelId}
      data-colorscheme={colorScheme}
      {...progressBarProps}
    >
      {variant === 'linear' ? <ProgressBarLinear {...internalProgressBarProps} /> : null}
      {variant === 'circular' ? <ProgressBarCircular {...internalProgressBarProps} /> : null}
    </div>
  );
};

ProgressBar.displayName = COMPONENT_NAME;
