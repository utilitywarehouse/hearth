'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { AccordionItemProps } from './AccordionItem.props';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { AccordionTrigger } from './AccordionTrigger';
import { AccordionHeader } from './AccordionHeader';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'AccordionItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type AccordionItemElement = ComponentRef<'div'>;

/**
 * Use AccordionItem for a single expandable/collapsible section within an
 * Accordion. Set `title` (and optionally `description`) for the built-in
 * header, or omit `title` and compose `AccordionHeader`, `AccordionTrigger`,
 * and `AccordionContent` manually as children.
 *
 * @summary A single expandable/collapsible section within an Accordion.
 */
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
