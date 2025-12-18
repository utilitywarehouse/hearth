import { BackgroundColorProps } from '../../props/background-color.props';
import { BorderColorProps } from '../../props/border-color.props';
import { BorderRadiusProps } from '../../props/border-radius.props';
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
import { TextTransformProps } from '../../props/text-transform.props';
import { Responsive, Union } from '../../types/responsive';

const displayValues = ['none', 'inline-grid', 'grid'] as const;
const columnsValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;
const flowValues = ['row', 'column', 'dense', 'row-dense', 'column-dense'] as const;
const alignItemsValues = ['start', 'center', 'end', 'baseline', 'stretch'] as const;
const alignContentValues = [
  'start',
  'center',
  'end',
  'stretch',
  'around',
  'between',
  'evenly',
] as const;
const justifyContentValues = [
  'start',
  'center',
  'end',
  'stretch',
  'between',
  'around',
  'evenly',
] as const;
const justifyItemsValues = ['start', 'center', 'end', 'stretch'] as const;

export const gridPropDefs = {
  display: { className: 'd', tokens: displayValues, responsive: true },
  columns: { className: 'columns', tokens: columnsValues, responsive: true },
  template: { className: 'grid-t', responsive: true },
  templateColumns: { className: 'grid-t-c', responsive: true },
  templateRows: { className: 'grid-t-r', responsive: true },
  templateAreas: { className: 'grid-t-a', responsive: true },
  autoFlow: { className: 'grid-af', tokens: flowValues, responsive: true },
  autoColumns: { className: 'grid-ac', responsive: true },
  autoRows: { className: 'grid-ar', responsive: true },
  alignItems: { className: 'ai', tokens: alignItemsValues, responsive: true },
  alignContent: { className: 'ac', tokens: alignContentValues, responsive: true },
  justifyContent: { className: 'jc', tokens: justifyContentValues, responsive: true },
  justifyItems: { className: 'ji', tokens: justifyItemsValues, responsive: true },
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
  alignItems: PropDef<(typeof alignItemsValues)[number]>;
  alignContent: PropDef<(typeof alignContentValues)[number]>;
  justifyContent: PropDef<(typeof justifyContentValues)[number]>;
  justifyItems: PropDef<(typeof justifyItemsValues)[number]>;
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
    BorderColorProps,
    BorderRadiusProps,
    GridItemProps,
    FlexItemProps,
    TextAlignProps,
    TextTransformProps {
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
  alignItems?: Responsive<(typeof alignItemsValues)[number]>;
  alignContent?: Responsive<(typeof alignContentValues)[number]>;
  justifyItems?: Responsive<(typeof justifyItemsValues)[number]>;
  justifyContent?: Responsive<(typeof justifyContentValues)[number]>;
}
type GridDivProps = { as?: 'div' } & React.ComponentPropsWithRef<'div'>;
type GridSpanProps = { as: 'span' } & React.ComponentPropsWithRef<'span'>;
export type GridProps = CommonGridProps & (GridSpanProps | GridDivProps);
