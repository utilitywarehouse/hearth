import { Responsive, Union } from '../types/responsive';
import { PropDef } from './prop-def';

const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;

export const gridItemPropDefs = {
  gridColumnSpan: { className: 'grid-c-span', tokens: values, responsive: true },
  gridArea: { className: 'grid-a', responsive: true },
  gridColumn: { className: 'grid-c', responsive: true },
  gridColumnStart: { className: 'grid-cs', responsive: true },
  gridColumnEnd: { className: 'grid-ce', responsive: true },
  gridRow: { className: 'grid-r', responsive: true },
  gridRowStart: { className: 'grid-rs', responsive: true },
  gridRowEnd: { className: 'grid-re', responsive: true },
} satisfies {
  gridColumnSpan: PropDef<(typeof values)[number]>;
  gridArea: PropDef<string>;
  gridColumn: PropDef<string>;
  gridColumnStart: PropDef<string>;
  gridColumnEnd: PropDef<string>;
  gridRow: PropDef<string>;
  gridRowStart: PropDef<string>;
  gridRowEnd: PropDef<string>;
};

export interface GridItemProps {
  /**
   * Set the number of grid columns this item spans. Supports responsive values.
   */
  gridColumnSpan?: Responsive<Union<string, (typeof values)[number]>>;
  /**
   * Shorthand for `grid-row-start`, `grid-column-start`, `grid-row-end` and
   * `grid-column-end`, placing an item within a named grid area or by line numbers.
   */
  gridArea?: Responsive<string>;
  /**
   * Shorthand for `grid-column-start` and `grid-column-end`, setting an item's size
   * and location within the grid column.
   */
  gridColumn?: Responsive<string>;
  /**
   * Set an item's starting line within the grid column.
   */
  gridColumnStart?: Responsive<string>;
  /**
   * Set an item's ending line within the grid column.
   */
  gridColumnEnd?: Responsive<string>;
  /**
   * Shorthand for `grid-row-start` and `grid-row-end`, setting an item's size and
   * location within the grid row.
   */
  gridRow?: Responsive<string>;
  /**
   * Set an item's starting line within the grid row.
   */
  gridRowStart?: Responsive<string>;
  /**
   * Set an item's ending line within the grid row.
   */
  gridRowEnd?: Responsive<string>;
}
