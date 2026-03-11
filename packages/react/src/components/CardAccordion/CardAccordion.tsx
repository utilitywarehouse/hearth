'use client';

import { Children, forwardRef, isValidElement } from 'react';
import { cn } from '../../helpers/cn';
import type { ComponentPropsWithRef, ComponentRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { CardAccordionProps } from './CardAccordion.props';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { CardAccordionProvider } from './CardAccordion.context';
import { CardAccordionItem } from './CardAccordionItem';

const COMPONENT_NAME = 'CardAccordion';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardAccordionElement = ComponentRef<'div'>;

export const CardAccordion = forwardRef<CardAccordionElement, CardAccordionProps>((props, ref) => {
  const { className, children, initialValue, onValueChange, ...restProps } = extractProps(
    props,
    marginPropDefs
  );

  const accordionProps = {
    ...restProps,
    type: 'single',
    collapsible: false,
    defaultValue: initialValue,
    onValueChange,
  } as ComponentPropsWithRef<typeof AccordionPrimitive.Root>;

  const steps = Children.map(children, child => {
    if (isValidElement(child) && child.type === CardAccordionItem) {
      return (child.props as { value?: string }).value;
    }
    return null;
  })?.filter(Boolean) as Array<string>;

  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={cn(componentClassName, className)}
      {...accordionProps}
    >
      <CardAccordionProvider
        initialValue={initialValue || ''}
        steps={steps}
        onValueChange={onValueChange}
      >
        {children}
      </CardAccordionProvider>
    </AccordionPrimitive.Root>
  );
});

CardAccordion.displayName = COMPONENT_NAME;
