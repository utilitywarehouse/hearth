import { BodyText } from '../BodyText';
import type { ProgressStepperTextProps } from './ProgressStepper.props';

/**
 * Use ProgressStepperText to show a condensed "Step X of Y" summary of
 * progress through a multi-step process, as a compact alternative to a full
 * `ProgressStepper`.
 */
const ProgressStepperText = ({ currentStep, totalSteps, ...props }: ProgressStepperTextProps) => {
  return (
    <BodyText size="lg" weight="semibold" color="secondary" {...props}>
      Step {currentStep} of {totalSteps}
    </BodyText>
  );
};

ProgressStepperText.displayName = 'ProgressStepperText';

export default ProgressStepperText;
