import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

interface BadgeProps extends ViewProps {
  variant?: 'solid' | 'outline';
  colorScheme?: 'blue' | 'green' | 'red' | 'orange' | 'grey';
  icon?: ComponentType;
  flatBase?: boolean;
}

export default BadgeProps;
