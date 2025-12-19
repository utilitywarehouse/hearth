'use client';

import clsx from 'clsx';
import { gridPropDefs } from './Grid.props';
import type { GridProps } from './Grid.props';
import { Slot } from 'radix-ui';
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
import { textAlignPropDefs } from '../../props/text-align.props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { borderColorPropDefs } from '../../props/border-color.props';
import { borderRadiusPropDefs } from '../../props/border-radius.props';
import { alignItemsPropDefs } from '../../props/align-items.props';
import { alignContentPropDefs } from '../../props/align-content.props';
import { justifyContentPropDefs } from '../../props/justify-content.props';
import { borderStylePropDefs } from '../../props/border-style.props';
import { borderWidthPropDefs } from '../../props/border-width.props';

const COMPONENT_NAME = 'Grid';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Grid = (props: GridProps) => {
  const {
    className,
    asChild,
    defaultResponsiveColumns,
    as: Tag = 'div',
    children,
    ...gridProps
  } = extractProps(
    props,
    gridPropDefs,
    alignItemsPropDefs,
    alignContentPropDefs,
    justifyContentPropDefs,
    positionPropDefs,
    paddingPropDefs,
    marginPropDefs,
    colorPropDefs,
    backgroundColorPropDefs,
    gapPropDefs,
    sizePropDefs,
    borderStylePropDefs,
    borderWidthPropDefs,
    borderRadiusPropDefs,
    borderColorPropDefs,
    gridItemPropDefs,
    flexItemPropDefs,
    spacingPropDefs,
    textAlignPropDefs,
    textTransformPropDefs
  );

  return (
    <Slot.Root
      className={clsx(componentClassName, className)}
      data-responsive-columns={defaultResponsiveColumns ? '' : undefined}
      {...gridProps}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot.Root>
  );
};

Grid.displayName = COMPONENT_NAME;
