import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ProgressBarLinearProps } from './ProgressBarLinear.props';
import { ProgressBarLabel } from './ProgressBarLabel';
import { ProgressBarValue } from './ProgressBarValue';

const COMPONENT_NAME = 'ProgressBarLinear';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressBarLinearElement = ElementRef<'div'>;

export const ProgressBarLinear = React.forwardRef<ProgressBarLinearElement, ProgressBarLinearProps>(
  (
    { className, colorScheme = 'default', value, min = 0, max = 100, label, valueLabel, ...props },
    ref
  ) => {
    // Clamp value between min and max; success should only ever reflect a complete state
    const clampedValue = colorScheme === 'success' ? max : Math.min(Math.max(value, min), max);

    const dataAttributeProps = {
      'data-colorscheme': colorScheme,
    };

    return (
      <div
        ref={ref}
        className={clsx(componentClassName, className)}
        {...dataAttributeProps}
        {...props}
      >
        <ProgressBarLabel>{label}</ProgressBarLabel>
        <ProgressBarValue>{valueLabel}</ProgressBarValue>
        <div className={`${componentClassName}Indicator`}>
          <div className={`${componentClassName}IndicatorBar`}>
            <div
              className={`${componentClassName}IndicatorFill`}
              style={{ width: `${clampedValue}%` }}
            />
          </div>
        </div>
      </div>
    );
  }
);

ProgressBarLinear.displayName = COMPONENT_NAME;
