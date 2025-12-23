'use client';

import { cn } from '../../helpers/cn';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TabProps } from './Tabs.props';

const COMPONENT_NAME = 'Tab';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Tab = ({ className, ...props }: TabProps) => (
  <TabsPrimitive.Trigger className={cn(componentClassName, className)} {...props} />
);

Tab.displayName = COMPONENT_NAME;
