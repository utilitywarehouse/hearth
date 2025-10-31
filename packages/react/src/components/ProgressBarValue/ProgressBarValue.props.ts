export type ProgressBarValueProps = React.ComponentProps<'div'> & {
  /**
   * The current value to display (e.g., "90%", "9/10", "8.7GB / 9.0GB").
   */
  value: string;
};
