import { ComponentPropsWithRef, ReactNode } from 'react';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';
import { ButtonProps } from '../Button/Button.props';

export interface CardAccordionItemProps extends Omit<
  ComponentPropsWithRef<typeof CardAccordionPrimitive.Item>,
  'asChild' | 'value'
> {
  value: CardAccordionPrimitive.AccordionSingleProps['value'];
  title: string;
  description?: string;
  summaryTitle?: string;
  summaryDescription?: ReactNode;
  /**
   * @default h3
   */
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
  onEditClick?: ButtonProps['onClick'];
}
