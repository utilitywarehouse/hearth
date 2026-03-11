import { ButtonProps } from '../Button/Button.props';

export interface CardAccordionItemButtonProps extends Omit<
  ButtonProps,
  'asChild' | 'variant' | 'colorScheme'
> {
  action: 'previous' | 'next';
}
