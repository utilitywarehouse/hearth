import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { AccordionTriggerProps } from './AccordionTrigger.props';
import { Accordion as RadixAccordion } from 'radix-ui';
import { ChevronDownSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const componentName = 'AccordionTrigger';
const componentClassName = withGlobalPrefix(componentName);

type AccordionTriggerElement = ElementRef<'button'>;

export const AccordionTrigger = React.forwardRef<AccordionTriggerElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <RadixAccordion.Trigger ref={ref} className={clsx(componentClassName, className)} {...props}>
        {children}
        <ChevronDownSmallIcon className="hearth-AccordionChevron" aria-hidden />
      </RadixAccordion.Trigger>
    );
  }
);

AccordionTrigger.displayName = componentName;
