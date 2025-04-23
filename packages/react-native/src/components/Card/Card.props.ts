import { PressableProps } from 'react-native';

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
}

export default CardProps;
