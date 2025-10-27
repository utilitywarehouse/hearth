import { MarginProps } from '../../props/margin.props';
import { LinkProps } from '../Link/Link.props';

export type ProgressStepState = 'complete' | 'active' | 'incomplete';

export interface ProgressStepProps extends Omit<LinkProps, keyof MarginProps | 'children'> {
  /**
   * Unique identifier for the step
   */
  id: string;
  /**
   * The current state of the step
   */
  state: ProgressStepState;
  /**
   * The label text to display for the step (optional)
   */
  label?: string;
  /**
   * The href attribute for the step (optional)
   */
  href?: string;
  /**
   * The step index (automatically set by ProgressStepper)
   * @internal
   */
  stepIndex?: number;
}
