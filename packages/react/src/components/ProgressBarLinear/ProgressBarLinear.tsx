import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { ProgressBarLinearProps } from './ProgressBarLinear.props';
import './ProgressBarLinear.css';

const COMPONENT_NAME = 'ProgressBarLinear';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressBarLinearElement = ElementRef<'div'>;

export const ProgressBarLinear = React.forwardRef<
  ProgressBarLinearElement,
  ProgressBarLinearProps
>((props, ref) => {
  const {
    className,
    children,
    type = 'default',
    value,
    'aria-label': ariaLabel,
    ...restProps
  } = extractProps(
    props,
    marginPropDefs
  );

  // Override value to 100 for success type (always show full bar)
  const effectiveValue = type === 'success' ? 100 : value;

  // Clamp value between 0 and 100
  const clampedValue = Math.min(Math.max(effectiveValue, 0), 100);

  return (
    <div
      ref={ref}
      className={clsx(componentClassName, className)}
      data-type={type}
      role="group"
      aria-label={ariaLabel || 'Progress indicator'}
      {...restProps}
    >
      <div className={`${componentClassName}Content`}>{children}</div>
      <div className={`${componentClassName}Indicator`}>
        <div className={`${componentClassName}IndicatorBar`}>
          <div
            className={`${componentClassName}IndicatorFill`}
            style={{ width: `${clampedValue}%` }}
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${clampedValue}% complete`}
          />
        </div>
      </div>
    </div>
  );
});

ProgressBarLinear.displayName = COMPONENT_NAME;
