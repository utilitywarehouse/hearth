import type { ComponentPropsWithRef, ReactNode } from 'react';
import { MarginProps } from '../../props/margin.props';

export interface ChipGroupProps extends ComponentPropsWithRef<'div'>, MarginProps {
  /** Optional text displayed before the chips, e.g. "Currently showing:". */
  label?: string;
  /** The `Chip` components to render within the group. */
  children: ReactNode;
}
