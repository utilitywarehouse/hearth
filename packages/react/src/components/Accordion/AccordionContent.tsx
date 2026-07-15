'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { warn } from '../../helpers/logger';
import type { AccordionContentProps } from './AccordionContent.props';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { BodyText } from '../BodyText/BodyText';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'AccordionContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type AccordionContentElement = ComponentRef<'div'>;

export const AccordionContent = forwardRef<AccordionContentElement, AccordionContentProps>(
  ({ className, children, keepMounted, forceMount, ...props }, ref) => {
    warn(
      forceMount !== undefined,
      'AccordionContent: `forceMount` is deprecated. Use `keepMounted` instead.'
    );
    const resolvedKeepMounted = keepMounted ?? (forceMount ? true : undefined);

    return (
      <AccordionPrimitive.Panel
        ref={ref}
        className={cn(componentClassName, className)}
        keepMounted={resolvedKeepMounted}
        {...props}
      >
        <BodyText as="div" className={`${componentClassName}Text`}>
          {children}
        </BodyText>
      </AccordionPrimitive.Panel>
    );
  }
);

AccordionContent.displayName = COMPONENT_NAME;
