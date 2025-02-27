import { PressableProps } from 'react-native';

interface CardProps extends PressableProps {
  variant?: 'emphasis' | 'subtle';
  colorScheme?:
    | 'white'
    | 'warm white'
    | 'purple'
    | 'energy green'
    | 'broadband blue'
    | 'mobile rose'
    | 'insurance orange'
    | 'cashback lilac';
  padding?: 'lg' | 'md' | 'sm' | 'none';
  selected?: boolean;
  onSelect?: (selelected: boolean) => void;
}

export default CardProps;
