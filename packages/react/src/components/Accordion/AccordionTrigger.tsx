'use client';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { AccordionTriggerProps } from './AccordionTrigger.props';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { ChevronDownSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const COMPONENT_NAME = 'AccordionTrigger';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const AccordionTrigger = ({ className, children, ...props }: AccordionTriggerProps) => {
  return (
    <AccordionPrimitive.Trigger className={clsx(componentClassName, className)} {...props}>
      {children}
      <ChevronDownSmallIcon className="hearth-AccordionChevron" aria-hidden />
    </AccordionPrimitive.Trigger>
  );
};

AccordionTrigger.displayName = COMPONENT_NAME;
