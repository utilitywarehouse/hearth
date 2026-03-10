'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ComponentRef } from 'react';
import { Button } from '../Button/Button';
import type { CardAccordionButtonProps } from './CardAccordionButton.props';

const COMPONENT_NAME = 'CardAccordionButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardAccordionButtonElement = ComponentRef<'button'>;

export const CardAccordionButton = forwardRef<CardAccordionButtonElement, CardAccordionButtonProps>(
  ({ className, children, action, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(componentClassName, className)}
        {...props}
        variant={action === 'next' ? 'solid' : 'outline'}
        colorScheme={action === 'next' ? 'highlight' : 'functional'}
      >
        {children || action === 'next' ? 'Next' : 'Previous'}
      </Button>
    );
  }
);

CardAccordionButton.displayName = COMPONENT_NAME;
