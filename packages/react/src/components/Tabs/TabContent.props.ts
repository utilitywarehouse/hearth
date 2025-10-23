import { Tabs as RadixTabs } from 'radix-ui';

export interface TabContentProps extends Omit<RadixTabs.TabsContentProps, 'asChild' | 'dir'> {
  value: string;
  keepMounted?: boolean;
}
