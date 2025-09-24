import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';

import { cardPropDefs } from './Card.props';
import { extractProps } from '../../helpers/extract-props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { marginPropDefs } from '../../props/margin.props';
import { sizePropDefs } from '../../props/size.props';
import { gridItemPropDefs } from '../../props/grid-item.props';
import { flexItemPropDefs } from '../../props/flex-item.props';
import { Flex } from '../Flex/Flex';
import { FlexProps } from '../Flex/Flex.props';
import { CardActionProps } from './CardAction.props';

const COMPONENT_NAME = 'CardAction';
const { displayName, componentClassName } = withGlobalPrefix(COMPONENT_NAME);

type CardActionElement = ElementRef<'div'>;

export const CardAction = React.forwardRef<CardActionElement, CardActionProps>((props, ref) => {
  const { className, secondary, ...cardProps } = extractProps(
    props,
    cardPropDefs,
    marginPropDefs,
    sizePropDefs,
    gridItemPropDefs,
    flexItemPropDefs
  );

  const dataAttributeProps = {
    'data-secondary': secondary ? '' : undefined,
  };

  return (
    <Flex
      ref={ref}
      className={clsx(componentClassName, className)}
      {...(cardProps as FlexProps)}
      {...dataAttributeProps}
    />
  );
});

CardAction.displayName = displayName;
