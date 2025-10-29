import { MarginProps } from '../../props/margin.props';
import { LinkProps } from '../Link/Link.props';

export type ProgressStepStatus = 'complete' | 'active' | 'incomplete';

export interface ProgressStepProps extends Omit<LinkProps, keyof MarginProps | 'children'> {
  /**
   * Unique identifier for the step
   */
  id: string;
  /**
   * The current status of the step
   */
  status: ProgressStepStatus;
  /**
   * The label text to display for the step
   */
  label: string;
  /**
   * The href attribute for the step (optional)
   */
  href?: string;
}
