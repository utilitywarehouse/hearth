import * as React from 'react';
import type { ElementRef } from 'react';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import { ProgressStepperContext } from './ProgressStepper.context';
import type { ProgressStepButtonProps } from './ProgressStepButton.props';
import { ProgressStepContent } from './ProgressStepContent';
import { ProgressStepContext } from './ProgressStep.context';
import './ProgressStepButton.css';

const COMPONENT_NAME = 'ProgressStepButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressStepButtonElement = ElementRef<'button'>;

export const ProgressStepButton = React.forwardRef<
  ProgressStepButtonElement,
  ProgressStepButtonProps
>(({ label, ...props }, ref) => {
  const { hideLabels } = React.useContext(ProgressStepperContext);
  const stepContext = React.useContext(ProgressStepContext);

  const isInteractive = stepContext?.status === 'complete';

  // Render as non-interactive content if not complete
  if (!isInteractive) {
    return <ProgressStepContent label={label} />;
  }

  // Render as interactive button if complete
  return (
    <Link asChild>
      <button
        ref={ref}
        className={componentClassName}
        data-visually-hidden={hideLabels ? '' : undefined}
        {...props}
      >
        {label}
      </button>
    </Link>
  );
});

ProgressStepButton.displayName = COMPONENT_NAME;
