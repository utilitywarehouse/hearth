import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ProgressBarLabel } from './ProgressBarLabel';
import { ProgressBarValue } from './ProgressBarValue';
import { ProgressBarInternalProps } from './ProgressBar.props';

const COMPONENT_NAME = 'ProgressBarLinear';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressBarLinearElement = ElementRef<'div'>;

export const ProgressBarLinear = React.forwardRef<
  ProgressBarLinearElement,
  ProgressBarInternalProps
>(({ className, value, label, valueLabel, labelId, ...props }, ref) => {
  return (
    <div ref={ref} className={clsx(componentClassName, className)} {...props}>
      <ProgressBarLabel id={labelId}>{label}</ProgressBarLabel>
      <ProgressBarValue>{valueLabel}</ProgressBarValue>

      <div className={`${componentClassName}Track`}>
        <div className={`${componentClassName}Indicator`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
});

ProgressBarLinear.displayName = COMPONENT_NAME;
