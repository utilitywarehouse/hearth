import { PressableProps, ViewStyle } from 'react-native';
import { SpaceValue } from '../../types';

interface CardProps extends PressableProps {
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
  noPadding?: boolean;
  disabled?: boolean;
  space?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
  flexDirection?: ViewStyle['flexDirection'];
  flexWrap?: ViewStyle['flexWrap'];
  gap?: SpaceValue;
  rowGap?: SpaceValue;
  columnGap?: SpaceValue;
}

export default CardProps;
