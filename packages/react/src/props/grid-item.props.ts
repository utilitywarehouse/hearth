import { Responsive, Union } from '../types/responsive';
import { PropDef } from './prop-def';

const columnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;

const gridItemPropDefs = {
  gridItemColumns: { className: 'grid-item-columns', tokens: columnsValues, responsive: true },
  gridArea: { className: 'grid-area', responsive: true },
  gridColumn: { className: 'grid-column', responsive: true },
  gridColumnStart: { className: 'grid-column-start', responsive: true },
  gridColumnEnd: { className: 'grid-column-end', responsive: true },
  gridRow: { className: 'grid-row', responsive: true },
  gridRowStart: { className: 'grid-row-start', responsive: true },
  gridRowEnd: { className: 'grid-row-end', responsive: true },
} satisfies {
  gridItemColumns: PropDef<(typeof columnsValues)[number]>;
  gridArea: PropDef<string>;
  gridColumn: PropDef<string>;
  gridColumnStart: PropDef<string>;
  gridColumnEnd: PropDef<string>;
  gridRow: PropDef<string>;
  gridRowStart: PropDef<string>;
  gridRowEnd: PropDef<string>;
};

interface GridItemProps {
  gridItemColumns?: Responsive<Union<string, (typeof columnsValues)[number]>>;
  gridArea?: Responsive<string>;
  gridColumn?: Responsive<string>;
  gridColumnStart?: Responsive<string>;
  gridColumnEnd?: Responsive<string>;
  gridRow?: Responsive<string>;
  gridRowStart?: Responsive<string>;
  gridRowEnd?: Responsive<string>;
}

export { gridItemPropDefs };
export type { GridItemProps };
