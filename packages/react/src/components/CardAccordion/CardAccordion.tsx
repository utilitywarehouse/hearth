'use client';

import { Children, forwardRef, isValidElement, useEffect, useState } from 'react';
import { cn } from '../../helpers/cn';
import type { ComponentPropsWithRef, ComponentRef, ReactNode } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { CardAccordionProps } from './CardAccordion.props';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { CardAccordionContextValue, CardAccordionProvider } from './CardAccordion.context';
import { CardAccordionItemProps } from './CardAccordionItem.props';

const COMPONENT_NAME = 'CardAccordion';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardAccordionElement = ComponentRef<'div'>;

export const CardAccordion = forwardRef<CardAccordionElement, CardAccordionProps>((props, ref) => {
  const { className, children, initialValue, ...restProps } = extractProps(props, marginPropDefs);

  const [steps, setSteps] = useState<Array<string>>([]);
  const [currentStep, setCurrentStep] = useState<string>(initialValue);
  const [previousSteps, setPreviousSteps] = useState<Array<string>>([]);

  useEffect(() => {
    const stepValues = Children.map(children, child => {
      if (isValidElement<CardAccordionItemProps>(child)) {
        return child.props.value;
      }
      return null;
    });
    setSteps(stepValues as Array<string>);
  }, [children]);

  const contextValue = {
    currentStep,
    previousSteps,
    setCurrentStep: (step: string) => {
      setCurrentStep(step);
    },
    setPreviousSteps: (step: string) => {
      setPreviousSteps(steps => [...steps, step]);
    },
  } as CardAccordionContextValue;

  const accordionProps = {
    ...restProps,
    type: 'single',
    collapsible: false,
    defaultValue: initialValue,
    value: currentStep,
    onValueChange: (value: string) => {
      console.log({ value });
      setCurrentStep(value);
    },
  } as ComponentPropsWithRef<typeof CardAccordionPrimitive.Root>;

  console.log({ currentStep, previousSteps });

  return (
    <CardAccordionPrimitive.Root
      ref={ref}
      className={cn(componentClassName, className)}
      {...accordionProps}
    >
      <CardAccordionProvider value={contextValue}>{children}</CardAccordionProvider>
    </CardAccordionPrimitive.Root>
  );
});

CardAccordion.displayName = COMPONENT_NAME;
