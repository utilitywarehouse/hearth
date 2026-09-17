'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import { cn } from '../../helpers/cn';
import type { ProgressStepButtonProps } from './ProgressStep.props';
import { ProgressStep } from './ProgressStep';

const COMPONENT_NAME = 'ProgressStepButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressStepButtonElement = ComponentRef<'button'>;

/**
 * Use ProgressStepButton for a step within a `ProgressStepper` that triggers
 * an action — such as returning to a previous step — rather than navigating
 * to a new URL. Renders as a `ProgressStep` wrapping a `button`; use
 * `ProgressStepLink` instead when the step should navigate via `href`.
 *
 * @summary An interactive ProgressStepper step that triggers an action.
 */
export const ProgressStepButton = forwardRef<ProgressStepButtonElement, ProgressStepButtonProps>(
  ({ label, className, status, disabled, onClick, 'aria-label': ariaLabel, ...props }, ref) => {
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
          <Link asChild aria-disabled={disabled}>
            <button ref={ref} {...props} onClick={disabled ? undefined : onClick}>
              {label}
            </button>
          </Link>
        )}
      </ProgressStep>
    );
  }
);

ProgressStepButton.displayName = COMPONENT_NAME;
