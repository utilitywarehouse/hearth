'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { boxPropDefs } from './Box.props';
import type { BoxProps } from './Box.props';
import { Slot } from 'radix-ui';
import { extractProps } from '../../helpers/extract-props';
import { paddingPropDefs } from '../../props/padding.props';
import { colorPropDefs } from '../../props/color.props';
import { sizePropDefs } from '../../props/size.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { marginPropDefs } from '../../props/margin.props';
import { gridItemPropDefs } from '../../props/grid-item.props';
import { flexItemPropDefs } from '../../props/flex-item.props';
import { backgroundColorPropDefs } from '../../props/background-color.props';
import { positionPropDefs } from '../../props/position.props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { borderColorPropDefs } from '../../props/border-color.props';
import { borderRadiusPropDefs } from '../../props/border-radius.props';
import { borderStylePropDefs } from '../../props/border-style.props';
import { borderWidthPropDefs } from '../../props/border-width.props';
import { zIndexPropDefs } from '../../props/z-index.props';
import { overflowPropDefs } from '../../props/overflow.props';
import { opacityPropDefs } from '../../props/opacity.props';
import type { ComponentRef } from 'react';
import { alignSelfPropDefs } from '../../props/align-self.props';
import { orderPropDefs } from '../../props/order.props';

const COMPONENT_NAME = 'Box';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type BoxElement = ComponentRef<'div'>;

/**
 * Use Box as the generic, all-purpose layout primitive when no other layout
 * component (Container, Grid, Flex) fits. It renders a plain `div` (or
 * `span` via `as`) with the full set of common style props available.
 * For page content with responsive padding and gutters, use Container instead.
 * For grid layouts, use Grid instead. For flexbox-based stacked or inline
 * layouts, use Flex instead.
 *
 * @summary A generic layout primitive for applying style props to a div or span.
 */
export const Box = forwardRef<BoxElement, BoxProps>((props, ref) => {
  const {
    className,
    asChild,
    as: Tag = 'div',
    children,
    ...boxProps
  } = extractProps(
    props,
    boxPropDefs,
    alignSelfPropDefs,
    backgroundColorPropDefs,
    borderColorPropDefs,
    borderRadiusPropDefs,
    borderStylePropDefs,
    borderWidthPropDefs,
    colorPropDefs,
    flexItemPropDefs,
    gridItemPropDefs,
    marginPropDefs,
    opacityPropDefs,
    orderPropDefs,
    overflowPropDefs,
    paddingPropDefs,
    positionPropDefs,
    sizePropDefs,
    textAlignPropDefs,
    textTransformPropDefs,
    zIndexPropDefs
  );

  return (
    <Slot.Root
      ref={ref}
      className={cn(componentClassName, className)}
      data-testid={componentClassName}
      {...boxProps}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot.Root>
  );
});

Box.displayName = COMPONENT_NAME;
