import { PressableProps } from 'react-native';
import { DisplayProps, FlexLayoutProps, GapProps, MarginProps, SpacingValues } from '../../types';

interface CardProps
  extends PressableProps, MarginProps, GapProps, FlexLayoutProps, Omit<DisplayProps, 'direction'> {
  /** Visual emphasis of the card.
   * @default 'subtle'
   */
  variant?: 'emphasis' | 'subtle';
  /**
   * The card's color scheme.
   * @default 'neutralStrong'
   */
  colorScheme?:
    | 'neutralStrong'
    | 'neutralSubtle'
    | 'brand'
    | 'energy'
    | 'broadband'
    | 'highlight'
    | 'mobile'
    | 'insurance'
    | 'cashback'
    | 'pig';
  /** The color of the card's shadow. */
  shadowColor?:
    | 'functional'
    | 'brand'
    | 'energy'
    | 'broadband'
    | 'mobile'
    | 'insurance'
    | 'cashback'
    | 'pig';
  /** Removes the card's default padding.
   * @default false
   */
  noPadding?: boolean;
  /** Disables interaction and applies a disabled visual style.
   * @default false
   */
  disabled?: boolean;
  /** The space between the card's content. */
  spacing?: SpacingValues;
  /**
   * The space between the card's content.
   * @deprecated Use `spacing` instead. The `space` prop will be removed in a future release.
   */
  space?: SpacingValues;
}

export default CardProps;
