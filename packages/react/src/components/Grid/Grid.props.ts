<<<<<<< HEAD
import type { ColorProps } from '../../props/color.props';
import { GapProps } from '../../props/gap.props';
import type { MarginProps } from '../../props/margin.props';
import type { PaddingProps } from '../../props/padding.props';
import { PropDef } from '../../props/prop-def';
import { SizeProps } from '../../props/size.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { Responsive, Union } from '../../types/responsive';

const displayValues = ['none', 'inline-grid', 'grid'] as const;
const columnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;
const flowValues = ['row', 'column', 'dense', 'row-dense', 'column-dense'] as const;
const alignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const justifyValues = ['start', 'center', 'end', 'between'] as const;

export const gridPropDefs = {
  display: { className: 'display', tokens: displayValues, responsive: true },
  columns: { className: 'columns', tokens: columnsValues, responsive: true },
  size: { className: 'size', tokens: columnsValues, responsive: true },
  template: { className: 'grid-template', responsive: true },
  templateColumns: { className: 'grid-template-columns', responsive: true },
  templateRows: { className: 'grid-template-rows', responsive: true },
  templateAreas: { className: 'grid-template-areas', responsive: true },
  autoFlow: { className: 'grid-auto-flow', tokens: flowValues, responsive: true },
  autoColumns: { className: 'grid-auto-columns', responsive: true },
  autoRows: { className: 'grid-auto-rows', responsive: true },
  column: { className: 'grid-column', tokens: columnsValues, responsive: true },
  columnStart: { className: 'grid-column-start', tokens: columnsValues, responsive: true },
  columnEnd: { className: 'grid-column-end', tokens: columnsValues, responsive: true },
  row: { className: 'grid-row', responsive: true },
  rowStart: { className: 'grid-row-start', responsive: true },
  rowEnd: { className: 'grid-row-end', responsive: true },
  area: { className: 'grid-area', responsive: true },
  align: { className: 'align-items', tokens: alignValues, responsive: true },
  justify: { className: 'justify-content', tokens: justifyValues, responsive: true },
} satisfies {
  display: PropDef<(typeof displayValues)[number]>;
  columns: PropDef<(typeof columnsValues)[number]>;
  size: PropDef<(typeof columnsValues)[number]>;
  template: PropDef<string>;
  templateColumns: PropDef<string>;
  templateRows: PropDef<string>;
  templateAreas: PropDef<string>;
  autoFlow: PropDef<(typeof flowValues)[number]>;
  autoColumns: PropDef<string>;
  autoRows: PropDef<string>;
  column: PropDef<(typeof columnsValues)[number]>;
  columnStart: PropDef<(typeof columnsValues)[number]>;
  columnEnd: PropDef<(typeof columnsValues)[number]>;
  row: PropDef<string>;
  rowStart: PropDef<string>;
  rowEnd: PropDef<string>;
  area: PropDef<string>;
  align: PropDef<(typeof alignValues)[number]>;
  justify: PropDef<(typeof justifyValues)[number]>;
};

interface CommonGridProps extends ColorProps, PaddingProps, MarginProps, GapProps, SizeProps {
  as?: 'div' | 'span';
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean;
  container?: boolean;
  display?: Responsive<(typeof displayValues)[number]>;
  columns?: Responsive<Union<string, (typeof columnsValues)[number]>>;
  size?: Responsive<Union<string, (typeof columnsValues)[number]>>;
  template?: Responsive<string>;
  templateColumns?: Responsive<string>;
  templateRows?: Responsive<string>;
  templateAreas?: Responsive<string>;
  autoFlow?: Responsive<(typeof flowValues)[number]>;
  autoRows?: Responsive<string>;
  autoColumns?: Responsive<string>;
  column?: Responsive<Union<string, (typeof columnsValues)[number]>>;
  columnStart?: Responsive<Union<string, (typeof columnsValues)[number]>>;
  columnEnd?: Responsive<Union<string, (typeof columnsValues)[number]>>;
  row?: Responsive<string>;
  rowStart?: Responsive<string>;
  rowEnd?: Responsive<string>;
  area?: Responsive<string>;
  align?: Responsive<(typeof alignValues)[number]>;
  justify?: Responsive<(typeof justifyValues)[number]>;
}
type GridDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type GridSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
export type GridProps = CommonGridProps & (GridSpanProps | GridDivProps);
||||||| parent of edb494f (add `Grid` component)
=======
import type { ColorProps } from '../../props/color.props';
import type { MarginProps } from '../../props/margin.props';
import type { PaddingProps } from '../../props/padding.props';
import { PropDef } from '../../props/prop-def';
import type { SizeProps } from '../../props/size.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { Responsive, Union } from '../../types/responsive';

