import { ViewProps } from 'react-native';

export type ProgressBarVariant = 'linear' | 'circular';
export type ProgressBarColorScheme = 'default' | 'success' | 'danger';
export type ProgressBarSize = 'sm' | 'md';

export interface ProgressBarProps extends ViewProps {
  variant?: ProgressBarVariant;
  /**
   * Set the visual appearance.
   * @default 'default'
   */
  colorScheme?: ProgressBarColorScheme;
  /**
   * Sets the circular variant size. Does not affect the appearance of the linear variant.
   * @default 'md'
   */
  size?: ProgressBarSize;
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
   * Required text label for the progress bar.
   */
  label: string;
  /**
   * Visually hide the label and value text.
   */
  hideLabel?: boolean;
  /**
   * Override the default percentage value label formatting.
   */
  formatValueText?: (value: number, meta: { min: number; max: number; percent: number }) => string;
  /**
   * A human-readable text alternative for the current value.
   */
  'aria-valuetext'?: string;
}

export interface ProgressBarInternalProps {
  percent: number;
  label: string;
  valueText: string;
  hideLabel?: boolean;
  colorScheme: ProgressBarColorScheme;
  size: ProgressBarSize;
}

export default ProgressBarProps;
