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
  label: string;
  /**
   * Override the default percentage value label formatting
   */
  formatValue?: (value: number) => string;
  /**
   * A string value that provides a user-friendly name for `aria-valuenow`, the current value of the meter.
   */
  'aria-valuetext'?: React.AriaAttributes['aria-valuetext'];
}

export interface ProgressBarInternalProps extends ProgressBarProps {
  valueLabel: string;
  labelId: string;
}
