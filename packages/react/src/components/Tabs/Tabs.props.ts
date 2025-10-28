import { Tabs as RadixTabs } from 'radix-ui';
import { MarginProps } from '../../props/margin.props';

export interface TabsProps
  extends Omit<RadixTabs.TabsProps, 'asChild' | 'dir' | 'orientation' | keyof MarginProps>,
    MarginProps {
  /** Size variant */
  size?: 'md' | 'lg';
}
