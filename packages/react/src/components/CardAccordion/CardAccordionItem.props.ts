import { ComponentPropsWithRef, ReactNode } from 'react';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';
import { ButtonProps } from '../Button/Button.props';

export interface CardAccordionItemProps extends Omit<
  ComponentPropsWithRef<typeof CardAccordionPrimitive.Item>,
  'asChild' | 'value'
> {
  /**
   * A unique identifier for the step, used to track progress through the
   * CardAccordion.
   */
  value: string;
  /**
   * The step heading, shown while the step is current.
   */
  title: string;
  /**
   * Helper text shown below `title` while the step is current.
   */
  description?: string;
  /**
   * Heading shown instead of `title` once the step becomes `previous`.
   */
  summaryTitle?: string;
  /**
   * Content shown below `summaryTitle` once the step becomes `previous`.
   */
  summaryDescription?: ReactNode;
  /**
   * Sets the heading element rendered for `title`.
   * @default h3
   */
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4';
  /**
   * Called when the user clicks the Edit button on a completed (`previous`)
   * step.
   */
  onEditClick?: ButtonProps['onClick'];
}
