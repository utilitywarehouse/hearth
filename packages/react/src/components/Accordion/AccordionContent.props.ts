import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

export type AccordionContentProps = Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Panel>,
  'render' | 'className'
> & {
  className?: string;
  /**
   * Whether to keep the content mounted in the DOM when the item is closed.
   * @default false
   */
  keepMounted?: ComponentPropsWithoutRef<typeof AccordionPrimitive.Panel>['keepMounted'];
  /** @deprecated Use `keepMounted` instead. Will be removed in the next major version. */
  forceMount?: true;
};
