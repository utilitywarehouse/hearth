import { PropDef } from '../../props/prop-def';
import { CardProps } from '../Card/Card.props';
import { LinkProps } from '../Link/Link.props';

const colorSchemes = ['white', 'warmWhite'] as const;

export const navigationalCardPropDefs = {
  colorScheme: {
    className: 'color-scheme',
    tokens: colorSchemes,
    responsive: false,
    default: 'white',
  },
} satisfies {
  colorScheme: PropDef<(typeof colorSchemes)[number]>;
};
export interface NavigationalCardProps
  extends Omit<LinkProps, 'asChild'>,
    Omit<CardProps, 'colorScheme' | keyof LinkProps> {
  /**
   * Set the color-scheme
   * @default white
   */
  colorScheme?: (typeof colorSchemes)[number];
  title?: string;
  content?: string;
  linkLabel?: string;
}
