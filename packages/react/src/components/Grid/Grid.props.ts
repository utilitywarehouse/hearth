import { AlignContentProps } from '../../props/align-content.props';
import { AlignItemsProps } from '../../props/align-items.props';
import { BackgroundColorProps } from '../../props/background-color.props';
import { BorderColorProps } from '../../props/border-color.props';
import { BorderRadiusProps } from '../../props/border-radius.props';
import { BorderStyleProps } from '../../props/border-style.props';
import { BorderWidthProps } from '../../props/border-width.props';
import { ColorProps } from '../../props/color.props';
import { FlexItemProps } from '../../props/flex-item.props';
import { GapProps } from '../../props/gap.props';
import { GridItemProps } from '../../props/grid-item.props';
import { JustifyContentProps } from '../../props/justify-content.props';
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
const justifyItemsValues = ['start', 'center', 'end', 'stretch'] as const;

/**
 * Low-level prop definitions used by the Grid component to generate utility
 * class names and map props to CSS properties.
 */
export const gridPropDefs = {
  /**
   * Controls the CSS `display` property for the grid container.
   *
   * @example
   * ```tsx
   * <Grid display="grid" />
   * ```
   */
  display: { className: 'd', tokens: displayValues, responsive: true },

  /**
   * Shorthand for setting `grid-template-columns` using a 12-column system.
   * Accepts a number as a string (`"1"`–`"12"`) or a custom template string.
   *
   * @example
   * ```tsx
   * <Grid columns="3" />
   * <Grid columns="1fr 2fr" />
   * ```
   */
  columns: { className: 'columns', tokens: columnsValues, responsive: true },

  /**
   * Shorthand for the full `grid-template` property.
   */
  template: { className: 'grid-t', responsive: true },

  /**
   * Maps to `grid-template-columns`.
   */
  templateColumns: { className: 'grid-tc', responsive: true },

  /**
   * Maps to `grid-template-rows`.
   */
  templateRows: { className: 'grid-tr', responsive: true },

  /**
   * Maps to `grid-template-areas`.
   */
  templateAreas: { className: 'grid-ta', responsive: true },

  /**
   * Maps to `grid-auto-flow`.
   */
  autoFlow: { className: 'grid-af', tokens: flowValues, responsive: true },

  /**
   * Maps to `grid-auto-columns`.
   */
  autoColumns: { className: 'grid-ac', responsive: true },

  /**
   * Maps to `grid-auto-rows`.
   */
  autoRows: { className: 'grid-ar', responsive: true },

  /**
   * Maps to `justify-items`.
   */
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
  justifyItems: PropDef<(typeof justifyItemsValues)[number]>;
};

/**
 * Common props shared by all Grid variants. These props primarily control
 * layout, spacing, and positioning of the grid container and its items.
 */
interface CommonGridProps
  extends AlignItemsProps,
    AlignContentProps,
    JustifyContentProps,
    PositionProps,
    ColorProps,
    BackgroundColorProps,
    PaddingProps,
    MarginProps,
    GapProps,
    SpacingProps,
    SizeProps,
    BorderStyleProps,
    BorderWidthProps,
    BorderColorProps,
    BorderRadiusProps,
    GridItemProps,
    FlexItemProps,
    TextAlignProps,
    TextTransformProps {
  /**
   * When `true`, renders the Grid as a `Slot` so that its props are
   * forwarded to the child element instead of rendering a DOM node.
   */
  asChild?: boolean;

  /**
   * When `true`, applies a default responsive column configuration (typically
   * a single column on small screens and multiple columns on larger screens).
   */
  defaultResponsiveColumns?: boolean;

  /**
   * Controls the `display` behavior of the grid container.
   */
  display?: Responsive<(typeof displayValues)[number]>;

  /**
   * Shorthand for configuring columns using the 12-column system or a custom
   * `grid-template-columns` string. Supports responsive values.
   */
  columns?: Responsive<Union<string, (typeof columnsValues)[number]>>;

  /**
   * Shorthand for the full `grid-template` property. Supports responsive values.
   */
  template?: Responsive<string>;

  /**
   * Maps to `grid-template-columns`. Supports responsive values.
   */
  templateColumns?: Responsive<string>;

  /**
   * Maps to `grid-template-rows`. Supports responsive values.
   */
  templateRows?: Responsive<string>;

  /**
   * Maps to `grid-template-areas`. Supports responsive values.
   */
  templateAreas?: Responsive<string>;

  /**
   * Maps to `grid-auto-flow`. Supports responsive values.
   */
  autoFlow?: Responsive<(typeof flowValues)[number]>;

  /**
   * Maps to `grid-auto-rows`. Supports responsive values.
   */
  autoRows?: Responsive<string>;

  /**
   * Maps to `grid-auto-columns`. Supports responsive values.
   */
  autoColumns?: Responsive<string>;

  /**
   * Maps to `justify-items`. Supports responsive values.
   */
  justifyItems?: Responsive<(typeof justifyItemsValues)[number]>;
}

type GridDivProps = { as?: 'div' } & React.ComponentPropsWithRef<'div'>;
type GridSpanProps = { as: 'span' } & React.ComponentPropsWithRef<'span'>;
export type GridProps = CommonGridProps & (GridSpanProps | GridDivProps);
