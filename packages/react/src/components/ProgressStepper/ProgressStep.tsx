'use client';

import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ProgressStepProps } from './ProgressStep.props';
import clsx from 'clsx';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'ProgressStep';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressStep = ({
  status,
  children,
  className,
  'aria-label': ariaLabel,
  ...props
}: ProgressStepProps) => {
  const isStatus = (currentStatus: typeof status) => currentStatus === status;

  const ariaLabelText = [
    typeof children === 'string' ? children : undefined,
    `${status} step`,
    ariaLabel,
  ]
    .filter(t => t)
    .join(', ');

  return (
    <li
      className={clsx(componentClassName, className)}
      aria-current={isStatus('active') ? 'step' : undefined}
      aria-label={ariaLabelText}
      aria-live="polite"
      {...props}
    >
      <div className={`${componentClassName}Row`}>
        <span className={`${componentClassName}Indicator`} data-status={status} aria-hidden="true">
          {isStatus('complete') ? <TickSmallIcon /> : null}
        </span>
        <div className={`${componentClassName}Connector`} data-status={status} aria-hidden="true" />
      </div>

      <BodyText
        as="div"
        size="md"
        className={`${componentClassName}Label`}
        // we use this to avoid layout shift when transitioning to semibold text
        data-content={typeof children === 'string' ? children : null}
      >
        {children}
      </BodyText>
    </li>
  );
};

ProgressStep.displayName = COMPONENT_NAME;
