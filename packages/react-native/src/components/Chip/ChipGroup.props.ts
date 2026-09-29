import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface ChipGroupProps extends ViewProps {
  /**
   * Optional text displayed before the chips, e.g. "Currently showing:".
   * Also used as the group's accessible name via `aria-labelledby`, unless
   * `aria-labelledby` or `aria-label` is set explicitly.
   */
  label?: string;
  /** The `Chip` components to render within the group. */
  children: ReactNode;
}
