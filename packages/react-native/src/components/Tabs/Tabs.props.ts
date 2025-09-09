import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';

export interface TabsProps extends ViewProps {
  /** Controlled active tab value */
  value?: string;
  /** Uncontrolled initial value */
  defaultValue?: string;
  /** Callback when active tab changes */
  onValueChange?: (value: string) => void;
  /** Size variant */
  size?: 'md' | 'lg';
  /** Tabs (Tab components) */
  children: ReactNode;
  /** Disable all tabs */
  disabled?: boolean;
  /** If true, expect sibling TabPanel components and manage their rendering/ARIA linkage */
  withPanels?: boolean;
}

export default TabsProps;
