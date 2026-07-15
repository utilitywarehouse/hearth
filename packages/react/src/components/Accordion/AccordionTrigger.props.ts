import type { ComponentPropsWithRef } from 'react';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

export type AccordionTriggerProps = Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>,
  'render' | 'className'
> & {
  className?: string;
};
