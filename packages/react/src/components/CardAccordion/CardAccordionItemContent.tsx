'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { CardAccordionItemContentProps } from './CardAccordionItemContent.props';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { BodyText } from '../BodyText/BodyText';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

const COMPONENT_NAME = 'CardAccordionItemContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardAccordionItemContentElement = ComponentRef<'div'>;

export const CardAccordionItemContent = forwardRef<
  CardAccordionItemContentElement,
  CardAccordionItemContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      asChild
      ref={ref}
      className={cn(componentClassName, className)}
      {...props}
    >
      <BodyText as="div">{children}</BodyText>
    </AccordionPrimitive.Content>
  );
});

CardAccordionItemContent.displayName = COMPONENT_NAME;
