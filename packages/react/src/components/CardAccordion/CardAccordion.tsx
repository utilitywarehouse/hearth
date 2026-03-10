'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import type { ComponentPropsWithRef, ComponentRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { CardAccordionProps } from './CardAccordion.props';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'CardAccordion';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardAccordionElement = ComponentRef<'div'>;

export const CardAccordion = forwardRef<CardAccordionElement, CardAccordionProps>((props, ref) => {
  const { className, children, initialValue, ...restProps } = extractProps(props, marginPropDefs);

  const accordionProps = {
    ...restProps,
    type: 'single',
    collapsible: false,
    defaultValue: initialValue,
  } as ComponentPropsWithRef<typeof CardAccordionPrimitive.Root>;

  return (
    <CardAccordionPrimitive.Root
      ref={ref}
      className={cn(componentClassName, className)}
      {...accordionProps}
    >
      {children}
    </CardAccordionPrimitive.Root>
  );
});

CardAccordion.displayName = COMPONENT_NAME;
