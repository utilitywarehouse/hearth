import type { ViewProps } from 'react-native';

interface BadgeProps extends ViewProps {
  variant?: 'solid' | 'outline';
  colorScheme?: 'blue' | 'green' | 'red' | 'orange' | 'grey';
  flatBase?: boolean;
}

export default BadgeProps;
