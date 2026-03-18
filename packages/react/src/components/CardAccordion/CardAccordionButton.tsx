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
          data-action="next"
          onClick={e => {
            if (onClick) {
              onClick(e);
            }

            setPreviousSteps((prev: Array<string>) => [...prev, context.value]);
            if (steps) {
              const currentIndex = steps.indexOf(context.value);
              if (currentIndex >= 0 && currentIndex < steps.length - 1) {
                setCurrentStep(steps[currentIndex + 1] as string);
              }
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
        data-action="previous"
        onClick={e => {
          if (onClick) {
            onClick(e);
          }
          if (previousSteps.length > 0) {
            const lastStep = previousSteps[previousSteps.length - 1] as string;
            setCurrentStep(lastStep);
            setPreviousSteps((prev: Array<string>) => prev.slice(0, prev.indexOf(context.value)));
          }
        }}
      >
        {children || 'Previous'}
      </Button>
    );
  }
);

CardAccordionButton.displayName = COMPONENT_NAME;
