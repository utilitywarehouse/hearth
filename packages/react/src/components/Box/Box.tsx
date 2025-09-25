import * as React from 'react';
import clsx from 'clsx';

import { boxPropDefs, type BoxProps } from './Box.props';

import type { ElementRef } from 'react';
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
import { borderPropDefs } from '../../props/border.props';
import { textAlignPropDefs } from '../../props/text-align.props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { getClassNameStyles } from '../../helpers/get-classname-styles';
import { spaceTokens } from '../../tokens/space';

const COMPONENT_NAME = 'Box';
const { displayName, componentClassName } = withGlobalPrefix(COMPONENT_NAME);

type BoxElement = ElementRef<'div'>;

export const Box = React.forwardRef<BoxElement, BoxProps>((props, ref) => {
  const {
    className,
    asChild,
    as: Tag = 'div',
    ...boxProps
  } = extractProps(
    props,
    boxPropDefs,
    positionPropDefs,
    paddingPropDefs,
    colorPropDefs,
    backgroundColorPropDefs,
    marginPropDefs,
    sizePropDefs,
    borderPropDefs,
    gridItemPropDefs,
    flexItemPropDefs,
    textAlignPropDefs,
    textTransformPropDefs
  );

  const res = getClassNameStyles({
    value: undefined,
    defaultValue: 'md',
    prefix: 'size',
    tokens: ['sm', 'md', 'lg'],
    isResponsive: false,
  });
  console.log({ res });

  // const res = getClassNameStyles({
  //   value: 'red-500',
  //   prefix: 'color',
  //   tokens: ['red-500', 'blue-500'],
  //   isResponsive: false,
  // });

  const Component = asChild ? Slot.Root : Tag;

  return <Component ref={ref} className={clsx(componentClassName, className)} {...boxProps} />;
});

Box.displayName = displayName;
