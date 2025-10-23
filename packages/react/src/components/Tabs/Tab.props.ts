import { Tabs as RadixTabs } from 'radix-ui';

export interface TabProps extends Omit<RadixTabs.TabsTriggerProps, 'asChild' | 'dir' | 'value'> {
  value: string;
}
