'use client';

import * as React from 'react';
import type { ElementRef } from 'react';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import type { ProgressStepButtonProps } from './ProgressStepButton.props';
import { ProgressStepContent } from './ProgressStepContent';
import { ProgressStepContext } from './ProgressStep.context';

const COMPONENT_NAME = 'ProgressStepButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressStepButtonElement = ElementRef<'button'>;

export const ProgressStepButton = React.forwardRef<
  ProgressStepButtonElement,
  ProgressStepButtonProps
>(({ label, ...props }, ref) => {
  const stepContext = React.useContext(ProgressStepContext);

  const isInteractive = stepContext?.status === 'complete';

  // Render as non-interactive content if not complete
  if (!isInteractive) {
    return <ProgressStepContent label={label} />;
  }

  // Render as interactive button if complete
  return (
    <Link asChild>
      <button ref={ref} className={componentClassName} {...props}>
        {label}
      </button>
    </Link>
  );
});

ProgressStepButton.displayName = COMPONENT_NAME;
