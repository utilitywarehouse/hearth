import { Tabs as RadixTabs } from 'radix-ui';

export type TabContentProps = Omit<RadixTabs.TabsContentProps, 'asChild' | 'dir'>;
