'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { Tabs as TabsPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TabProps } from './Tabs.props';

const COMPONENT_NAME = 'Tab';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TabElement = ComponentRef<'button'>;

export const Tab = forwardRef<TabElement, TabProps>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref} className={cn(componentClassName, className)} {...props} />
));

Tab.displayName = COMPONENT_NAME;
