'use client';

import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ProgressStepProps } from './ProgressStep.props';
import { cn } from '../../helpers/cn';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'ProgressStep';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressStep = ({
  status,
  label,
  className,
  children,
  'aria-label': ariaLabel,
  ...props
}: ProgressStepProps) => {
  const isStatus = (currentStatus: typeof status) => currentStatus === status;

  const ariaLabelText = [label, `${status} step`, ariaLabel].filter(t => t).join(', ');

  return (
    <li
      className={cn(componentClassName, className)}
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
        data-content={label}
      >
        {children || label}
      </BodyText>
    </li>
  );
};

ProgressStep.displayName = COMPONENT_NAME;
