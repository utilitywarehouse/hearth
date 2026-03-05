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
import { forwardRef } from 'react';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'ProgressBar';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressBarElement = ComponentRef<'div'>;

export const ProgressBar = forwardRef<ProgressBarElement, ProgressBarProps>((props, ref) => {
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

  // Determine the logical value based on status
  // If 'success', we force 100% (max); otherwise, we clamp the actual value.
  const effectiveValue = colorScheme === 'success' ? max : Math.max(min, Math.min(value, max));
  // Get the whole number percentage
  const percentValue = valueToPercent(effectiveValue, min, max);
  // Determine the text display
  const valueText = formatValueText ? formatValueText(effectiveValue) : `${percentValue}%`;

  const internalProgressBarProps = {
    value: percentValue,
    label,
    valueText,
    labelId,
    hideLabel,
  };

  return (
    <div
      ref={ref}
      className={cn(componentClassName, className)}
      role="progressbar"
      aria-valuenow={effectiveValue}
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
});

ProgressBar.displayName = COMPONENT_NAME;
