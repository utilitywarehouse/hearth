'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TooltipProps } from './Tooltip.props';

const COMPONENT_NAME = 'Tooltip';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TooltipContentElement = ComponentRef<'div'>;

export const Tooltip = forwardRef<TooltipContentElement, TooltipProps>(
  (
    {
      children,
      content,
      open,
      defaultOpen,
      onOpenChange,
      className,
      align = 'topCenter',
      ...props
    },
    ref
  ) => {
    const rootProps = { open, defaultOpen, onOpenChange };

    const alignmentTranslation: {
      [key: string]: {
        side: 'bottom' | 'top' | 'right' | 'left';
        align: 'start' | 'end' | 'center';
      };
    } = {
      rightCenter: { side: 'right', align: 'center' },
      leftCenter: { side: 'left', align: 'center' },
      topLeft: { side: 'top', align: 'end' },
      topCenter: { side: 'top', align: 'center' },
      topRight: { side: 'top', align: 'start' },
      bottomLeft: { side: 'bottom', align: 'end' },
      bottomCenter: { side: 'bottom', align: 'center' },
      bottomRight: { side: 'bottom', align: 'start' },
    };

    return (
      <TooltipPrimitive.Root {...rootProps}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            ref={ref}
            className={cn(componentClassName, className)}
            avoidCollisions={true}
            sticky="partial"
            {...alignmentTranslation[align]}
            sideOffset={4}
            // arrowPadding={-40}
            {...props}
          >
            {content}
            <TooltipPrimitive.Arrow className={`${componentClassName}-arrow`} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    );
  }
);

Tooltip.displayName = COMPONENT_NAME;
