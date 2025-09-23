import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { AccordionItemProps } from './AccordionItem.props';
import { Accordion as RadixAccordion } from 'radix-ui';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionHeader } from './AccordionHeader';
import { BodyText } from '../BodyText/BodyText';

const componentName = 'AccordionItem';
const componentClassName = withGlobalPrefix(componentName);

type AccordionItemElement = ElementRef<'div'>;

export const AccordionItem = React.forwardRef<AccordionItemElement, AccordionItemProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <RadixAccordion.Item ref={ref} className={clsx(componentClassName, className)} {...props}>
        {title ? (
          <AccordionHeader>
            <AccordionTrigger>{title}</AccordionTrigger>
            {description ? <BodyText size="md">{description}</BodyText> : null}
          </AccordionHeader>
        ) : null}

        {children ? children : null}
      </RadixAccordion.Item>
    );
  }
);

AccordionItem.displayName = componentName;
