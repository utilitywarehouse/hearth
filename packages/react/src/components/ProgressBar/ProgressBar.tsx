import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { ProgressBarProps, progressBarPropDefs } from './ProgressBar.props';
import { ProgressBarLinear } from './ProgressBarLinear';
import { valueToPercent } from '../../helpers/value-to-percent';
import { useIds } from '../../hooks/use-ids';
import { ProgressBarCircular } from './ProgressBarCircular';

const COMPONENT_NAME = 'ProgressBar';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressBarElement = ElementRef<'div'>;

export const ProgressBar = React.forwardRef<ProgressBarElement, ProgressBarProps>((props, ref) => {
  const {
    className,
    variant = 'linear',
    colorScheme = 'default',
    value,
    min = 0,
    max = 100,
    label,
    formatValue,
    hideLabel,
    ...progressBarProps
  } = extractProps(props, progressBarPropDefs, marginPropDefs);

  const { labelId } = useIds({ prefix: 'progress' });

  // Clamp value between min and max; success should only ever reflect a complete state
  const clampedValue = colorScheme === 'success' ? max : Math.min(Math.max(value, min), max);

  const defaultValueText = `${valueToPercent(clampedValue, min, max)}%`;
  const valueText = formatValue ? formatValue(clampedValue) : defaultValueText;

  const internalProgressBarProps = {
    value: clampedValue,
    label,
    valueText,
    labelId,
    hideLabel,
  };

  const dataAttributeProps = { 'data-colorscheme': colorScheme };

  return (
    <div
      ref={ref}
      className={clsx(componentClassName, className)}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={valueText}
      aria-labelledby={labelId}
      {...dataAttributeProps}
      {...progressBarProps}
    >
      {variant === 'linear' ? <ProgressBarLinear {...internalProgressBarProps} /> : null}
      {variant === 'circular' ? <ProgressBarCircular {...internalProgressBarProps} /> : null}
    </div>
  );
});

ProgressBar.displayName = COMPONENT_NAME;
