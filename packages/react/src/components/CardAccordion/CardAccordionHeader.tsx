'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';
import type { CardAccordionHeaderProps } from './CardAccordionHeader.props';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'CardAccordionHeader';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardAccordionHeaderElement = ComponentRef<'h3'>;

export const CardAccordionHeader = forwardRef<CardAccordionHeaderElement, CardAccordionHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <CardAccordionPrimitive.Header
        ref={ref}
        className={cn(componentClassName, className)}
        asChild
        {...props}
      >
        <div>{children}</div>
      </CardAccordionPrimitive.Header>
    );
  }
);

CardAccordionHeader.displayName = COMPONENT_NAME;
