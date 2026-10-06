'use client';

import { cn } from '../../helpers/cn';
import type { ProgressStepperProps } from './ProgressStepper.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { Slot } from 'radix-ui';
import { forwardRef } from 'react';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'ProgressStepper';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressStepperElement = ComponentRef<'div'>;

/**
 * Use ProgressStepper to show a user's progress through a multi-step process,
 * such as a checkout or application flow. Wrap ProgressStep, ProgressStepButton,
 * or ProgressStepLink children depending on whether each step is static,
 * triggers an action, or navigates — don't mix step types within the same
 * stepper. Render `as="nav"` when the stepper represents site or app
 * navigation. For a single continuous task's completion, use ProgressBar instead.
 *
 * @summary Shows a user's progress through a multi-step process.
 */
export const ProgressStepper = forwardRef<ProgressStepperElement, ProgressStepperProps>(
  (props, ref) => {
    const {
      className,
      children,
      hideLabels,
      as: Tag = 'div',
      'aria-label': ariaLabel = 'progress',
      ...progressStepperProps
    } = extractProps(props, marginPropDefs);

    return (
      <Slot.Root
        ref={ref}
        aria-label={ariaLabel}
        className={cn(componentClassName, className)}
        data-visually-hidden-labels={hideLabels ? '' : undefined}
        data-testid={componentClassName}
        {...progressStepperProps}
      >
        <Tag>
          <ol role="list">{children}</ol>
        </Tag>
      </Slot.Root>
    );
  }
);

ProgressStepper.displayName = COMPONENT_NAME;
