import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';

import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import { BodyText } from '../BodyText/BodyText';
import type { ProgressStepProps } from './ProgressStep.props';
import { ProgressStepperContext } from './ProgressStepper.context';

const COMPONENT_NAME = 'ProgressStep';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressStepElement = ElementRef<'li'>;

export const ProgressStep = React.forwardRef<ProgressStepElement, ProgressStepProps>(
  ({ className, status, label, href, ...props }, ref) => {
    const { hideLabels, interactive } = React.useContext(ProgressStepperContext);
    const isCompleted = status === 'complete';
    const isActive = status === 'active';
    const isInteractive = interactive && isCompleted && href;

    const labelText = <BodyText className={`${componentClassName}Label`}>{label}</BodyText>;

    return (
      <li
        ref={ref}
        className={clsx(componentClassName, className)}
        data-status={status}
        aria-current={isActive ? 'step' : undefined}
        aria-label={`${label}, ${status}`}
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
        <div
          className={`${componentClassName}LabelWrapper`}
          data-visually-hidden={hideLabels ? '' : undefined}
        >
          {isInteractive ? (
            <Link href={href} {...props}>
              {labelText}
            </Link>
          ) : (
            labelText
          )}
        </div>
      </li>
    );
  }
);

ProgressStep.displayName = COMPONENT_NAME;
