import type { ViewProps } from 'react-native';

export type RatingValue = 0 | 1 | 2 | 3 | 4 | 5;

export type RatingLabels = Partial<Record<RatingValue, string>>;

export type RatingVariant = 'stars' | 'emojis';

export interface RatingProps extends Omit<ViewProps, 'children'> {
  /** Visual variant for the rating indicators. */
  variant?: RatingVariant;
  /** Current rating value. */
  value?: RatingValue;
  /** Initial rating value when uncontrolled. */
  defaultValue?: RatingValue;
  /** Called when a star is selected. */
  onChange?: (value: RatingValue) => void;
  /** Disables the rating input. */
  disabled?: boolean;
  /** Override labels for specific rating values. */
  labels?: RatingLabels;
  /** Hide the label text below the stars. */
  hideLabel?: boolean;
}

export default RatingProps;
