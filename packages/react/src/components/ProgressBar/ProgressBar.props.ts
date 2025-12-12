import { MarginProps } from '../../props/margin.props';
import { PropDef } from '../../props/prop-def';
import { Responsive } from '../../types/responsive';

const sizes = ['sm', 'md'] as const;

export const progressBarPropDefs = {
  size: { className: 'size', tokens: sizes, responsive: true, default: 'md' },
} satisfies {
  size: PropDef<(typeof sizes)[number]>;
};

export interface ProgressBarProps extends React.ComponentPropsWithRef<'div'>, MarginProps {
  variant?: 'linear' | 'circular';
  /**
   * Set the visual apearance.
   * @default 'default'
   */
  colorScheme?: 'default' | 'success' | 'danger';
  /**
   * Sets the circular variant size. Does not affect the appearance of the linear variant.
   * @default md
   */
  size?: Responsive<(typeof sizes)[number]>;
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
  /**
   * The required text label. Can be visually hidden with the `hideLabel` prop.
   */
  label: string;
  /**
   * Visually hide the label.
   */
  hideLabel?: boolean;
  /**
   * Override the default percentage value label formatting
   */
  formatValueText?: (value: number) => string;
  /**
   * A human-readable text alternative for the current value (`aria-valuenow`).
   */
  'aria-valuetext'?: React.AriaAttributes['aria-valuetext'];
}

export interface ProgressBarInternalProps extends ProgressBarProps {
  valueText: string;
  labelId: string;
}
