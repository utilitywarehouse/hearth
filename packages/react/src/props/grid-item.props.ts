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
  gridColumnSpan?: Responsive<Union<string, (typeof values)[number]>>;
  gridArea?: Responsive<string>;
  gridColumn?: Responsive<string>;
  gridColumnStart?: Responsive<string>;
  gridColumnEnd?: Responsive<string>;
  gridRow?: Responsive<string>;
  gridRowStart?: Responsive<string>;
  gridRowEnd?: Responsive<string>;
}
