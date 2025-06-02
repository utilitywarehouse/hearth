import * as React from 'react';
import clsx from 'clsx';

import { boxPropDefs, type BoxProps } from './Box.props';

import type { ElementRef } from 'react';
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
import { useRender } from '@base-ui-components/react/use-render';
import { mergeProps } from '@base-ui-components/react/merge-props';

const componentName = 'Box';
const componentClassName = withGlobalPrefix(componentName);

type BoxElement = ElementRef<'div'>;

export const Box = React.forwardRef<BoxElement, BoxProps>((props, ref) => {
  const { render = <div />, ...boxProps } = extractProps(
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

  const element = useRender({
    render,
    props: mergeProps<'p'>({ className: componentClassName }, boxProps),
    ref,
  });

  return element;
});

Box.displayName = componentName;
