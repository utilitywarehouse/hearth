import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';

export interface BreadcrumbsProps extends ComponentPropsWithRef<'nav'>, MarginProps {
  /**
   * Invert component colours, for use on darker surface colours.
   */
  inverted?: boolean;
}
