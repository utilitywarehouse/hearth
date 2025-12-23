'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { AccordionTriggerProps } from './AccordionTrigger.props';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { ChevronDownSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const COMPONENT_NAME = 'AccordionTrigger';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const AccordionTrigger = ({ className, children, ...props }: AccordionTriggerProps) => {
  return (
    <AccordionPrimitive.Trigger className={cn(componentClassName, className)} {...props}>
      {children}
      <ChevronDownSmallIcon aria-hidden />
    </AccordionPrimitive.Trigger>
  );
};

AccordionTrigger.displayName = COMPONENT_NAME;
