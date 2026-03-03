import { PressableProps } from 'react-native';
import { DisplayProps, FlexLayoutProps, GapProps, MarginProps, SpacingValues } from '../../types';

interface CardProps extends PressableProps, MarginProps, GapProps, FlexLayoutProps, DisplayProps {
  variant?: 'emphasis' | 'subtle';
  colorScheme?:
    | 'neutralStrong'
    | 'neutralSubtle'
    | 'brand'
    | 'energy'
    | 'broadband'
    | 'mobile'
    | 'insurance'
    | 'cashback'
    | 'pig';
  shadowColor?:
    | 'functional'
    | 'brand'
    | 'energy'
    | 'broadband'
    | 'mobile'
    | 'insurance'
    | 'cashback'
    | 'pig';
  noPadding?: boolean;
  disabled?: boolean;
  spacing?: SpacingValues;
  /** @deprecated Use `spacing` instead. The `gap` prop will be removed in a future release. */
  space?: SpacingValues;
}

export default CardProps;
