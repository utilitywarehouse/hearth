import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { Responsive } from '../../types/responsive';

export interface CardActionsProps extends ComponentPropsWithRef<'ol'>, MarginProps {
  /**
   * Shorthand for changing the default rendered element into a semantically appropriate alternative.
   * @default ul
   */
  as?: 'ul' | 'ol';
  direction?: Responsive<'column' | 'row'>;
}
