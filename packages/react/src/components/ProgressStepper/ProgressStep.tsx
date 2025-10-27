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
  ({ className, state, label, href, stepIndex = 1, ...props }, ref) => {
    const { showLabels, interactive } = React.useContext(ProgressStepperContext);
    const isCompleted = state === 'complete';
    const isActive = state === 'active';
    const isInteractive = interactive && isCompleted && href;

    const labelText = <BodyText className={`${componentClassName}__label`}>{label}</BodyText>;

    return (
      <li
        ref={ref}
        className={clsx(componentClassName, className)}
        data-state={state}
        aria-current={isActive ? 'step' : undefined}
      >
        <div className={`${componentClassName}__row`}>
          <span
            className={`${componentClassName}__indicator`}
            data-state={state}
            aria-hidden="true"
          >
            {isCompleted ? (
              <TickSmallIcon />
            ) : (
              <BodyText weight="semibold" className={`${componentClassName}__indicator-number`}>
                {stepIndex}
              </BodyText>
            )}
          </span>
          <div
            className={`${componentClassName}__connector`}
            data-state={state}
            aria-hidden="true"
          />
        </div>
        {showLabels && (
          <div className={`${componentClassName}__label-wrapper`}>
            {isInteractive ? (
              <Link href={href} {...props} className={`${componentClassName}__link`}>
                {labelText}
              </Link>
            ) : (
              labelText
            )}
          </div>
        )}
      </li>
    );
  }
);

ProgressStep.displayName = COMPONENT_NAME;
