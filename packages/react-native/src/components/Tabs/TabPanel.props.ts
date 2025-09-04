import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface TabPanelProps extends ViewProps {
  value: string;
  children: ReactNode;
  keepMounted?: boolean;
}

export default TabPanelProps;
