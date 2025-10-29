import * as React from 'react';
import clsx from 'clsx';
import type { ProgressStepperProps } from './ProgressStepper.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { ProgressStepperContext } from './ProgressStepper.context';
import './ProgressStepper.css';

const COMPONENT_NAME = 'ProgressStepper';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressStepper: React.FC<ProgressStepperProps> = props => {
  const {
    className,
    children,
    hideLabels = false,
    interactive = false,
    as: Tag = 'div',
    'aria-label': ariaLabel = 'progress',
    ...progressStepperProps
  } = extractProps(props, marginPropDefs);

  return (
    <Tag
      aria-label={ariaLabel}
      className={clsx(componentClassName, className)}
      {...progressStepperProps}
    >
      <ol role="list">
        <ProgressStepperContext.Provider value={{ hideLabels, interactive }}>
          {children}
        </ProgressStepperContext.Provider>
      </ol>
    </Tag>
  );
};

ProgressStepper.displayName = COMPONENT_NAME;
