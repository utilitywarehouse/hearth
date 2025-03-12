import { PropDef } from '../../props/prop-def';
import { FlexProps } from '../Flex/Flex.props';
import { PaddingProps } from '../../props/padding.props';

const variants = ['emphasis', 'subtle'] as const;
const colorSchemes = [
  'white',
  'warmWhite',
  'purple',
  'energyGreen',
  'broadbandBlue',
  'mobileRose',
  'insuranceOrange',
  'cashbackLilac',
] as const;
const paddingValues = ['none', 'sm', 'md', 'lg'] as const;

export const cardPropDefs = {
  variant: { className: 'variant', tokens: variants, responsive: false, default: 'emphasis' },
  colorScheme: {
    className: 'color-scheme',
    tokens: colorSchemes,
    responsive: false,
    default: 'white',
  },
  padding: { className: 'padding', tokens: paddingValues, responsive: false, default: 'lg' },
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
  colorScheme: PropDef<(typeof colorSchemes)[number]>;
  padding: PropDef<(typeof paddingValues)[number]>;
};

export interface CardProps
  extends Omit<FlexProps, 'color' | 'backgroundColor' | 'as' | 'asChild' | keyof PaddingProps> {
  /**
   * Set the variant
   * @default emphasis
   */
  variant?: (typeof variants)[number];
  /**
   * Set the color-scheme
   * @default white
   */
  colorScheme?: (typeof colorSchemes)[number];
  /**
   * Set the padding
   * @default lg
   */
  padding?: (typeof paddingValues)[number];
}
