'use client';

import * as React from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import { ProgressStepContent } from './ProgressStepContent';
import { ProgressStepContext } from './ProgressStep.context';
import clsx from 'clsx';

const COMPONENT_NAME = 'ProgressStepLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressStepLink = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithRef<'a'>) => {
  const stepContext = React.useContext(ProgressStepContext);

  const isInteractive = stepContext?.status === 'complete';

  // Render as non-interactive content if not complete
  if (!isInteractive) {
    return <ProgressStepContent className={className}>{children}</ProgressStepContent>;
  }

  // Render as interactive link if complete
  return (
    <Link className={clsx(componentClassName, className)} {...props}>
      {children}
    </Link>
  );
};

ProgressStepLink.displayName = COMPONENT_NAME;
