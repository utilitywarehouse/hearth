import * as React from 'react';
import clsx from 'clsx';

import { gridPropDefs, type GridProps } from './Grid.props';

import type { ElementRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { extractProps } from '../../helpers/extract-props';
import { paddingPropDefs } from '../../props/padding.props';
import { colorPropDefs } from '../../props/color.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { marginPropDefs } from '../../props/margin.props';
import { gapPropDefs } from '../../props/gap.props';
import { sizePropDefs } from '../../props/size.props';
import { gridItemPropDefs } from '../../props/grid-item.props';
import { flexItemPropDefs } from '../../props/flex-item.props';
import { spacingPropDefs } from '../../props/spacing.props';
import { backgroundColorPropDefs } from '../../props/background-color.props';
import { positionPropDefs } from '../../props/position.props';
import { borderPropDefs } from '../../props/border.props';
import { textAlignPropDefs } from '../../props/text-align.props';

const componentName = 'Grid';
const componentClassName = withGlobalPrefix(componentName);

type GridElement = ElementRef<'div'>;

export const Grid = React.forwardRef<GridElement, GridProps>((props, ref) => {
  const {
    className,
    asChild,
    defaultResponsiveColumns,
    as: Tag = 'div',
    ...gridProps
  } = extractProps(
    props,
    gridPropDefs,
    positionPropDefs,
    paddingPropDefs,
    marginPropDefs,
    colorPropDefs,
    backgroundColorPropDefs,
    gapPropDefs,
    sizePropDefs,
    borderPropDefs,
    gridItemPropDefs,
    flexItemPropDefs,
    spacingPropDefs,
    textAlignPropDefs
  );

  const dataAttributeProps = {
    'data-responsive-columns': defaultResponsiveColumns ? '' : undefined,
  };

  const Component = asChild ? Slot : Tag;

  return (
    <Component
      ref={ref}
      className={clsx(componentClassName, className)}
      {...gridProps}
      {...dataAttributeProps}
    />
  );
});

Grid.displayName = componentName;
