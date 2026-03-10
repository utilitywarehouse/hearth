'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { CardAccordionTriggerProps } from './CardAccordionTrigger.props';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'CardAccordionTrigger';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardAccordionTriggerElement = ComponentRef<'button'>;

export const CardAccordionTrigger = forwardRef<
  CardAccordionTriggerElement,
  CardAccordionTriggerProps
>(({ className, children, ...props }, ref) => {
  return (
    <CardAccordionPrimitive.Trigger
      ref={ref}
      className={cn(componentClassName, className)}
      {...props}
    >
      {children}
    </CardAccordionPrimitive.Trigger>
  );
});

CardAccordionTrigger.displayName = COMPONENT_NAME;
