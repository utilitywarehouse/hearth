'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ComponentPropsWithoutRef, ComponentRef } from 'react';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'CardAccordionFooter';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardAccordionFooterElement = ComponentRef<'div'>;

export const CardAccordionFooter = forwardRef<
  CardAccordionFooterElement,
  Omit<ComponentPropsWithoutRef<'div'>, 'color'>
>(({ className, children, ...props }, ref) => {
  return (
    <Flex
      ref={ref}
      className={cn(componentClassName, className)}
      {...props}
      spacing="sm"
      direction={{ mobile: 'column-reverse', tablet: 'row' }}
      alignItems={{ mobile: 'stretch', tablet: 'start' }}
    >
      {children}
    </Flex>
  );
});

CardAccordionFooter.displayName = COMPONENT_NAME;
