import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { ProgressBarProps } from './ProgressBar.props';
import { ProgressBarLinear } from './ProgressBarLinear';
import { ProgressBarCircular } from '../ProgressBarCircular/ProgressBarCircular';
import { valueToPercent } from '../../helpers/value-to-percent';

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
    ...progressBarProps
  } = extractProps(props, marginPropDefs);

  // Clamp value between min and max; success should only ever reflect a complete state
  const clampedValue = colorScheme === 'success' ? max : Math.min(Math.max(value, min), max);

  const dataAttributeProps = {
    'data-colorscheme': colorScheme,
  };

  const defaultValueLabel = `${valueToPercent(value, min, max)}%`;
  const valueLabel = formatValue ? formatValue(value) : defaultValueLabel;

  return (
    <div
      ref={ref}
      className={clsx(componentClassName, className)}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      {...dataAttributeProps}
      {...progressBarProps}
    >
      {variant === 'linear' ? (
        <ProgressBarLinear value={value} label={label} valueLabel={valueLabel} />
      ) : (
        <ProgressBarCircular value={value} />
      )}
    </div>
  );
});

ProgressBar.displayName = COMPONENT_NAME;
