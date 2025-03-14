import { CardProps } from '../Card/Card.props';

export interface SelectableCardProps extends Omit<CardProps, 'colorScheme' | 'variant'> {
  selected?: boolean;
}
