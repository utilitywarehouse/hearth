'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { AccordionContentProps } from './AccordionContent.props';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { BodyText } from '../BodyText/BodyText';
import type { ComponentRef } from 'react';
import * as React from 'react';

const COMPONENT_NAME = 'AccordionContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type AccordionContentElement = ComponentRef<'div'>;

export const AccordionContent = React.forwardRef<AccordionContentElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <AccordionPrimitive.Content
        ref={ref}
        className={cn(componentClassName, className)}
        {...props}
      >
        <BodyText as="div" className={`${componentClassName}Text`}>
          {children}
        </BodyText>
      </AccordionPrimitive.Content>
    );
  }
);

AccordionContent.displayName = COMPONENT_NAME;
