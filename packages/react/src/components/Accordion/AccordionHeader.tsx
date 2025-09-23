import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { AccordionHeaderProps } from './AccordionHeader.props';
import { Accordion as RadixAccordion } from 'radix-ui';

const componentName = 'AccordionHeader';
const componentClassName = withGlobalPrefix(componentName);

type AccordionHeaderElement = ElementRef<'h3'>;

export const AccordionHeader = React.forwardRef<AccordionHeaderElement, AccordionHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadixAccordion.Header ref={ref} className={clsx(componentClassName, className)} {...props} />
    );
  }
);

AccordionHeader.displayName = componentName;
