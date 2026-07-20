'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { AccordionItemProps } from './AccordionItem.props';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionHeader } from './AccordionHeader';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'AccordionItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type AccordionItemElement = ComponentRef<'div'>;

export const AccordionItem = forwardRef<AccordionItemElement, AccordionItemProps>(
  ({ className, title, description, children, headingElement, ...props }, ref) => {
    return (
      <AccordionPrimitive.Item ref={ref} className={cn(componentClassName, className)} {...props}>
        {title ? (
          <div className={`${componentClassName}Header`}>
            <AccordionHeader as={headingElement}>
              <AccordionTrigger>{title}</AccordionTrigger>
            </AccordionHeader>
            {description ? (
              <span className={`${componentClassName}Description`}>{description}</span>
            ) : null}
          </div>
        ) : null}

        {children}
      </AccordionPrimitive.Item>
    );
  }
);

AccordionItem.displayName = COMPONENT_NAME;
