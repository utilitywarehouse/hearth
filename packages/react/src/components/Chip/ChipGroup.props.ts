import type { ComponentPropsWithRef, ReactNode } from 'react';
import { MarginProps } from '../../props/margin.props';

export interface ChipGroupProps extends ComponentPropsWithRef<'div'>, MarginProps {
  /**
   * Optional text displayed before the chips, e.g. "Currently showing:".
   * Also used as the group's accessible name via `aria-labelledby`, unless
   * `aria-labelledby` is set explicitly.
   */
  label?: string;
  /** The `Chip` components to render within the group. */
  children: ReactNode;
}
