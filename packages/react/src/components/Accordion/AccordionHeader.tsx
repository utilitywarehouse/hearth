'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import type { AccordionHeaderProps } from './AccordionHeader.props';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'AccordionHeader';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type AccordionHeaderElement = ComponentRef<'h3'>;

export const AccordionHeader = forwardRef<AccordionHeaderElement, AccordionHeaderProps>(
  ({ className, as: Tag = 'h3', children, ...props }, ref) => {
    return (
      <AccordionPrimitive.Header
        ref={ref}
        className={cn(componentClassName, className)}
        render={<Tag />}
        {...props}
      >
        {children}
      </AccordionPrimitive.Header>
    );
  }
);

AccordionHeader.displayName = COMPONENT_NAME;
