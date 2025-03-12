import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';

import { cardPropDefs, CardProps } from './Card.props';
import { extractProps } from '../../helpers/extract-props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { marginPropDefs } from '../../props/margin.props';
import { sizePropDefs } from '../../props/size.props';
import { gridItemPropDefs } from '../../props/grid-item.props';
import { flexItemPropDefs } from '../../props/flex-item.props';
import { Flex } from '../Flex/Flex';
import { FlexProps } from '../Flex/Flex.props';

const componentName = 'Card';
const componentClassName = withGlobalPrefix(componentName);

type CardElement = ElementRef<'div'>;

export const Card = React.forwardRef<CardElement, CardProps>((props, ref) => {
  const { className, ...cardProps } = extractProps(
    props,
    cardPropDefs,
    marginPropDefs,
    sizePropDefs,
    gridItemPropDefs,
    flexItemPropDefs
  );

  return (
    <Flex ref={ref} className={clsx(componentClassName, className)} {...(cardProps as FlexProps)} />
  );
});

Card.displayName = componentName;
