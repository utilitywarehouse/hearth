import { ComponentPropsWithRef, ReactNode } from 'react';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';
import { ButtonProps } from '../Button/Button.props';

export interface CardAccordionItemProps extends Omit<
  ComponentPropsWithRef<typeof CardAccordionPrimitive.Item>,
  'asChild'
> {
  title?: string;
  description?: string;
  /**
   * @default h3
   */
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
  previousStepContent?: ReactNode;
  onEditClick?: ButtonProps['onClick'];
}
