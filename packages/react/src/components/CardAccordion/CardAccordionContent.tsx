'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { CardAccordionContentProps } from './CardAccordionContent.props';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';
import { BodyText } from '../BodyText/BodyText';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

const COMPONENT_NAME = 'CardAccordionContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardAccordionContentElement = ComponentRef<'div'>;

export const CardAccordionContent = forwardRef<CardAccordionContentElement, CardAccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <CardAccordionPrimitive.Content
        ref={ref}
        className={cn(componentClassName, className)}
        {...props}
      >
        <BodyText as="div" className={`${componentClassName}Text`}>
          {children}
        </BodyText>
      </CardAccordionPrimitive.Content>
    );
  }
);

CardAccordionContent.displayName = COMPONENT_NAME;
