import { BackgroundColorProps } from '../../props/background-color.props';
import { BorderProps } from '../../props/border.props';
import { ColorProps } from '../../props/color.props';
import { FlexItemProps } from '../../props/flex-item.props';
import { GapProps } from '../../props/gap.props';
import { GridItemProps } from '../../props/grid-item.props';
import { MarginProps } from '../../props/margin.props';
import { PaddingProps } from '../../props/padding.props';
import { PositionProps } from '../../props/position.props';
import { PropDef } from '../../props/prop-def';
import { SizeProps } from '../../props/size.props';
import { SpacingProps } from '../../props/spacing.props';
import { TextAlignProps } from '../../props/text-align.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { Responsive, Union } from '../../types/responsive';

const displayValues = ['none', 'inline-grid', 'grid'] as const;
const columnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;
const flowValues = ['row', 'column', 'dense', 'row-dense', 'column-dense'] as const;
const alignValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const justifyValues = ['start', 'center', 'end', 'between'] as const;

export const gridPropDefs = {
  display: { className: 'display', tokens: displayValues, responsive: true },
  columns: { className: 'columns', tokens: columnsValues, responsive: true },
  template: { className: 'grid-template', responsive: true },
  templateColumns: { className: 'grid-template-columns', responsive: true },
  templateRows: { className: 'grid-template-rows', responsive: true },
  templateAreas: { className: 'grid-template-areas', responsive: true },
  autoFlow: { className: 'grid-auto-flow', tokens: flowValues, responsive: true },
  autoColumns: { className: 'grid-auto-columns', responsive: true },
  autoRows: { className: 'grid-auto-rows', responsive: true },
  align: { className: 'align-items', tokens: alignValues, responsive: true },
  justify: { className: 'justify-content', tokens: justifyValues, responsive: true },
} satisfies {
  display: PropDef<(typeof displayValues)[number]>;
  columns: PropDef<(typeof columnsValues)[number]>;
  template: PropDef<string>;
  templateAreas: PropDef<string>;
  templateColumns: PropDef<string>;
  templateRows: PropDef<string>;
  autoFlow: PropDef<(typeof flowValues)[number]>;
  autoColumns: PropDef<string>;
  autoRows: PropDef<string>;
  align: PropDef<(typeof alignValues)[number]>;
  justify: PropDef<(typeof justifyValues)[number]>;
};

interface CommonGridProps
  extends PositionProps,
    ColorProps,
    BackgroundColorProps,
    PaddingProps,
    MarginProps,
    GapProps,
    SpacingProps,
    SizeProps,
    BorderProps,
    GridItemProps,
    FlexItemProps,
    TextAlignProps {
  as?: 'div' | 'span';
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   */
  asChild?: boolean;
  defaultResponsiveColumns?: boolean;
  display?: Responsive<(typeof displayValues)[number]>;
  columns?: Responsive<Union<string, (typeof columnsValues)[number]>>;
  template?: Responsive<string>;
  templateColumns?: Responsive<string>;
  templateRows?: Responsive<string>;
  templateAreas?: Responsive<string>;
  autoFlow?: Responsive<(typeof flowValues)[number]>;
  autoRows?: Responsive<string>;
  autoColumns?: Responsive<string>;
  align?: Responsive<(typeof alignValues)[number]>;
  justify?: Responsive<(typeof justifyValues)[number]>;
}
type GridDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type GridSpanProps = { as: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
export type GridProps = CommonGridProps & (GridSpanProps | GridDivProps);
