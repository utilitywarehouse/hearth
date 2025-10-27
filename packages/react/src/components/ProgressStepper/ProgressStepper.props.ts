import { MarginProps } from '../../props/margin.props';

export interface ProgressStepperProps extends React.ComponentProps<'nav'>, MarginProps {
  /**
   * Whether to show step labels
   * @default true
   */
  showLabels?: boolean;
  /**
   * Whether complete steps should be interactive (clickable)
   * @default false
   */
  interactive?: boolean;
}
