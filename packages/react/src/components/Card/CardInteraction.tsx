import { cn } from '../../helpers/cn';
import { cardPropDefs } from './Card.props';
import { extractProps } from '../../helpers/extract-props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { marginPropDefs } from '../../props/margin.props';
import { sizePropDefs } from '../../props/size.props';
import { gridItemPropDefs } from '../../props/grid-item.props';
import { flexItemPropDefs } from '../../props/flex-item.props';
import { Flex } from '../Flex/Flex';
import type { CardInteractionProps } from './CardInteraction.props';
import type { ComponentRef } from 'react';
import * as React from 'react';

const COMPONENT_NAME = 'CardInteraction';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardInteractionElement = ComponentRef<'div'>;

export const CardInteraction = React.forwardRef<CardInteractionElement, CardInteractionProps>(
  (props, ref) => {
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
        className={cn(componentClassName, className)}
        {...cardProps}
        {...dataAttributeProps}
      />
    );
  }
);

CardInteraction.displayName = COMPONENT_NAME;
