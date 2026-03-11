'use client';

import { cn } from '../../helpers/cn';
import { flexPropDefs } from './Flex.props';
import type { FlexProps } from './Flex.props';
import { Slot } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { paddingPropDefs } from '../../props/padding.props';
import { colorPropDefs } from '../../props/color.props';
import { sizePropDefs } from '../../props/size.props';
import { gapPropDefs } from '../../props/gap.props';
import { marginPropDefs } from '../../props/margin.props';
import { gridItemPropDefs } from '../../props/grid-item.props';
import { flexItemPropDefs } from '../../props/flex-item.props';
import { spacingPropDefs } from '../../props/spacing.props';
import { backgroundColorPropDefs } from '../../props/background-color.props';
import { positionPropDefs } from '../../props/position.props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { borderColorPropDefs } from '../../props/border-color.props';
import { borderRadiusPropDefs } from '../../props/border-radius.props';
import { alignItemsPropDefs } from '../../props/align-items.props';
import { justifyContentPropDefs } from '../../props/justify-content.props';
import { borderStylePropDefs } from '../../props/border-style.props';
import { borderWidthPropDefs } from '../../props/border-width.props';
import { zIndexPropDefs } from '../../props/z-index.props';
import { overflowPropDefs } from '../../props/overflow.props';
import { opacityPropDefs } from '../../props/opacity.props';
import { alignContentPropDefs } from '../../props/align-content.props';
import { alignSelfPropDefs } from '../../props/align-self.props';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

const COMPONENT_NAME = 'Flex';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type FlexElement = ComponentRef<'span'>;

export const Flex = forwardRef<FlexElement, FlexProps>((props, ref) => {
  const {
    className,
    asChild,
    as: Tag = 'div',
    children,
    ...flexProps
  } = extractProps(
    props,
    flexPropDefs,
    alignItemsPropDefs,
    alignContentPropDefs,
    alignSelfPropDefs,
    backgroundColorPropDefs,
    borderColorPropDefs,
    borderRadiusPropDefs,
    borderStylePropDefs,
    borderWidthPropDefs,
    colorPropDefs,
    flexItemPropDefs,
    gapPropDefs,
    gridItemPropDefs,
    justifyContentPropDefs,
    marginPropDefs,
    opacityPropDefs,
    overflowPropDefs,
    paddingPropDefs,
    positionPropDefs,
    sizePropDefs,
    spacingPropDefs,
    textAlignPropDefs,
    textTransformPropDefs,
    zIndexPropDefs
  );

  return (
    <Slot.Root ref={ref} className={cn(componentClassName, className)} {...flexProps}>
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot.Root>
  );
});

Flex.displayName = COMPONENT_NAME;
