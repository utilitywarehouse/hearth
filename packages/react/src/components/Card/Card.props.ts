import { PropDef } from '../../props/prop-def';
import { FlexProps } from '../Flex/Flex.props';
import { PaddingProps } from '../../props/padding.props';
import { BorderColorProps } from '../../props/border-color.props';
import { BorderWidthProps } from '../../props/border-width.props';
import { BorderStyleProps } from '../../props/border-style.props';

const variants = ['emphasis', 'subtle'] as const;

export const cardPropDefs = {
  variant: { className: 'variant', tokens: variants, responsive: false, default: 'emphasis' },
  paddingNone: { className: 'padding-none', responsive: false },
} satisfies {
  variant: PropDef<(typeof variants)[number]>;
  paddingNone: PropDef<boolean>;
};

type ElementProps = Omit<React.ComponentPropsWithRef<'div'>, 'color'>;

export interface CardProps
  extends
    ElementProps,
    Omit<
      FlexProps,
      | 'as'
      | 'asChild'
      | 'color'
      | 'backgroundColor'
      | keyof PaddingProps
      | keyof BorderWidthProps
      | keyof BorderStyleProps
      | keyof BorderColorProps
      | keyof ElementProps
    > {
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
   * Remove padding
   */
  paddingNone?: boolean;
  /**
   * Sets the card shadow colour
   */
  shadowColor?:
    | 'brand'
    | 'energy'
    | 'broadband'
    | 'mobile'
    | 'insurance'
    | 'cashback'
    | 'pig'
    | 'functional';
}
