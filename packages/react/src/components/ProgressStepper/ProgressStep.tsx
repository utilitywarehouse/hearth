'use client';

import * as React from 'react';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ProgressStepProps } from './ProgressStep.props';
import { ProgressStepperContext } from './ProgressStepper.context';
import clsx from 'clsx';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'ProgressStep';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressStep = ({ status, children, className, ...props }: ProgressStepProps) => {
  const { hideLabels } = React.useContext(ProgressStepperContext);
  const isComplete = status === 'complete';
  const isActive = status === 'active';

  return (
    <li
      className={clsx(componentClassName, className)}
      aria-current={isActive ? 'step' : undefined}
      {...props}
    >
      <div className={`${componentClassName}Row`}>
        <span className={`${componentClassName}Indicator`} data-status={status} aria-hidden="true">
          {isComplete ? <TickSmallIcon /> : null}
        </span>
        <div className={`${componentClassName}Connector`} data-status={status} aria-hidden="true" />
      </div>

      <BodyText
        as="span"
        size="md"
        className={`${componentClassName}Label`}
        data-visually-hidden={hideLabels ? '' : undefined}
      >
        {children}
      </BodyText>
    </li>
  );
};

ProgressStep.displayName = COMPONENT_NAME;
