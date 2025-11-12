import * as React from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ProgressBarLabel } from './ProgressBarLabel';
import { ProgressBarValueText } from './ProgressBarValueText';
import { ProgressBarInternalProps } from './ProgressBar.props';

const COMPONENT_NAME = 'ProgressBarLinear';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressBarLinearElement = ElementRef<'div'>;

export const ProgressBarLinear = React.forwardRef<
  ProgressBarLinearElement,
  ProgressBarInternalProps
>(({ value, label, valueText, labelId, hideLabel, ...props }, ref) => {
  return (
    <div ref={ref} className={componentClassName} {...props}>
      <ProgressBarLabel id={labelId} data-visually-hidden={hideLabel ? '' : undefined}>
        {label}
      </ProgressBarLabel>
      <ProgressBarValueText data-visually-hidden={hideLabel ? '' : undefined}>
        {valueText}
      </ProgressBarValueText>

      <div className={`${componentClassName}Track`}>
        <div className={`${componentClassName}Indicator`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
});

ProgressBarLinear.displayName = COMPONENT_NAME;
