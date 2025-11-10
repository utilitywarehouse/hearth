import { CardProps } from './Card.props';

export type CardContentProps = Omit<CardProps, 'variant' | 'colorScheme' | 'as'>;
