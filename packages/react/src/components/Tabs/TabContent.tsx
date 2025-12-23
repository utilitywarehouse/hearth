'use client';

import { cn } from '../../helpers/cn';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TabContentProps } from './Tabs.props';

const COMPONENT_NAME = 'TabPanel';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const TabContent = ({ className, ...props }: TabContentProps) => {
  return <TabsPrimitive.Content className={cn(componentClassName, className)} {...props} />;
};

TabContent.displayName = COMPONENT_NAME;
