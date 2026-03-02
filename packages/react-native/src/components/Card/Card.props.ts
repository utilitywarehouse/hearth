import { PressableProps, ViewStyle } from 'react-native';
import { GapProps, MarginProps, SpacingValues } from '../../types';

interface CardProps extends PressableProps, MarginProps, GapProps {
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
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
  flexDirection?: ViewStyle['flexDirection'];
  flexWrap?: ViewStyle['flexWrap'];
}

export default CardProps;
