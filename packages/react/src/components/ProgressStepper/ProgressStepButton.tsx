'use client';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import { cn } from '../../helpers/cn';
import type { ProgressStepButtonProps } from './ProgressStep.props';
import { ProgressStep } from './ProgressStep';

const COMPONENT_NAME = 'ProgressStepButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressStepButton = ({
  children,
  label,
  className,
  status,
  disabled,
  onClick,
  'aria-label': ariaLabel,
  ...props
}: ProgressStepButtonProps) => {
  const isActive = status === 'active';

  return (
    <ProgressStep
      status={status}
      className={cn(componentClassName, className)}
      aria-label={ariaLabel}
      label={label}
    >
      {isActive ? (
        children
      ) : (
        <Link asChild aria-disabled={disabled}>
          <button {...props} onClick={disabled ? undefined : onClick}>
            {children}
          </button>
        </Link>
      )}
    </ProgressStep>
  );
};

ProgressStepButton.displayName = COMPONENT_NAME;
