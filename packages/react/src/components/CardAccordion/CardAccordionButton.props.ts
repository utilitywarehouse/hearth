import { ButtonProps } from '../Button/Button.props';

export interface CardAccordionButtonProps extends Omit<
  ButtonProps,
  'asChild' | 'variant' | 'colorScheme'
> {
  action: 'previous' | 'next';
}
