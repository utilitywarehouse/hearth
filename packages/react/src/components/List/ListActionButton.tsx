'use client';

import * as React from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'ListActionButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ListActionButtonElement = ComponentRef<'button'>;

export const ListActionButton = React.forwardRef<
  ListActionButtonElement,
  React.ComponentPropsWithRef<'button'>
>(({ className, children, disabled, onClick, ...props }, ref) => {
  return (
    <BodyText ref={ref} size="md" weight="semibold" asChild>
      <button
        className={cn(componentClassName, className)}
        {...props}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onClick}
      >
        {children}
        <ChevronRightSmallIcon />
      </button>
    </BodyText>
  );
});

ListActionButton.displayName = COMPONENT_NAME;
