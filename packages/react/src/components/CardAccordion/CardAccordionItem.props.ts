import { ComponentPropsWithRef, ReactNode } from 'react';
import { Accordion as CardAccordionPrimitive } from 'radix-ui';
import { SectionHeaderProps } from '../SectionHeader/SectionHeader.props';
import { ButtonProps } from '../Button/Button.props';

export interface CardAccordionItemProps
  extends
    Omit<ComponentPropsWithRef<typeof CardAccordionPrimitive.Item>, 'asChild'>,
    Omit<SectionHeaderProps, 'defaultValue' | 'trailingContent'> {
  previousStepContent?: ReactNode;
  step: 'previous' | 'current' | 'future';
  onEditClick?: ButtonProps['onClick'];
}
