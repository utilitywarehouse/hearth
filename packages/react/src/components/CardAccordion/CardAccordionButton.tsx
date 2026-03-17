'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ComponentRef } from 'react';
import { Button } from '../Button/Button';
import type { CardAccordionButtonProps } from './CardAccordionButton.props';
import { useCardAccordion } from './CardAccordion.context';
import { useCardAccordionItem } from './CardAccordionItem.context';

const COMPONENT_NAME = 'CardAccordionButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardAccordionButtonElement = ComponentRef<'button'>;

export const CardAccordionButton = forwardRef<CardAccordionButtonElement, CardAccordionButtonProps>(
  ({ className, children, action, onClick, ...props }, ref) => {
    const { steps, setPreviousSteps, setCurrentStep, previousSteps } = useCardAccordion();
    const context = useCardAccordionItem();
    if (action === 'next') {
      return (
        <Button
          ref={ref}
          className={cn(componentClassName, className)}
          type="button"
          {...props}
          variant="solid"
          colorScheme="highlight"
          onClick={e => {
            if (onClick) {
              onClick(e);
            }
            if (context?.value) {
              setPreviousSteps(steps => [...steps, context.value]);
              setCurrentStep(steps[steps.indexOf(context.value) + 1] as string);
            }
          }}
        >
          {children || 'Next'}
        </Button>
      );
    }

    return (
      <Button
        ref={ref}
        className={cn(componentClassName, className)}
        type="button"
        {...props}
        variant="outline"
        colorScheme="functional"
        onClick={e => {
          if (onClick) {
            onClick(e);
          }
          setCurrentStep(previousSteps[previousSteps.length - 1] as string);
          setPreviousSteps(prev => prev.slice(0, prev.indexOf(context?.value as string)));
        }}
      >
        {children || 'Previous'}
      </Button>
    );
  }
);

CardAccordionButton.displayName = COMPONENT_NAME;
