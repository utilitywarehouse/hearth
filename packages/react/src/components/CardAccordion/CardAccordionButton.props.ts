import { ButtonProps } from '../Button/Button.props';

export interface CardAccordionButtonProps extends Omit<
  ButtonProps,
  'asChild' | 'variant' | 'colorScheme'
> {
  /**
   * Sets which step-navigation action the button performs.
   */
  action: 'previous' | 'next';
}
