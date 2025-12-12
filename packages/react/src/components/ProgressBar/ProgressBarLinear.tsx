import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ProgressBarLabel } from './ProgressBarLabel';
import { ProgressBarValueText } from './ProgressBarValueText';
import type { ProgressBarInternalProps } from './ProgressBar.props';

const COMPONENT_NAME = 'ProgressBarLinear';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressBarLinear = ({
  value,
  label,
  valueText,
  labelId,
  hideLabel,
  ...props
}: ProgressBarInternalProps) => {
  return (
    <div className={componentClassName} {...props}>
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
};

ProgressBarLinear.displayName = COMPONENT_NAME;
