import * as React from 'react';
import type { ElementRef } from 'react';

import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ProgressStepProps } from './ProgressStep.props';
import { ProgressStepContext } from './ProgressStep.context';
import './ProgressStep.css';

const COMPONENT_NAME = 'ProgressStep';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressStepElement = ElementRef<'li'>;

export const ProgressStep = React.forwardRef<ProgressStepElement, ProgressStepProps>(
  ({ status, children, ...props }, ref) => {
    const isCompleted = status === 'complete';
    const isActive = status === 'active';

    return (
      <li
        ref={ref}
        className={componentClassName}
        aria-current={isActive ? 'step' : undefined}
        {...props}
      >
        <div className={`${componentClassName}Row`}>
          <span
            className={`${componentClassName}Indicator`}
            data-status={status}
            aria-hidden="true"
          >
            {isCompleted ? <TickSmallIcon /> : null}
          </span>
          <div
            className={`${componentClassName}Connector`}
            data-status={status}
            aria-hidden="true"
          />
        </div>
        <ProgressStepContext.Provider value={{ status }}>
          <div className={`${componentClassName}Label`}>
            {children}
          </div>
        </ProgressStepContext.Provider>
      </li>
    );
  }
);

ProgressStep.displayName = COMPONENT_NAME;
