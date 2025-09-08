import type { ComponentType, ReactNode } from 'react';
import type { PressableProps, ViewProps } from 'react-native';

export interface TabProps extends PressableProps {
  /** Unique value for the tab */
  value: string;
  /** Tab label */
  children: ReactNode;
  /** Optional leading icon */
  icon?: ComponentType<any>;
  /** Whether the tab is disabled */
  disabled?: boolean;
  style?: ViewProps['style'];
}

export default TabProps;
