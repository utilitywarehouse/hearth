import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface ProgressBarProps extends ComponentPropsWithout<'div', RemovedProps>, MarginProps {
  variant?: 'linear' | 'circular';
  /**
   * Set the color Scheme
   * @default 'default'
   */
  colorScheme?: 'default' | 'success' | 'danger';
  /**
   * The current progress value.
   */
  value: number;
  /**
   * The minimum value.
   * @default 0
   */
  min?: number;
  /**
   * The maximum value.
   * @default 100
   */
  max?: number;
  label?: string;
  formatValue?: (value: number) => string;
}
