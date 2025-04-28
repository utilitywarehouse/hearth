import { PressableProps, ViewStyle } from 'react-native';
import { SpaceValue } from '../../types';

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
    | 'cashbackLilac';
  noPadding?: boolean;
  selected?: boolean;
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
