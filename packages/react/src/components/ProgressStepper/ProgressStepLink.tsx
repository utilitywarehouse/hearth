import * as React from 'react';
import type { ElementRef } from 'react';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import { ProgressStepperContext } from './ProgressStepper.context';
import type { ProgressStepLinkProps } from './ProgressStepLink.props';
import { ProgressStepContent } from './ProgressStepContent';
import { ProgressStepContext } from './ProgressStep.context';
import './ProgressStepLink.css';

const COMPONENT_NAME = 'ProgressStepLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressStepLinkElement = ElementRef<'a'>;

export const ProgressStepLink = React.forwardRef<ProgressStepLinkElement, ProgressStepLinkProps>(
  ({ label, ...props }, ref) => {
    const { hideLabels } = React.useContext(ProgressStepperContext);
    const stepContext = React.useContext(ProgressStepContext);

    const isInteractive = stepContext?.status === 'complete';

    // Render as non-interactive content if not complete
    if (!isInteractive) {
      return <ProgressStepContent label={label} />;
    }

    // Render as interactive link if complete
    return (
      <Link
        ref={ref}
        className={componentClassName}
        data-visually-hidden={hideLabels ? '' : undefined}
        {...props}
      >
        {label}
      </Link>
    );
  }
);

ProgressStepLink.displayName = COMPONENT_NAME;
