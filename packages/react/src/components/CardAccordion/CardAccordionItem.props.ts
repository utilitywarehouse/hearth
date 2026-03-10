import { ComponentPropsWithRef, ReactNode } from 'react';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';

export interface CardAccordionItemProps
  extends
    Omit<ComponentPropsWithRef<typeof CardAccordionPrimitive.Item>, 'asChild'>,
    Omit<SectionHeaderProps, 'defaultValue' | 'trailingContent'> {
  previousStepContent?: ReactNode;
}
