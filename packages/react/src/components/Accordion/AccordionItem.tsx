import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { AccordionItemProps } from './AccordionItem.props';
import { Accordion as RadixAccordion } from 'radix-ui';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionHeader } from './AccordionHeader';

const componentName = 'AccordionItem';
const componentClassName = withGlobalPrefix(componentName);

type AccordionItemElement = ElementRef<'div'>;

export const AccordionItem = React.forwardRef<AccordionItemElement, AccordionItemProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <RadixAccordion.Item ref={ref} className={clsx(componentClassName, className)} {...props}>
        {title ? (
          <div className="hearth-AccordionItemHeader">
            <AccordionHeader>
              <AccordionTrigger>{title}</AccordionTrigger>
            </AccordionHeader>
            {description ? (
              <span className="hearth-AccordionItemDescription">{description}</span>
            ) : null}
          </div>
        ) : null}

        {children ? children : null}
      </RadixAccordion.Item>
    );
  }
);

AccordionItem.displayName = componentName;
