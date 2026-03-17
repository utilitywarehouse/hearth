'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { CardAccordionItemProps } from './CardAccordionItem.props';
import { Accordion as AccordionPrimitive } from 'radix-ui';
import type { ComponentRef } from 'react';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { HelperText } from '../HelperText/HelperText';
import { useIds } from '../../hooks/use-ids';
import { CardAccordionItemProvider } from './CardAccordionItem.context';
import { useCardAccordion } from './CardAccordion.context';

const COMPONENT_NAME = 'CardAccordionItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardAccordionItemElement = ComponentRef<'div'>;

export const CardAccordionItem = forwardRef<CardAccordionItemElement, CardAccordionItemProps>(
  (
    {
      className,
      title,
      description,
      headingElement: HeadingElement = 'h3',
      summaryTitle,
      summaryDescription,
      children,
      value,
      onEditClick,
      ...props
    },
    ref
  ) => {
    const { setCurrentStep, setPreviousSteps, getStep, steps } = useCardAccordion();
    const step = getStep(value);
    const variant = step === 'current' ? 'emphasis' : 'subtle';
    const colorScheme = step === 'current' ? 'neutralStrong' : 'neutralSubtle';
    const triggerRef = useRef<HTMLButtonElement>(null);

    const { labelId, helperTextId } = useIds({ prefix: 'card-accordion-item' });

    useEffect(() => {
      if (step === 'current') {
        triggerRef.current?.focus();
      }
    }, [step]);

    return (
      <AccordionPrimitive.Item
        asChild
        ref={ref}
        className={cn(componentClassName, className)}
        disabled={step === 'future'}
        data-step={step}
        value={value}
        {...props}
      >
        <Card variant={variant} colorScheme={colorScheme} direction="column">
          <CardAccordionItemProvider value={{ value }}>
            <AccordionPrimitive.Header className={`${componentClassName}Header`} asChild>
              <HeadingElement>
                <AccordionPrimitive.Trigger
                  ref={triggerRef}
                  className={`${componentClassName}Trigger`}
                  aria-labelledby={labelId}
                  aria-describedby={description ? helperTextId : undefined}
                >
                  <Flex direction="column">
                    {step === 'previous' && Boolean(summaryTitle) ? (
                      <Heading asChild size="md" id={labelId}>
                        <div>{summaryTitle}</div>
                      </Heading>
                    ) : (
                      <Heading asChild size="md" id={labelId}>
                        <div>{title}</div>
                      </Heading>
                    )}
                    {description ? <HelperText id={helperTextId}>{description}</HelperText> : null}
                  </Flex>
                </AccordionPrimitive.Trigger>
                {step === 'previous' ? (
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="functional"
                    aria-describedby={labelId}
                    onClick={e => {
                      setCurrentStep(value);
                      if (steps) {
                        setPreviousSteps(steps.slice(0, steps.indexOf(value)));
                      }
                      onEditClick?.(e);
                    }}
                  >
                    Edit
                  </Button>
                ) : null}
              </HeadingElement>
            </AccordionPrimitive.Header>
            {step === 'previous' && summaryDescription ? summaryDescription : null}
            {step === 'current' ? (
              <AccordionPrimitive.Content className={`${componentClassName}Content`}>
                {children}
              </AccordionPrimitive.Content>
            ) : null}
          </CardAccordionItemProvider>
        </Card>
      </AccordionPrimitive.Item>
    );
  }
);

CardAccordionItem.displayName = COMPONENT_NAME;
