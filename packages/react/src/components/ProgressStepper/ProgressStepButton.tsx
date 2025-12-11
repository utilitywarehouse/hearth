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
  ...props
}: ProgressStepButtonProps) => {
  const isComplete = status === 'complete';

  return (
    <ProgressStep status={status} className={clsx(componentClassName, className)}>
      {isComplete ? (
        <Link asChild>
          <button className={clsx(componentClassName, className)} {...props}>
            {children}
          </button>
        </Link>
      ) : (
        children
      )}
    </ProgressStep>
  );
};

ProgressStepButton.displayName = COMPONENT_NAME;
