import { CardProps } from './Card.props';

export interface CardContentProps extends Omit<CardProps, 'variant' | 'colorScheme' | 'as'> {
  /**
   * Removes the bottom padding, useful when `CardActions` sits directly
   * below with no additional spacing needed.
   */
  paddingBottomNone?: boolean;
}
