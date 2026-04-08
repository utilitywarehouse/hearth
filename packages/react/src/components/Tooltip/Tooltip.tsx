'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TooltipProps } from './Tooltip.props';

const COMPONENT_NAME = 'Tooltip';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TooltipContentElement = ComponentRef<typeof TooltipPrimitive.Content>;

export const Tooltip = forwardRef<TooltipContentElement, TooltipProps>(
  (
    {
      children,
      content,
      open,
      defaultOpen,
      onOpenChange,
      delayDuration,
      className,
      sideOffset = 5,
      ...props
    },
    ref
  ) => {
    return (
      <TooltipPrimitive.Provider>
        <TooltipPrimitive.Root
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          delayDuration={delayDuration}
        >
          <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              ref={ref}
              className={cn(componentClassName, className)}
              sideOffset={sideOffset}
              {...props}
            >
              {content}
              <TooltipPrimitive.Arrow className={`${componentClassName}-arrow`} />
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  }
);

Tooltip.displayName = COMPONENT_NAME;
