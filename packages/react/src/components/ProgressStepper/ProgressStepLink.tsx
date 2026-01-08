'use client';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import { cn } from '../../helpers/cn';
import type { ProgressStepLinkProps } from './ProgressStep.props';
import { ProgressStep } from './ProgressStep';

const COMPONENT_NAME = 'ProgressStepLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressStepLink = ({
  label,
  className,
  status,
  disabled,
  href,
  'aria-label': ariaLabel,
  ...props
}: ProgressStepLinkProps) => {
  const isActive = status === 'active';

  return (
    <ProgressStep
      status={status}
      className={cn(componentClassName, className)}
      aria-label={ariaLabel}
      label={label}
    >
      {isActive ? (
        label
      ) : (
        <Link {...props} href={disabled ? undefined : href} role="link" aria-disabled={disabled}>
          {label}
        </Link>
      )}
    </ProgressStep>
  );
};

ProgressStepLink.displayName = COMPONENT_NAME;
