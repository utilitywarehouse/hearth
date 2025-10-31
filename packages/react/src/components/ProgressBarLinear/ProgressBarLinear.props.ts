import { MarginProps } from '../../props/margin.props';

export type ProgressBarLinearProps = React.ComponentProps<'div'> &
  MarginProps & {
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
     * The children components (ProgressBarLabel, ProgressBarValue).
     */
    children?: React.ReactNode;
  };
