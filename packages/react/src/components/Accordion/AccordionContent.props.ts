import type { ComponentPropsWithRef, CSSProperties, ReactNode } from 'react';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

export type AccordionContentProps = Omit<
  ComponentPropsWithRef<typeof AccordionPrimitive.Panel>,
  'render' | 'className' | 'children' | 'style'
> & {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /**
   * Whether to keep the content mounted in the DOM when the item is closed.
   * @default false
   */
  keepMounted?: ComponentPropsWithRef<typeof AccordionPrimitive.Panel>['keepMounted'];
};
