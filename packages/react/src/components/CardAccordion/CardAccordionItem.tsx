'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { CardAccordionItemProps } from './CardAccordionItem.props';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';
import type { ComponentRef } from 'react';
import { Card } from '../Card/Card';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { Button } from '../Button/Button';
import { useCardAccordion } from './CardAccordion.context';
import { CardAccordionItemProvider } from './CardAccordionItem.context';

const COMPONENT_NAME = 'CardAccordionItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardAccordionItemElement = ComponentRef<'div'>;

export const CardAccordionItem = forwardRef<CardAccordionItemElement, CardAccordionItemProps>(
  (
    {
      className,
      heading = 'Card accordion',
      headingElement = 'h2',
      helperText,
      previousStepContent,
      children,
      value,
      step,
      onEditClick,
      ...props
    },
    ref
  ) => {
    const variant = step === 'current' ? 'emphasis' : 'subtle';
    const colorScheme = step === 'current' ? 'neutralStrong' : 'neutralSubtle';

    return (
      <CardAccordionPrimitive.Item
        asChild
        ref={ref}
        className={cn(componentClassName, className)}
        disabled={step === 'future'}
        data-step={step}
        value={value}
        {...props}
      >
        <Card variant={variant} colorScheme={colorScheme} direction="column">
          <CardAccordionPrimitive.Header asChild>
            <SectionHeader
              heading={heading}
              headingElement={headingElement}
              helperText={helperText}
              trailingContent={
                step === 'previous' ? (
                  <Button size="sm" variant="ghost" colorScheme="functional" onClick={onEditClick}>
                    Edit
                  </Button>
                ) : null
              }
            />
          </CardAccordionPrimitive.Header>
          {step === 'previous' && previousStepContent ? previousStepContent : null}
          {step === 'current' ? children : null}
        </Card>
      </CardAccordionPrimitive.Item>
    );
  }
);

CardAccordionItem.displayName = COMPONENT_NAME;
