'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { CardAccordionItemProps } from './CardAccordionItem.props';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';
import { CardAccordionTrigger } from './CardAccordionTrigger';
import { CardAccordionHeader } from './CardAccordionHeader';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'CardAccordionItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardAccordionItemElement = ComponentRef<'div'>;

export const CardAccordionItem = forwardRef<CardAccordionItemElement, CardAccordionItemProps>(
  ({ className, title, description, children, headingElement, ...props }, ref) => {
    return (
      <CardAccordionPrimitive.Item ref={ref} className={cn(componentClassName, className)} {...props}>
        {title ? (
          <div className={`${componentClassName}Header`}>
            <CardAccordionHeader as={headingElement}>
              <CardAccordionTrigger>{title}</CardAccordionTrigger>
            </CardAccordionHeader>
            {description ? (
              <span className={`${componentClassName}Description`}>{description}</span>
            ) : null}
          </div>
        ) : null}

        {children}
      </CardAccordionPrimitive.Item>
    );
  }
);

CardAccordionItem.displayName = COMPONENT_NAME;
