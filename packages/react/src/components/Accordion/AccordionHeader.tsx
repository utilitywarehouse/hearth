'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import type { AccordionHeaderProps } from './AccordionHeader.props';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'AccordionHeader';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type AccordionHeaderElement = ComponentRef<'h3'>;

export const AccordionHeader = forwardRef<AccordionHeaderElement, AccordionHeaderProps>(
  ({ className, as: Tag = 'h3', children, ...props }, ref) => {
    return (
      <AccordionPrimitive.Header asChild className={cn(componentClassName, className)} {...props}>
        <Tag ref={ref}>{children}</Tag>
      </AccordionPrimitive.Header>
    );
  }
);

AccordionHeader.displayName = COMPONENT_NAME;
