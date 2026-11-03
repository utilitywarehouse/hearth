import type { ComponentPropsWithRef } from 'react';
import { Accordion as AccordionPrimitive } from 'radix-ui';

export interface AccordionContentProps extends Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Content>,
  'asChild' | 'forceMount'
> {
  /**
   * Keeps the accordion item's content mounted in the DOM when collapsed.
   *
   * @default false
   */
  keepMounted?: boolean;
  /**
   * Keeps the accordion item's content mounted in the DOM when collapsed.
   * Prefer `keepMounted`.
   *
   * @deprecated Use `keepMounted` instead. Will be removed when Accordion migrates to Base UI.
   */
  forceMount?: boolean;
}
