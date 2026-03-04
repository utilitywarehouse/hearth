import { cn } from '../../helpers/cn';
import type { CardContentProps } from './CardContent.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import type { ComponentRef } from 'react';
import * as React from 'react';

const COMPONENT_NAME = 'CardContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardContentElement = ComponentRef<'div'>;

export const CardContent = React.forwardRef<CardContentElement, CardContentProps>(
  ({ className, paddingBottomNone, ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        className={cn(componentClassName, className)}
        {...props}
        data-padding-bottom-none={paddingBottomNone ? '' : undefined}
      />
    );
  }
);

CardContent.displayName = COMPONENT_NAME;
