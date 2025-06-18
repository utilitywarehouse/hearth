import { PressableProps, ViewStyle } from 'react-native';
import { SpaceValue } from '../../types';
import { PropsWithChildren } from 'react';

interface CardProps extends PressableProps {
  variant?: 'emphasis' | 'subtle';
  colorScheme?:
    | 'white'
    | 'warmWhite'
    | 'purple'
    | 'energyBlue'
    | 'broadbandGreen'
    | 'mobileRose'
    | 'insuranceOrange'
    | 'cashbackLilac'
    | 'piggyPink';
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
