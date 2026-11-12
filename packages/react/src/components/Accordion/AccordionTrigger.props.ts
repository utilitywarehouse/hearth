import type { ComponentPropsWithRef, CSSProperties, ReactNode } from 'react';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

export type AccordionTriggerProps = Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>,
  'render' | 'className' | 'nativeButton' | 'children' | 'style'
> & {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};
