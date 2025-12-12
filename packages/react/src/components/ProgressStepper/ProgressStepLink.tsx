'use client';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import clsx from 'clsx';
import type { ProgressStepLinkProps } from './ProgressStep.props';
import { ProgressStep } from './ProgressStep';

const COMPONENT_NAME = 'ProgressStepLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressStepLink = ({
  children,
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
      className={clsx(componentClassName, className)}
      aria-label={ariaLabel}
      label={label}
    >
      {isActive ? (
        children
      ) : (
        <Link {...props} href={disabled ? undefined : href} role="link" aria-disabled={disabled}>
          {children}
        </Link>
      )}
    </ProgressStep>
  );
};

ProgressStepLink.displayName = COMPONENT_NAME;
