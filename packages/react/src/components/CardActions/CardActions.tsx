import * as React from 'react';
import clsx from 'clsx';
import type { CardActionsProps } from './CardActions.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'CardActions';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardActionsElement = ElementRef<'ol'>;

export const CardActions = React.forwardRef<CardActionsElement, CardActionsProps>(
  ({ direction, children, ...props }, ref) => {
    const { as: Tag = 'ul', className, ...cardActionsProps } = extractProps(props, marginPropDefs);

    const listChildren = React.Children.map(children, child => (
      <li className={`${componentClassName}Item`}>{child}</li>
    ));

    return (
      <Flex
        asChild
        role="list"
        className={clsx(componentClassName, className)}
        direction={direction}
        data-direction={direction}
      >
        <Tag ref={ref} {...cardActionsProps}>
          {listChildren}
        </Tag>
      </Flex>
    );
  }
);

CardActions.displayName = COMPONENT_NAME;
