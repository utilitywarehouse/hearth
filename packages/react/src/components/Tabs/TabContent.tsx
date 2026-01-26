'use client';

import { cn } from '../../helpers/cn';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TabContentProps } from './Tabs.props';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'TabContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const TabContent = ({ className, children, value, ...props }: TabContentProps) => {
  return (
    <Flex asChild className={cn(componentClassName, className)} {...props}>
      <TabsPrimitive.Content value={value}>{children}</TabsPrimitive.Content>
    </Flex>
  );
};

TabContent.displayName = COMPONENT_NAME;
