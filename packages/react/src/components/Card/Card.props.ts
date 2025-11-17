import { PropDef } from '../../props/prop-def';
import { FlexProps } from '../Flex/Flex.props';
import { PaddingProps } from '../../props/padding.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { BorderProps } from '../../props/border.props';
import { BorderColorProps } from '../../props/border-color.props';
import { SizeProps } from '../../props/size.props';

const variants = ['emphasis', 'subtle'] as const;

export const cardPropDefs = {
  variant: { className: 'variant', tokens: variants, responsive: false, default: 'emphasis' },
  paddingNone: { className: 'padding-none', responsive: false },
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
  paddingNone: PropDef<boolean>;
};

type CommonCardProps = Omit<
  FlexProps,
  | 'as'
  | 'asChild'
  | 'color'
  | 'backgroundColor'
  | keyof PaddingProps
  | keyof BorderProps
  | keyof BorderColorProps
> & {
  /**
   * Sets the card's visual variant
   */
  variant?: (typeof variants)[number];
  /**
   * Sets the card's colour scheme
   */
  colorScheme?:
    | 'neutralStrong'
    | 'neutralSubtle'
    | 'brand'
    | 'energy'
    | 'broadband'
    | 'mobile'
    | 'insurance'
    | 'cashback'
    | 'pig'
    | 'highlight';
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
type CardLiProps = { as?: 'li' } & ComponentPropsWithout<'li', RemovedProps>;
export type CardProps = CommonCardProps & (CardLiProps | CardDivProps);
