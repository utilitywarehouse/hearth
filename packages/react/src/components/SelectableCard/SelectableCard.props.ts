import { PropDef } from '../../props/prop-def';
import { CardProps } from '../Card/Card.props';

const borderRadiusValues = ['md', 'xl'] as const;

export const selectableCardPropDefs = {
  borderRadius: {
    className: 'border-radius',
    tokens: borderRadiusValues,
    responsive: false,
    default: 'md',
  },
} satisfies {
  borderRadius: PropDef<(typeof borderRadiusValues)[number]>;
};

export interface SelectableCardProps
  extends Omit<CardProps, 'colorScheme' | 'variant' | 'padding'> {
  selected?: boolean;
  borderRadius?: (typeof borderRadiusValues)[number];
  compact?: boolean;
}
