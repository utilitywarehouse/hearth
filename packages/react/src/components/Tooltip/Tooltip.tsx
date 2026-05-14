'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TooltipProps } from './Tooltip.props';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'Tooltip';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TooltipContentElement = ComponentRef<'div'>;

export const Tooltip = forwardRef<TooltipContentElement, TooltipProps>(
  (
    {
      children,
      heading,
      description,
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
            arrowPadding={32}
            data-testid={componentClassName}
            {...props}
          >
            <div className={`${componentClassName}Content`}>
              {heading ? (
                <BodyText size="md" weight="semibold">
                  {heading}
                </BodyText>
              ) : null}
              <BodyText size="md" as="div">
                {description}
              </BodyText>
            </div>
            <TooltipPrimitive.Arrow
              className={`${componentClassName}Arrow`}
              width={21}
              height={11}
              asChild
            >
              <svg width="21" height="11" viewBox="0 0 21 11">
                <path d="M11.9545 10.0458C11.1538 11.0474 9.63077 11.0474 8.83011 10.0458L1.1365e-06 -1L20.7846 -1L11.9545 10.0458Z" />
              </svg>
            </TooltipPrimitive.Arrow>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    );
  }
);

Tooltip.displayName = COMPONENT_NAME;
