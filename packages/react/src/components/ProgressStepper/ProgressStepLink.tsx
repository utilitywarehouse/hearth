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
  className,
  status,
  ...props
}: ProgressStepLinkProps) => {
  const isComplete = status === 'complete';

  return (
    <ProgressStep status={status} className={clsx(componentClassName, className)}>
      {isComplete ? <Link {...props}>{children}</Link> : children}
    </ProgressStep>
  );
};

ProgressStepLink.displayName = COMPONENT_NAME;
