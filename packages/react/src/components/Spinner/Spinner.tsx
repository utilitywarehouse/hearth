import clsx from 'clsx';
import { spinnerPropDefs } from './Spinner.props';
import type { SpinnerProps } from './Spinner.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'Spinner';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Spinner = ({ currentColor, ...props }: SpinnerProps) => {
  const { className, ...spinnerProps } = extractProps(props, spinnerPropDefs, marginPropDefs);
  return (
    <div
      className={clsx(componentClassName, className)}
      data-currentColor={currentColor ? '' : undefined}
      {...spinnerProps}
    >
      <svg xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" r="50%" />
      </svg>
    </div>
  );
};

Spinner.displayName = COMPONENT_NAME;
