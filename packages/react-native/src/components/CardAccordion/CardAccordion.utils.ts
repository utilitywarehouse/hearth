export type CardAccordionStepState = 'previous' | 'current' | 'future';

export type CardAccordionAction = 'previous' | 'next';

/**
 * Resolves whether `value` is a completed (`previous`), active (`current`) or upcoming
 * (`future`) step. Steps are linear, so anything before the current step counts as completed.
 * When `currentStep` isn't one of `steps`, every step is treated as `future`.
 */
export const getStepState = (
  steps: string[],
  currentStep: string | undefined,
  value: string
): CardAccordionStepState => {
  if (value === currentStep) return 'current';
  const currentIndex = currentStep === undefined ? -1 : steps.indexOf(currentStep);
  const index = steps.indexOf(value);
  if (currentIndex === -1 || index === -1) return 'future';
  return index < currentIndex ? 'previous' : 'future';
};

/** Resolves the step a `next` or `previous` action moves to from `value`, if there is one. */
export const getAdjacentStep = (
  steps: string[],
  value: string,
  action: CardAccordionAction
): string | undefined => {
  const index = steps.indexOf(value);
  if (index === -1) return undefined;
  return steps[action === 'next' ? index + 1 : index - 1];
};

export interface ResolveInitialStepOptions {
  steps: string[];
  controlledValue?: string;
  defaultValue?: string;
}

/** Resolves the step `CardAccordion` should seed its uncontrolled state with on mount. */
export const resolveInitialStep = ({
  steps,
  controlledValue,
  defaultValue,
}: ResolveInitialStepOptions): string | undefined => controlledValue ?? defaultValue ?? steps[0];
