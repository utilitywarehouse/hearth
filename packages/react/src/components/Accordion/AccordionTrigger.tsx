'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { AccordionTriggerProps } from './AccordionTrigger.props';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { ChevronDownSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'AccordionTrigger';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type AccordionTriggerElement = ComponentRef<'button'>;

export const AccordionTrigger = React.forwardRef<AccordionTriggerElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(componentClassName, className)}
        {...props}
      >
        {children}
        <ChevronDownSmallIcon aria-hidden />
      </AccordionPrimitive.Trigger>
    );
  }
);

AccordionTrigger.displayName = COMPONENT_NAME;
