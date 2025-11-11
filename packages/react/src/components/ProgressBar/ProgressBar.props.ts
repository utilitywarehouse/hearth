import { MarginProps } from '../../props/margin.props';
import { PropDef } from '../../props/prop-def';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { Responsive } from '../../types/responsive';

const sizes = ['sm', 'md'] as const;

export const progressBarPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

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
  /**
   * Sets the circular variant size. Does not affect the appearance of the linear variant.
   * @default md
   */
  size?: Responsive<(typeof sizes)[number]>;
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
   * Visually hide the label.
   */
  hideLabel?: boolean;
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
  valueText: string;
  labelId: string;
}
