import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

interface BadgeProps extends ViewProps {
  variant?: 'subtle' | 'emphasis' | 'outline';
  colorScheme?:
    | 'info'
    | 'positive'
    | 'danger'
    | 'warning'
    | 'functional'
    | 'energy'
    | 'broadband'
    | 'mobile'
    | 'insurance'
    | 'cashback'
    | 'pig'
    | 'highlight';
  size?: 'sm' | 'md';
  icon?: ComponentType;
  flatBase?: boolean;
}

export default BadgeProps;
