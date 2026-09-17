import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

export const flexItemPropDefs = {
  flex: { className: 'flex', responsive: true },
  flexBasis: { className: 'flex-b', responsive: true },
  flexShrink: { className: 'flex-s', responsive: true },
  flexGrow: { className: 'flex-g', responsive: true },
} satisfies {
  flex: PropDef<string>;
  flexBasis: PropDef<string>;
  flexShrink: PropDef<string>;
  flexGrow: PropDef<string>;
};

export interface FlexItemProps {
  /**
   * Shorthand for `flex-grow`, `flex-shrink` and `flex-basis`, controlling how a flex
   * item grows or shrinks to fit the space available in its flex container.
   */
  flex?: Responsive<string>;
  /**
   * Set the initial main-size of a flex item before remaining space is distributed
   * along the main axis.
   */
  flexBasis?: Responsive<string>;
  /**
   * Set how much a flex item shrinks relative to the rest of the flex items when
   * there isn't enough space in the container.
   * @default 1
   */
  flexShrink?: Responsive<string>;
  /**
   * Set how much a flex item grows relative to the rest of the flex items when
   * there is extra space in the container.
   * @default 0
   */
  flexGrow?: Responsive<string>;
}