const displayValues = ['none', 'inline-grid', 'grid'] as const;
const columnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;
const flowValues = ['row', 'column', 'dense', 'row-dense', 'column-dense'] as const;
const alignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const justifyValues = ['start', 'center', 'end', 'between'] as const;

export const gridPropDefs = {
  display: { className: 'display', tokens: displayValues, responsive: true },
  columns: { className: 'columns', tokens: columnsValues, responsive: true },
  size: { className: 'size', tokens: columnsValues, responsive: true },
  template: { className: 'grid-template', responsive: true },
  templateColumns: { className: 'grid-template-columns', responsive: true },
  templateRows: { className: 'grid-template-rows', responsive: true },
  templateAreas: { className: 'grid-template-areas', responsive: true },
  autoFlow: { className: 'grid-auto-flow', tokens: flowValues, responsive: true },
  autoColumns: { className: 'grid-auto-columns', responsive: true },
  autoRows: { className: 'grid-auto-rows', responsive: true },
  column: { className: 'grid-column', tokens: columnsValues, responsive: true },
  columnStart: { className: 'grid-column-start', tokens: columnsValues, responsive: true },
  columnEnd: { className: 'grid-column-end', tokens: columnsValues, responsive: true },
  row: { className: 'grid-row', responsive: true },
  rowStart: { className: 'grid-row-start', responsive: true },
  rowEnd: { className: 'grid-row-end', responsive: true },
  area: { className: 'grid-area', responsive: true },
  align: { className: 'align-items', tokens: alignValues, responsive: true },
  justify: { className: 'justify-content', tokens: justifyValues, responsive: true },
} satisfies {
  display: PropDef<(typeof displayValues)[number]>;
  columns: PropDef<(typeof columnsValues)[number]>;
  size: PropDef<(typeof columnsValues)[number]>;
  template: PropDef<string>;
  templateColumns: PropDef<string>;
  templateRows: PropDef<string>;
  templateAreas: PropDef<string>;
  autoFlow: PropDef<(typeof flowValues)[number]>;
  autoColumns: PropDef<string>;
  autoRows: PropDef<string>;
  column: PropDef<(typeof columnsValues)[number]>;
  columnStart: PropDef<(typeof columnsValues)[number]>;
  columnEnd: PropDef<(typeof columnsValues)[number]>;
  row: PropDef<string>;
  rowStart: PropDef<string>;
  rowEnd: PropDef<string>;
  area: PropDef<string>;
  align: PropDef<(typeof alignValues)[number]>;
  justify: PropDef<(typeof justifyValues)[number]>;
};

interface CommonGridProps extends ColorProps, PaddingProps, MarginProps, SizeProps {
  as?: 'div' | 'span';
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean;
  container?: boolean;
  display?: Responsive<(typeof displayValues)[number]>;
  columns?: Responsive<Union<string, (typeof columnsValues)[number]>>;
  size?: Responsive<Union<string, (typeof columnsValues)[number]>>;
  template?: Responsive<string>;
  templateColumns?: Responsive<string>;
  templateRows?: Responsive<string>;
  templateAreas?: Responsive<string>;
  autoFlow?: Responsive<(typeof flowValues)[number]>;
  autoRows?: Responsive<string>;
  autoColumns?: Responsive<string>;
  column?: Responsive<Union<string, (typeof columnsValues)[number]>>;
  columnStart?: Responsive<Union<string, (typeof columnsValues)[number]>>;
  columnEnd?: Responsive<Union<string, (typeof columnsValues)[number]>>;
  row?: Responsive<string>;
  rowStart?: Responsive<string>;
  rowEnd?: Responsive<string>;
  area?: Responsive<string>;
  align?: Responsive<(typeof alignValues)[number]>;
  justify?: Responsive<(typeof justifyValues)[number]>;
}
type GridDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type GridSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
export type GridProps = CommonGridProps & (GridSpanProps | GridDivProps);
>>>>>>> edb494f (add `Grid` component)
