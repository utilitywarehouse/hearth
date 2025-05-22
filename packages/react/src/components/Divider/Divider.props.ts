import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { Orientation } from '../../types/orientation';

export interface DividerProps
  extends ComponentPropsWithout<'hr', 'children' | RemovedProps>,
    MarginProps {
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
