import type { ViewProps } from 'react-native';

export interface RoundelProps extends ViewProps {
  /** Visual variant for the roundel status. */
  variant?: 'success' | 'pending' | 'error';
}

export default RoundelProps;
