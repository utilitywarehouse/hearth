import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import type { FlexLayoutProps } from '../../types';

export interface SegmentedControlProps extends ViewProps, FlexLayoutProps {
  /** Controlled selected option value. */
  value?: string;
  /** Initial selected option value for uncontrolled mode. */
  defaultValue?: string;
  /** Called when selected option changes. */
  onValueChange?: (value: string) => void;
  /** Size variant. */
  size?: 'sm' | 'md';
  /** Disables all options in the control. */
  disabled?: boolean;
  /** SegmentedControlOption children. */
  children: ReactNode;
}

export default SegmentedControlProps;
