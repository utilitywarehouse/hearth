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
  padding?: 'lg' | 'md' | 'sm' | 'none';
  selected?: boolean;
  onSelect?: (selelected: boolean) => void;
  disabled?: boolean;
}

export default CardProps;
