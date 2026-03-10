import type { ComponentPropsWithRef } from 'react';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';

export type CardAccordionHeaderProps = Omit<
  ComponentPropsWithRef<typeof CardAccordionPrimitive.Header>,
  'asChild'
>;
