import type { ComponentPropsWithRef } from 'react';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';

export type CardAccordionTriggerProps = Omit<
  ComponentPropsWithRef<typeof CardAccordionPrimitive.Trigger>,
  'asChild'
>;
