import type { ReactNode } from 'react';
import type { PressableProps, ViewProps } from 'react-native';

export interface SegmentedControlOptionProps extends Omit<PressableProps, 'children'> {
  /** Unique option value. */
  value: string;
  /** Option label/content. */
  children: ReactNode;
  /** Disables only this option. */
  disabled?: boolean;
  style?: ViewProps['style'];
}

export default SegmentedControlOptionProps;
