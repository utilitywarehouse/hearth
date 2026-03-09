import type { ComponentPropsWithRef } from 'react';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';

export type CardAccordionContentProps = Omit<
  ComponentPropsWithRef<typeof CardAccordionPrimitive.Content>,
  'asChild'
>;
