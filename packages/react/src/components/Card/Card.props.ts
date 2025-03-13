import { PropDef } from '../../props/prop-def';
import { FlexProps } from '../Flex/Flex.props';
import { PaddingProps } from '../../props/padding.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

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

type CommonCardProps = Omit<
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
        colorScheme?: (typeof nonWhiteColorSchemes)[number];
      }
    | {
        /**
         * Sets the card's visual variant
         */
        variant?: (typeof variants)[number];
        /**
         * Sets the card's colour scheme
         */
        colorScheme?: (typeof whiteColorSchemes)[number];
      }
  ) & {
    /**
     * Shorthand for changing the default rendered element into a semantically appropriate alternative.
     * @default div
     */
    as?: 'div' | 'li';
    /**
     * Remove padding
     */
    paddingNone?: boolean;
  };

type CardDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type CardLiProps = { as: 'li' } & ComponentPropsWithout<'li', RemovedProps>;
export type CardProps = CommonCardProps & (CardLiProps | CardDivProps);
