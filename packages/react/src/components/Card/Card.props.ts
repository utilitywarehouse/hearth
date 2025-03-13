import { PropDef } from '../../props/prop-def';
import { FlexProps } from '../Flex/Flex.props';
import { PaddingProps } from '../../props/padding.props';

const variants = ['emphasis', 'subtle'] as const;
const whiteColorSchemes = ['white', 'warmWhite'];
const nonWhiteColorSchemes = [
  'purple',
  'energyGreen',
  'broadbandBlue',
  'mobileRose',
  'insuranceOrange',
  'cashbackLilac',
] as const;
const colorSchemes = [...whiteColorSchemes, ...nonWhiteColorSchemes] as const;

export const cardPropDefs = {
  variant: { className: 'variant', tokens: variants, responsive: false, default: 'emphasis' },
  colorScheme: {
    className: 'color-scheme',
    tokens: colorSchemes,
    responsive: false,
    default: 'white',
  },
  paddingNone: { className: 'padding-none', responsive: false },
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
  colorScheme: PropDef<(typeof colorSchemes)[number]>;
  paddingNone: PropDef<boolean>;
};

export type CardProps = Omit<
  FlexProps,
  'color' | 'backgroundColor' | 'as' | 'asChild' | keyof PaddingProps
> &
  (
    | {
        /**
         * Sets the card's visual variant
         */
        variant?: 'emphasis';
        /**
         * Sets the card's colour scheme
         */
        colorScheme?: (typeof colorSchemes)[number];
      }
    | {
        /**
         * Sets the card's visual variant
         */
        variant?: 'subtle';
        /**
         * Sets the card's colour scheme
         */
        colorScheme?: (typeof whiteColorSchemes)[number];
      }
  ) & {
    /**
     * Remove padding
     */
    paddingNone?: boolean;
  };
