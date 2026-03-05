import { forwardRef, Children } from 'react';
import { cn } from '../../helpers/cn';
import type { CardActionsProps } from './CardActions.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { Flex } from '../Flex/Flex';
import type { ComponentRef } from 'react';

type CardActionsElement = ComponentRef<'ul'>;

const COMPONENT_NAME = 'CardActions';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const CardActions = forwardRef<CardActionsElement, CardActionsProps>((props, ref) => {
  const {
    className,
    as: Tag = 'ul',
    direction,
    children,
    ...cardActionsProps
  } = extractProps(props, marginPropDefs);

  return (
    <Flex
      ref={ref}
      asChild
      role="list"
      className={cn(componentClassName, className)}
      direction={direction}
    >
      <Tag {...cardActionsProps}>
        {Children.map(children, child => (
          <li className={`${componentClassName}Item`}>{child}</li>
        ))}
      </Tag>
    </Flex>
  );
});

CardActions.displayName = COMPONENT_NAME;
