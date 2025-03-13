import { PressableProps } from 'react-native';

interface CardProps extends PressableProps {
  variant?: 'emphasis' | 'subtle';
  colorScheme?:
    | 'white'
    | 'warmWhite'
    | 'purple'
    | 'energyGreen'
    | 'broadbandBlue'
    | 'mobileRose'
    | 'insuranceOrange'
    | 'cashbackLilac';
  noPadding?: boolean;
  selected?: boolean;
  disabled?: boolean;
  inheritChildAction?: boolean;
}

export default CardProps;
