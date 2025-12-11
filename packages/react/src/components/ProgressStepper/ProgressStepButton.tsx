'use client';

import * as React from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import { ProgressStepContent } from './ProgressStepContent';
import { ProgressStepContext } from './ProgressStep.context';
import clsx from 'clsx';

const COMPONENT_NAME = 'ProgressStepButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ProgressStepButton = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithRef<'button'>) => {
  const stepContext = React.useContext(ProgressStepContext);

  const isInteractive = stepContext?.status === 'complete';

  // Render as non-interactive content if not complete
  if (!isInteractive) {
    return <ProgressStepContent className={className}>{children}</ProgressStepContent>;
  }

  // Render as interactive button if complete
  return (
    <Link asChild>
      <button className={clsx(componentClassName, className)} {...props}>
        {children}
      </button>
    </Link>
  );
};

ProgressStepButton.displayName = COMPONENT_NAME;
