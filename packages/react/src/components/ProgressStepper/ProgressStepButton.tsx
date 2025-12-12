'use client';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import clsx from 'clsx';
import type { ProgressStepButtonProps } from './ProgressStep.props';
import { ProgressStep } from './ProgressStep';

const COMPONENT_NAME = 'ProgressStepButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressStepButton = ({
  children,
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
      className={clsx(componentClassName, className)}
      aria-label={ariaLabel}
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
