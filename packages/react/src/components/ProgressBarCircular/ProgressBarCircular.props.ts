export type ProgressBarCircularProps = React.ComponentProps<'div'> & {
  /**
   * The type of progress bar indicating the state.
   * @default 'default'
   */
  type?: 'default' | 'success' | 'danger';
  /**
   * The current progress value as a percentage (0-100).
   */
  value: number;
  /**
   * The size of the circular progress bar.
   * @default 'md'
   */
  size?: 'sm' | 'md';
  /**
   * The children components (ProgressBarLabel, ProgressBarValue).
   */
  children?: React.ReactNode;
};
