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
  ({ className, as: Tag = 'h3', children, ...props }, ref) => {
    return (
      <CardAccordionPrimitive.Header asChild className={cn(componentClassName, className)} {...props}>
        <Tag ref={ref}>{children}</Tag>
      </CardAccordionPrimitive.Header>
    );
  }
);

CardAccordionHeader.displayName = COMPONENT_NAME;
