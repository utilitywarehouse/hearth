import { CardProps } from './Card.props';

export interface CardContentProps extends Omit<CardProps, 'variant' | 'colorScheme' | 'as'> {
  paddingBottomNone?: boolean;
}
