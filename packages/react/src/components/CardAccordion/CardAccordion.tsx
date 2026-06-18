'use client';

import { Children, forwardRef, isValidElement, useEffect, useState } from 'react';
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
  const { className, children, value, onValueChange, ...restProps } = extractProps(
    props,
    marginPropDefs
  );

  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    // Keep internal state in sync when the controlled `value` prop changes.
    if (value !== undefined) {
      setCurrentValue(value);
    }
  }, [value]);

  const handleValueChange = (newValue: string) => {
    setCurrentValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const accordionProps = {
    ...restProps,
    type: 'single',
    collapsible: false,
    value: currentValue,
    onValueChange: handleValueChange,
  } as ComponentPropsWithRef<typeof AccordionPrimitive.Root>;

  const steps: Array<string> = (
    Children.map(children, child => {
      if (isValidElement(child) && child.type === CardAccordionItem) {
        return (child.props as { value?: string }).value;
      }
      return null;
    }) ?? []
  ).filter(Boolean);

  if (steps.length === 0) {
    if (process.env.NODE_ENV !== 'production') {
      // CardAccordionProvider assumes at least one step (steps[0]).
      // Rendering CardAccordion without any CardAccordionItem children can cause runtime errors.
      // This guard ensures we fail fast in development and avoid crashing in production.
      // Make sure to pass at least one <CardAccordionItem value="..."> as a child of <CardAccordion>.

      console.error(
        '[CardAccordion]: No CardAccordionItem children with a "value" prop were found. ' +
          'CardAccordion requires at least one CardAccordionItem child.'
      );
    }
    return null;
  }

  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={cn(componentClassName, className)}
      data-testid={componentClassName}
      {...accordionProps}
    >
      <CardAccordionProvider
        steps={steps}
        onValueChange={onValueChange}
        setCurrentValue={setCurrentValue}
      >
        {children}
      </CardAccordionProvider>
    </AccordionPrimitive.Root>
  );
});

CardAccordion.displayName = COMPONENT_NAME;
