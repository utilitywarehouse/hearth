import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';

export interface ProgressStepperTextProps
  extends Omit<ComponentPropsWithRef<'span'>, 'color'>, MarginProps {
  /**
   * The current step number (1-indexed)
   */
  currentStep: number;
  /**
   * The total number of steps
   */
  totalSteps: number;
}
