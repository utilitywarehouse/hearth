import type { ProgressBarInternalProps } from './ProgressBar.props';
import { ProgressBarLabel } from './ProgressBarLabel';
import { ProgressBarValueText } from './ProgressBarValueText';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const COMPONENT_NAME = 'ProgressBarCircular';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

declare module 'react' {
  interface CSSProperties {
    '--h-value'?: string;
  }
}

export const ProgressBarCircular = ({
  value,
  label,
  labelId,
  valueText,
  ...props
}: ProgressBarInternalProps) => {
  return (
    <div className={componentClassName} {...props} style={{ '--h-value': `${value}` }}>
      <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
        <circle className={`${componentClassName}Track`} />
        <circle className={`${componentClassName}Indicator`} />
      </svg>
      <div className={`${componentClassName}Content`}>
        <ProgressBarValueText>{valueText}</ProgressBarValueText>
        <ProgressBarLabel id={labelId}>{label}</ProgressBarLabel>
      </div>
    </div>
  );
};

ProgressBarCircular.displayName = COMPONENT_NAME;
