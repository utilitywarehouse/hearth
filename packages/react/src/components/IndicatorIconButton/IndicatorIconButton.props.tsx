import type { UnstyledIconButtonProps } from '../UnstyledIconButton/UnstyledIconButton.props';

export interface IndicatorIconButtonProps extends UnstyledIconButtonProps {
  /**
   * Shows a small visual indicator (dot) to signal unread/new activity.
   * Remove or set to false when there's nothing to flag.
   */
  indicator?: boolean;
}
