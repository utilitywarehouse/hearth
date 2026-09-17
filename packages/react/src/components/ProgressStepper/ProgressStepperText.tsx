'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { BodyText } from '../BodyText/BodyText';
import type { ProgressStepperTextProps } from './ProgressStepperText.props';

const COMPONENT_NAME = 'ProgressStepperText';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ProgressStepperTextElement = ComponentRef<'span'>;

/**
 * Use ProgressStepperText to show a condensed "Step X of Y" summary of
 * progress through a multi-step process, as a compact alternative to a full
 * `ProgressStepper`.
 *
 * @summary Shows a condensed "Step X of Y" summary of progress.
 */
export const ProgressStepperText = forwardRef<ProgressStepperTextElement, ProgressStepperTextProps>(
  ({ currentStep, totalSteps, ...props }, ref) => {
    const { className, ...progressStepperTextProps } = extractProps(props, marginPropDefs);

    return (
      <BodyText
        ref={ref}
        as="span"
        size="lg"
        weight="semibold"
        className={cn(componentClassName, className)}
        data-testid={componentClassName}
        {...progressStepperTextProps}
      >
        Step {currentStep} of {totalSteps}
      </BodyText>
    );
  }
);

ProgressStepperText.displayName = COMPONENT_NAME;
