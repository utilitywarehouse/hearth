import * as React from 'react';
import clsx from 'clsx';

import { boxPropDefs, type BoxProps } from './Box.props';

import type { ElementRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { extractProps } from '../../helpers/extract-props';
import { paddingPropDefs } from '../../props/padding.props';
import { colorPropDefs } from '../../props/color.props';
import { sizePropDefs } from '../../props/size.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { marginPropDefs } from '../../props/margin.props';
import { gridItemPropDefs } from '../../props/grid-item.props';
import { flexItemPropDefs } from '../../props/flex-item.props';

const componentName = 'Box';
const componentClassName = withGlobalPrefix(componentName);

type BoxElement = ElementRef<'div'>;

/*
 * `Box` is a fundamental primitive, based on the `div` element, for creating
 * layouts, styling content and as a building block for other elements.
 */
export const Box = React.forwardRef<BoxElement, BoxProps>((props, ref) => {
  const {
    className,
    asChild,
    as: Tag = 'div',
    ...boxProps
  } = extractProps(
    props,
    boxPropDefs,
    paddingPropDefs,
    marginPropDefs,
    colorPropDefs,
    sizePropDefs,
    gridItemPropDefs,
    flexItemPropDefs
  );

  const Component = asChild ? Slot : Tag;

  return <Component ref={ref} className={clsx(componentClassName, className)} {...boxProps} />;
});

Box.displayName = componentName;
