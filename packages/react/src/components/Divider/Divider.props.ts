import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { Orientation } from '../../types/orientation';

export interface DividerProps extends ComponentPropsWithRef<'hr'>, MarginProps {
  /**
   * @default horizontal
   */
  orientation?: Orientation;
  /**
   * Whether or not the component is purely decorative. When true, accessibility-related attributes
   * are updated so that that the rendered element is removed from the accessibility tree.
   */
  decorative?: boolean;
}
