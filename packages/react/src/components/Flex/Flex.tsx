import * as React from 'react';
import clsx from 'clsx';

import { flexPropDefs, type FlexProps } from './Flex.props';

import type { ElementRef } from 'react';
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
import { borderPropDefs } from '../../props/border.props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { borderColorPropDefs } from '../../props/border-color.props';

const COMPONENT_NAME = 'Flex';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type FlexElement = ElementRef<'div'>;

export const Flex = React.forwardRef<FlexElement, FlexProps>((props, ref) => {
  const {
    className,
    asChild,
    as: Tag = 'div',
    ...flexProps
  } = extractProps(
    props,
    flexPropDefs,
    positionPropDefs,
    paddingPropDefs,
    marginPropDefs,
    colorPropDefs,
    backgroundColorPropDefs,
    sizePropDefs,
    gapPropDefs,
    borderPropDefs,
    borderColorPropDefs,
    gridItemPropDefs,
    flexItemPropDefs,
    spacingPropDefs,
    textAlignPropDefs,
    textTransformPropDefs
  );

  const Component = asChild ? Slot.Root : Tag;

  return <Component ref={ref} className={clsx(componentClassName, className)} {...flexProps} />;
});

Flex.displayName = COMPONENT_NAME;
