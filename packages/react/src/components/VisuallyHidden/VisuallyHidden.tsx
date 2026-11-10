'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { Slot } from 'radix-ui';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { VisuallyHiddenProps } from './VisuallyHidden.props';

const COMPONENT_NAME = 'VisuallyHidden';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type VisuallyHiddenElement = ComponentRef<'span'>;

/**
 * Use VisuallyHidden to hide content visually while keeping it available to
 * screen readers — for example, extra context for an icon-only control.
 * It renders a `span` element by default.
 *
 * @summary Hides content visually while keeping it accessible to screen readers.
 */
export const VisuallyHidden = forwardRef<VisuallyHiddenElement, VisuallyHiddenProps>(
  ({ className, asChild, children, ...props }, ref) => {
    return (
      <Slot.Root
        ref={ref}
        className={cn(componentClassName, className)}
        data-visually-hidden=""
        data-testid={componentClassName}
        {...props}
      >
        {asChild ? children : <span>{children}</span>}
      </Slot.Root>
    );
  }
);

VisuallyHidden.displayName = COMPONENT_NAME;
