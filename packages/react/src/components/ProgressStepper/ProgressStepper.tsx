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
  const { className, children, showLabels = true, interactive = false, ...progressStepperProps } =
    extractProps(props, marginPropDefs);

  // Add step indices to children
  const childrenWithIndices = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { stepIndex: index + 1 });
    }
    return child;
  });

  return (
    <nav
      aria-label="progress"
      className={clsx(componentClassName, className)}
      data-show-labels={showLabels ? '' : undefined}
      {...progressStepperProps}
    >
      <ol role="list">
        <ProgressStepperContext.Provider value={{ showLabels, interactive }}>
          {childrenWithIndices}
        </ProgressStepperContext.Provider>
      </ol>
    </nav>
  );
};

ProgressStepper.displayName = COMPONENT_NAME;
